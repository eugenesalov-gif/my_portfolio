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
  bioRef: React.RefObject<HTMLDivElement | null>;
  profileCardRef: React.RefObject<HTMLDivElement | null>;
  bioHidden: boolean;
  setBioHidden: (hidden: boolean) => void;
};

const ChatLayoutContext = createContext<ChatLayoutContextValue | null>(null);

export function ChatLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bioRef = useRef<HTMLDivElement | null>(null);
  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const [bioHidden, setBioHiddenState] = useState(false);

  const setBioHidden = useCallback((hidden: boolean) => {
    setBioHiddenState(hidden);
  }, []);

  const value = useMemo(
    () => ({
      bioRef,
      profileCardRef,
      bioHidden,
      setBioHidden,
    }),
    [bioHidden, setBioHidden],
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
