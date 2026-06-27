"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type ChatLayoutContextValue = {
  bioRef: React.MutableRefObject<HTMLDivElement | null>;
  bioMeasureRef: React.MutableRefObject<HTMLDivElement | null>;
  profileCardRef: React.MutableRefObject<HTMLDivElement | null>;
  bioHidden: boolean;
  setBioHidden: (hidden: boolean) => void;
  suggestionsInBioSlot: boolean;
  setSuggestionsInBioSlot: (active: boolean) => void;
  dialogInBioSlot: boolean;
  setDialogInBioSlot: (active: boolean) => void;
  bioSlotHeight: number | null;
  setBioSlotHeight: (height: number | null) => void;
};

const ChatLayoutContext = createContext<ChatLayoutContextValue | null>(null);

export function ChatLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bioRef = useRef<HTMLDivElement | null>(null);
  const bioMeasureRef = useRef<HTMLDivElement | null>(null);
  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const [bioHidden, setBioHiddenState] = useState(false);
  const [suggestionsInBioSlot, setSuggestionsInBioSlotState] = useState(false);
  const [dialogInBioSlot, setDialogInBioSlotState] = useState(false);
  const [bioSlotHeight, setBioSlotHeightState] = useState<number | null>(null);

  const setBioHidden = useCallback((hidden: boolean) => {
    setBioHiddenState(hidden);
  }, []);

  const setSuggestionsInBioSlot = useCallback((active: boolean) => {
    setSuggestionsInBioSlotState(active);
  }, []);

  const setDialogInBioSlot = useCallback((active: boolean) => {
    setDialogInBioSlotState(active);
  }, []);

  const setBioSlotHeight = useCallback((height: number | null) => {
    setBioSlotHeightState(height);
  }, []);

  const value = useMemo(
    () => ({
      bioRef,
      bioMeasureRef,
      profileCardRef,
      bioHidden,
      setBioHidden,
      suggestionsInBioSlot,
      setSuggestionsInBioSlot,
      dialogInBioSlot,
      setDialogInBioSlot,
      bioSlotHeight,
      setBioSlotHeight,
    }),
    [
      bioHidden,
      setBioHidden,
      suggestionsInBioSlot,
      setSuggestionsInBioSlot,
      dialogInBioSlot,
      setDialogInBioSlot,
      bioSlotHeight,
      setBioSlotHeight,
    ],
  );

  return (
    <ChatLayoutContext.Provider value={value}>
      {children}
    </ChatLayoutContext.Provider>
  );
}

export function useChatLayout() {
  return useContext(ChatLayoutContext);
}
