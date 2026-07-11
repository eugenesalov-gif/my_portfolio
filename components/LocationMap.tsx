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
          >
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M12 3V6M12 18V21M3 12H6M18 12H21"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  },
);

export default LocationMap;
