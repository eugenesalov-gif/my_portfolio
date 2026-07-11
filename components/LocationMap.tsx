"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const MAP_CENTER: [number, number] = [-4.4213, 36.7213];
const MAP_ZOOM = 2;
const GRADIENT_FOCUS_X = 0.15;
const GRADIENT_FOCUS_Y = 0.5;
const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";
const MAPLIBRE_CSS_HREF = "/maplibre-gl.css";

type LocationMapProps = {
  className?: string;
};

export type LocationMapHandle = {
  resetView: () => void;
};

function ensureMapLibreStyles() {
  if (document.querySelector(`link[data-maplibre-css="true"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = MAPLIBRE_CSS_HREF;
  link.setAttribute("data-maplibre-css", "true");
  document.head.appendChild(link);
}

function getMapPadding(width: number, height: number) {
  const left = 0;
  const top = 0;
  const right = Math.max(0, width * (1 - GRADIENT_FOCUS_X * 2) + left);
  const bottom = Math.max(0, height * (1 - GRADIENT_FOCUS_Y * 2) + top);

  return { top, bottom, left, right };
}

function createMarkerElement() {
  const markerEl = document.createElement("div");
  markerEl.className = "location-map__marker";

  const pinEl = document.createElement("span");
  pinEl.className = "location-map__marker-pin";
  pinEl.setAttribute("aria-hidden", "true");

  const pulseA = document.createElement("span");
  pulseA.className = "location-map__marker-pulse";

  const pulseB = document.createElement("span");
  pulseB.className = "location-map__marker-pulse location-map__marker-pulse--delayed";

  const dotEl = document.createElement("span");
  dotEl.className = "location-map__marker-dot";

  pinEl.append(pulseA, pulseB, dotEl);

  const copyEl = document.createElement("span");
  copyEl.className = "location-map__marker-copy";

  const eyebrowEl = document.createElement("span");
  eyebrowEl.className = "location-map__marker-eyebrow";
  eyebrowEl.textContent = "Now here";

  const placeEl = document.createElement("span");
  placeEl.className = "location-map__marker-place";
  placeEl.textContent = "Málaga, Spain";

  copyEl.append(eyebrowEl, placeEl);

  markerEl.append(pinEl, copyEl);

  return markerEl;
}

function getMapColorVars(rootEl: HTMLElement) {
  const styles = getComputedStyle(rootEl);

  return {
    water: styles.getPropertyValue("--location-map-water").trim(),
    waterway: styles.getPropertyValue("--location-map-waterway").trim(),
    waterwayOpacity: Number.parseFloat(
      styles.getPropertyValue("--location-map-waterway-opacity").trim(),
    ),
  };
}

function customizeMapColors(map: import("maplibre-gl").Map, rootEl: HTMLElement) {
  const { water, waterway, waterwayOpacity } = getMapColorVars(rootEl);

  if (!water) {
    return;
  }

  if (map.getLayer("water")) {
    map.setPaintProperty("water", "fill-color", water);
  }

  if (map.getLayer("waterway") && waterway) {
    map.setPaintProperty("waterway", "line-color", waterway);
    map.setPaintProperty("waterway", "line-opacity", waterwayOpacity || 0.85);
  }
}

function hideMapLabels(map: import("maplibre-gl").Map) {
  const layers = map.getStyle()?.layers;
  if (!layers) {
    return;
  }

  for (const layer of layers) {
    if (layer.type !== "symbol") {
      continue;
    }

    try {
      map.setLayoutProperty(layer.id, "visibility", "none");
    } catch {
      /* layer may not support visibility */
    }
  }
}

function applyMapPadding(
  map: import("maplibre-gl").Map,
  container: HTMLDivElement,
) {
  const { width, height } = container.getBoundingClientRect();
  if (width <= 0 || height <= 0) {
    return;
  }

  map.setPadding(getMapPadding(width, height));
}

function isDefaultView(map: import("maplibre-gl").Map) {
  const center = map.getCenter();
  const zoom = map.getZoom();

  return (
    Math.abs(center.lng - MAP_CENTER[0]) < 0.02 &&
    Math.abs(center.lat - MAP_CENTER[1]) < 0.02 &&
    Math.abs(zoom - MAP_ZOOM) < 0.08
  );
}

function resetMapView(
  map: import("maplibre-gl").Map,
  container: HTMLDivElement,
) {
  applyMapPadding(map, container);
  map.flyTo({
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    duration: 600,
    essential: true,
  });
}

const LocationMap = forwardRef<LocationMapHandle, LocationMapProps>(
  function LocationMap({ className = "" }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<import("maplibre-gl").Map | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);

    const handleResetView = useCallback(() => {
      const map = mapRef.current;
      const container = containerRef.current;
      if (!map || !container) {
        return;
      }

      resetMapView(map, container);
      setShowResetButton(false);
    }, []);

    useImperativeHandle(ref, () => ({
      resetView: handleResetView,
    }), [handleResetView]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || mapRef.current) {
        return;
      }

      let cancelled = false;
      let resizeObserver: ResizeObserver | null = null;
      let handleDragStart: (() => void) | null = null;
      let handleZoomStart: (() => void) | null = null;
      let handleMoveEnd: (() => void) | null = null;

      async function initMap() {
        ensureMapLibreStyles();

        const maplibregl = (await import("maplibre-gl")).default;

        if (cancelled || !container || mapRef.current) {
          return;
        }

        maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");

        const map = new maplibregl.Map({
          container,
          style: MAP_STYLE,
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          interactive: true,
          scrollZoom: true,
          boxZoom: false,
          doubleClickZoom: true,
          touchZoomRotate: true,
          dragRotate: false,
          keyboard: false,
          dragPan: true,
          attributionControl: false,
          maplibreLogo: false,
          fadeDuration: 0,
        });

        mapRef.current = map;

        const markerEl = createMarkerElement();

        new maplibregl.Marker({ element: markerEl, anchor: "left", offset: [-8, 0] })
          .setLngLat(MAP_CENTER)
          .addTo(map);

        map.once("load", () => {
          if (cancelled) {
            return;
          }

          if (map.getLayer("background")) {
            map.setPaintProperty("background", "background-color", "transparent");
          }

          customizeMapColors(map, rootRef.current ?? container);
          hideMapLabels(map);

          applyMapPadding(map, container);
          map.resize();
          setIsReady(true);

          const updateResetVisibility = () => {
            setShowResetButton(!isDefaultView(map));
          };

          handleDragStart = () => setShowResetButton(true);
          handleZoomStart = () => setShowResetButton(true);
          handleMoveEnd = updateResetVisibility;

          map.on("dragstart", handleDragStart);
          map.on("zoomstart", handleZoomStart);
          map.on("moveend", handleMoveEnd);
        });

        resizeObserver = new ResizeObserver(() => {
          applyMapPadding(map, container);
          map.resize();
        });
        resizeObserver.observe(container);
      }

      void initMap();

      return () => {
        cancelled = true;
        resizeObserver?.disconnect();

        const map = mapRef.current;
        if (map && handleDragStart && handleZoomStart && handleMoveEnd) {
          map.off("dragstart", handleDragStart);
          map.off("zoomstart", handleZoomStart);
          map.off("moveend", handleMoveEnd);
        }

        mapRef.current?.remove();
        mapRef.current = null;
        setIsReady(false);
        setShowResetButton(false);
      };
    }, []);

    useEffect(() => {
      const map = mapRef.current;
      const rootEl = rootRef.current;
      if (!map || !rootEl || !isReady) {
        return;
      }

      const applyColors = () => {
        if (map.isStyleLoaded()) {
          customizeMapColors(map, rootEl);
        }
      };

      applyColors();

      const observer = new MutationObserver(applyColors);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      return () => observer.disconnect();
    }, [isReady]);

    return (
      <div
        ref={rootRef}
        className={`location-map relative h-full w-full ${className}`}
        style={
          {
            "--location-map-focal-x": `${GRADIENT_FOCUS_X * 100}%`,
            "--location-map-focal-y": `${GRADIENT_FOCUS_Y * 100}%`,
          } as React.CSSProperties
        }
      >
        <div
          ref={containerRef}
          className={`location-map__surface absolute inset-0 transition-opacity duration-200 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
        {!isReady && (
          <div
            aria-hidden="true"
            className="location-map__surface pointer-events-none absolute inset-0"
            style={{ backgroundColor: "var(--color-bg-muted)" }}
          />
        )}
        <div aria-hidden="true" className="location-map__fade pointer-events-none absolute inset-0 z-[5]" />
        <button
          type="button"
          aria-label="Reset map view"
          onClick={handleResetView}
          className={`location-map__reset ${showResetButton ? "location-map__reset--visible" : ""}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="location-map__reset-icon"
          >
            <path
              d="M12 18.75C11.334 18.75 10.703 18.496 10.223 18.035C9.97995 17.8 9.73295 17.564 9.48295 17.326L9.45895 17.303C6.48695 14.474 2.78795 10.953 4.84195 6.016C6.02695 3.165 8.90395 1.25 12 1.25C15.096 1.25 17.974 3.165 19.159 6.016C21.22 10.971 17.49 14.509 14.494 17.351C14.251 17.581 14.011 17.809 13.777 18.034C13.297 18.496 12.666 18.75 12 18.75ZM12 2.75C9.50195 2.75 7.18195 4.294 6.22695 6.592C4.56895 10.577 7.58095 13.444 10.493 16.216C10.755 16.465 11.013 16.711 11.265 16.955C11.462 17.144 11.724 17.25 12 17.25C12.276 17.25 12.538 17.145 12.737 16.954C12.92 16.778 13.107 16.601 13.295 16.422L13.462 16.263C16.401 13.476 19.439 10.594 17.775 6.592C16.819 4.294 14.498 2.75 12 2.75ZM12 12.25C10.208 12.25 8.74995 10.792 8.74995 9C8.74995 7.208 10.208 5.75 12 5.75C13.792 5.75 15.25 7.208 15.25 9C15.25 10.792 13.792 12.25 12 12.25ZM5.24995 20C5.24995 19.586 5.58595 19.25 5.99995 19.25C6.41395 19.25 6.74495 19.581 6.74995 19.991C6.86795 20.343 8.63995 21.25 12 21.25C15.36 21.25 17.132 20.342 17.25 19.991C17.255 19.581 17.589 19.25 18 19.25C18.411 19.25 18.75 19.586 18.75 20C18.75 21.889 15.251 22.75 12 22.75C8.74895 22.75 5.24995 21.889 5.24995 20ZM12 7.25C11.035 7.25 10.25 8.035 10.25 9C10.25 9.965 11.035 10.75 12 10.75C12.965 10.75 13.75 9.965 13.75 9C13.75 8.035 12.965 7.25 12 7.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    );
  },
);

export default LocationMap;
