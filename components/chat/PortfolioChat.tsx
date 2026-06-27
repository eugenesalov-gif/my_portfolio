"use client";

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useChatLayout } from "@/components/chat/ChatLayoutContext";
import { homeRiseHidden, homeRiseTransition, homeRiseVisible } from "@/lib/motion";
import styles from "./PortfolioChat.module.css";

const MAX_INPUT_HEIGHT = 80;
const MIN_INPUT_HEIGHT = 32;
const CHAT_STACK_GAP = 8;
const OVERLAY_GAP = 8;
const DESKTOP_MEDIA_QUERY = "(min-width: 1200px)";

const SUGGESTED_QUESTIONS = [
  "What's your experience with AdTech?",
  "What are you looking for next?",
  "Tell me about your key projects",
  "What's your design philosophy?",
];

const messagesPanelExitTransition = { duration: 0.28, ease: "easeOut" as const };
const showButtonEnterTransition = {
  ...homeRiseTransition,
  delay: messagesPanelExitTransition.duration,
};

const suggestionContentClassName =
  "text-text-tertiary transition-colors duration-200 ease-out group-hover:text-text-secondary group-focus-visible:text-text-secondary";

const messageTextClassName =
  "text-[15px] font-normal leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]";

const suggestionStagger = 0.1;

const suggestionItemVariants = {
  hidden: homeRiseHidden,
  visible: {
    ...homeRiseVisible,
    transition: homeRiseTransition,
  },
  exit: {
    ...homeRiseHidden,
    transition: homeRiseTransition,
  },
};

const suggestionContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: suggestionStagger,
      staggerDirection: -1,
    },
  },
  exit: {
    transition: {
      staggerChildren: suggestionStagger,
      staggerDirection: 1,
    },
  },
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

const TYPING_BASE_DELAY_MS = 14;
const TYPING_SPACE_DELAY_MS = 6;
const TYPING_PUNCTUATION_DELAY_MS = 90;
const TYPING_LINE_BREAK_DELAY_MS = 70;

function getTypingChunkSize() {
  const roll = Math.random();
  if (roll < 0.12) {
    return 4;
  }
  if (roll < 0.38) {
    return 3;
  }
  if (roll < 0.72) {
    return 2;
  }
  return 1;
}

function getTypingDelay(char: string) {
  if (char === "\n") {
    return TYPING_LINE_BREAK_DELAY_MS;
  }
  if (char === " ") {
    return TYPING_SPACE_DELAY_MS;
  }
  if (char === "." || char === "!" || char === "?") {
    return TYPING_PUNCTUATION_DELAY_MS;
  }
  if (char === "," || char === ";" || char === ":") {
    return TYPING_PUNCTUATION_DELAY_MS * 0.55;
  }
  return TYPING_BASE_DELAY_MS + Math.random() * 10;
}

function AssistantReply({
  text,
  animate,
  onProgress,
  onComplete,
}: {
  text: string;
  animate: boolean;
  onProgress?: () => void;
  onComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(animate && !reduceMotion ? "" : text);
  const [isTyping, setIsTyping] = useState(animate && !reduceMotion);
  const onProgressRef = useRef(onProgress);
  const onCompleteRef = useRef(onComplete);

  onProgressRef.current = onProgress;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!animate || reduceMotion) {
      setDisplayed(text);
      setIsTyping(false);
      onCompleteRef.current?.();
      return;
    }

    setDisplayed("");
    setIsTyping(true);

    let index = 0;
    let timeoutId = 0;

    const revealNext = () => {
      const chunkSize = getTypingChunkSize();
      const nextIndex = Math.min(index + chunkSize, text.length);
      const chunk = text.slice(index, nextIndex);
      index = nextIndex;

      setDisplayed(text.slice(0, index));
      onProgressRef.current?.();

      if (index >= text.length) {
        setIsTyping(false);
        onCompleteRef.current?.();
        return;
      }

      const lastChar = chunk[chunk.length - 1] ?? "";
      timeoutId = window.setTimeout(revealNext, getTypingDelay(lastChar));
    };

    timeoutId = window.setTimeout(revealNext, 40);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animate, reduceMotion, text]);

  return (
    <>
      {displayed}
      {isTyping && <span className={styles.typingCursor} aria-hidden="true" />}
    </>
  );
}

const TEXT_SWAP_DUR_MS = 150;

type ChatLabelMode = "assistant" | "thinking";

function runLabelSwapExit(
  elements: HTMLElement[],
  onSwap: () => void,
) {
  elements.forEach((element) => element.classList.add(styles.textSwapExit));

  const timer = window.setTimeout(() => {
    elements.forEach((element) => element.classList.remove(styles.textSwapExit));
    onSwap();
  }, TEXT_SWAP_DUR_MS);

  return () => {
    window.clearTimeout(timer);
    elements.forEach((element) =>
      element.classList.remove(styles.textSwapExit, styles.textSwapEnterStart),
    );
  };
}

function runLabelSwapEnter(elements: HTMLElement[]) {
  elements.forEach((element) => element.classList.add(styles.textSwapEnterStart));
  void elements[0]?.offsetHeight;
  elements.forEach((element) =>
    element.classList.remove(styles.textSwapEnterStart),
  );
}

function ChatStatusLabel({
  isLoading,
  reduceMotion,
}: {
  isLoading: boolean;
  reduceMotion: boolean | null;
}) {
  const [displayMode, setDisplayMode] = useState<ChatLabelMode>(() =>
    isLoading ? "thinking" : "assistant",
  );
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const displayModeRef = useRef(displayMode);
  const shouldRunEnterRef = useRef(false);
  displayModeRef.current = displayMode;

  useEffect(() => {
    const target: ChatLabelMode = isLoading ? "thinking" : "assistant";

    if (reduceMotion) {
      setDisplayMode(target);
      return;
    }

    if (displayModeRef.current === target) {
      return;
    }

    const iconEl = iconRef.current;
    const textEl = textRef.current;
    if (!iconEl || !textEl) {
      setDisplayMode(target);
      return;
    }

    return runLabelSwapExit([iconEl, textEl], () => {
      shouldRunEnterRef.current = true;
      setDisplayMode(target);
    });
  }, [isLoading, reduceMotion]);

  useLayoutEffect(() => {
    if (!shouldRunEnterRef.current || reduceMotion) {
      return;
    }

    shouldRunEnterRef.current = false;

    const elements = [iconRef.current, textRef.current].filter(
      (element): element is HTMLSpanElement => element !== null,
    );

    if (elements.length === 0) {
      return;
    }

    runLabelSwapEnter(elements);
  }, [displayMode, reduceMotion]);

  const textSwapClassName = [
    styles.textSwap,
    styles.textSwapText,
    displayMode === "thinking" && !reduceMotion ? styles.labelThinking : "",
    displayMode === "thinking" && reduceMotion ? styles.labelThinkingStatic : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconSwapClassName = [
    styles.textSwap,
    displayMode === "thinking" ? styles.labelThinkingIconWrap : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span ref={iconRef} className={iconSwapClassName}>
        {displayMode === "assistant" ? (
          <AiStarsIcon />
        ) : (
          <span className={styles.labelThinkingIcon} aria-hidden="true" />
        )}
      </span>
      <span ref={textRef} className={textSwapClassName}>
        {displayMode === "assistant" ? (
          "AI Portfolio Assistant"
        ) : (
          <span className={styles.labelThinkingText}>Thinking...</span>
        )}
      </span>
    </>
  );
}

export default function PortfolioChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMessagesHidden, setIsMessagesHidden] = useState(false);
  const [messagesMaxHeight, setMessagesMaxHeight] = useState<number | null>(null);
  const [hasMessagesOverflow, setHasMessagesOverflow] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const [isDesktopChat, setIsDesktopChat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatStackRef = useRef<HTMLDivElement>(null);
  const messagesPanelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const chatLayout = useChatLayout();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.overflow = "hidden";
    textarea.style.height = "0px";

    const nextHeight = Math.max(
      MIN_INPUT_HEIGHT,
      Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT),
    );

    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflow =
      textarea.scrollHeight > MAX_INPUT_HEIGHT ? "auto" : "hidden";
  };

  useLayoutEffect(() => {
    adjustTextareaHeight();

    const handleResize = () => adjustTextareaHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [query]);

  const showSuggestions = isFocused && messages.length === 0;
  const hasMessages = messages.length > 0;
  const isChatExpanded = hasMessages && !isMessagesHidden;
  const isPanelScrollable =
    isChatExpanded &&
    ((!isDesktopChat) || (isDesktopChat && messagesMaxHeight !== null));

  const updateMessagesScrollState = useCallback(() => {
    const panel = messagesPanelRef.current;
    if (!panel) {
      return;
    }

    setHasMessagesOverflow(panel.scrollHeight > panel.clientHeight + 1);
  }, []);

  const handleMessagesPanelScroll = () => {
    updateMessagesScrollState();
  };

  const scrollMessagesToBottom = useCallback(() => {
    const panel = messagesPanelRef.current;
    if (!panel || !isChatExpanded) {
      return;
    }

    panel.scrollTop = panel.scrollHeight;
    updateMessagesScrollState();
  }, [isChatExpanded, updateMessagesScrollState]);

  const isAssistantTyping = typingMessageIndex !== null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const updateViewport = () => setIsDesktopChat(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const updateChatLayout = useCallback(() => {
    if (!isDesktopChat) {
      setMessagesMaxHeight(null);
      chatLayout?.setBioHidden(false);
      return;
    }

    if (!isChatExpanded) {
      setMessagesMaxHeight(null);
      chatLayout?.setBioHidden(false);
      return;
    }

    const chatStack = chatStackRef.current;
    const messagesPanel = messagesPanelRef.current;
    const card = cardRef.current;
    const bio = chatLayout?.bioRef.current;
    const profileCard = chatLayout?.profileCardRef.current;

    if (!chatStack || !messagesPanel || !card || !profileCard || !chatLayout) {
      return;
    }

    const cardTop = card.getBoundingClientRect().top;
    const profileBottom = profileCard.getBoundingClientRect().bottom;
    const bioRect = bio?.getBoundingClientRect();
    const limitTop =
      chatLayout.bioHidden || !bioRect
        ? profileBottom + CHAT_STACK_GAP
        : bioRect.bottom + CHAT_STACK_GAP;

    const available =
      cardTop -
      OVERLAY_GAP -
      CHAT_STACK_GAP -
      limitTop;

    const naturalHeight = messagesPanel.scrollHeight;

    if (!chatLayout.bioHidden && bioRect) {
      const dialogTop = chatStack.getBoundingClientRect().top;

      if (dialogTop <= bioRect.bottom + CHAT_STACK_GAP || naturalHeight > available) {
        chatLayout.setBioHidden(true);
        return;
      }

      setMessagesMaxHeight(null);
      return;
    }

    if (naturalHeight > available) {
      setMessagesMaxHeight(Math.max(80, available));
    } else {
      setMessagesMaxHeight(null);
    }
  }, [chatLayout, isChatExpanded, isDesktopChat]);

  useLayoutEffect(() => {
    updateChatLayout();
    updateMessagesScrollState();

    const resizeObserver = new ResizeObserver(() => {
      updateChatLayout();
      updateMessagesScrollState();
    });
    const observed = [
      messagesPanelRef.current,
      messagesRef.current,
      chatStackRef.current,
      cardRef.current,
      chatLayout?.bioRef.current,
      chatLayout?.profileCardRef.current,
    ];

    for (const node of observed) {
      if (node) {
        resizeObserver.observe(node);
      }
    }

    window.addEventListener("resize", updateChatLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateChatLayout);
    };
  }, [updateChatLayout, updateMessagesScrollState, messages, isLoading, isAssistantTyping, chatLayout?.bioHidden]);

  useEffect(() => {
    updateMessagesScrollState();
  }, [messages, isLoading, isAssistantTyping, messagesMaxHeight, isPanelScrollable, updateMessagesScrollState]);

  useEffect(() => {
    if (!chatLayout?.bioHidden) {
      return;
    }

    const timeoutId = window.setTimeout(updateChatLayout, 320);
    return () => window.clearTimeout(timeoutId);
  }, [chatLayout?.bioHidden, updateChatLayout]);

  useLayoutEffect(() => {
    const panel = messagesPanelRef.current;
    if (!panel || !isChatExpanded) {
      return;
    }

    panel.scrollTop = panel.scrollHeight;
    updateMessagesScrollState();
  }, [messages, isLoading, isAssistantTyping, isChatExpanded, messagesMaxHeight, updateMessagesScrollState]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading || isAssistantTyping) {
      return;
    }

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setQuery("");
    setIsMessagesHidden(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();

      const reply =
        data.reply ||
        "Something went wrong — please try again or reach out directly.";

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
      setTypingMessageIndex(updatedMessages.length);
    } catch {
      const reply =
        "Something went wrong — please try again or reach out directly.";

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
      setTypingMessageIndex(updatedMessages.length);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const messagesContent = (
    <div ref={messagesRef} className={styles.messages}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${messageTextClassName} rounded-[10px] px-3 py-2 ${
            message.role === "user"
              ? "bg-black/5 text-text-primary ml-auto max-w-[85%]"
              : "bg-transparent text-text-primary max-w-[95%]"
          }`}
        >
          {message.role === "assistant" ? (
            <AssistantReply
              text={message.content}
              animate={index === typingMessageIndex}
              onProgress={scrollMessagesToBottom}
              onComplete={() => {
                setTypingMessageIndex((current) =>
                  current === index ? null : current,
                );
                scrollMessagesToBottom();
              }}
            />
          ) : (
            message.content
          )}
        </div>
      ))}
    </div>
  );

  const chatDialogPanel = (
    <div
      ref={messagesPanelRef}
      className={`${styles.messagesPanel} ${
        isPanelScrollable ? styles.messagesPanelScrollable : ""
      }`}
      style={
        isDesktopChat && isChatExpanded && messagesMaxHeight !== null
          ? { maxHeight: messagesMaxHeight }
          : undefined
      }
      onScroll={handleMessagesPanelScroll}
    >
      <div className={styles.messagesHeader}>
        <div
          className={`${styles.messagesHeaderBackdrop} ${
            hasMessagesOverflow ? styles.messagesHeaderBackdropVisible : ""
          }`}
          aria-hidden="true"
        />
        <button
          type="button"
          className={`${styles.toggleButton} text-[13px] leading-none`}
          onClick={() => setIsMessagesHidden(true)}
          aria-label="Hide conversation"
        >
          <ChevronDownIcon />
          Hide
        </button>
      </div>
      {messagesContent}
    </div>
  );

  const dialogExit = {
    opacity: 0,
    y: 16,
    transition: {
      opacity: {
        duration: 0.14,
        ease: "easeOut" as const,
      },
      y: messagesPanelExitTransition,
    },
  };

  return (
    <section
      className={`${styles.wrapper} portfolio-chat mx-1 mt-10 min-[810px]:mt-16 min-[1200px]:mt-0`}
      aria-label="Portfolio assistant"
    >
      <div className={styles.overlay}>
        {reduceMotion ? (
          showSuggestions && (
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    sendMessage(question);
                  }}
                  className={`${styles.suggestionItem} group text-[13px] leading-5`}
                >
                  <span className={`${styles.suggestionInner} ${suggestionContentClassName}`}>
                    <SearchIcon className={styles.suggestionIcon} />
                    {question}
                  </span>
                </button>
              ))}
            </div>
          )
        ) : (
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                key="suggestions"
                className={styles.suggestions}
                variants={suggestionContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {SUGGESTED_QUESTIONS.map((question) => (
                  <motion.button
                    key={question}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      sendMessage(question);
                    }}
                    className={`${styles.suggestionItem} group text-[13px] leading-5`}
                    variants={suggestionItemVariants}
                  >
                    <span className={`${styles.suggestionInner} ${suggestionContentClassName}`}>
                      <SearchIcon className={styles.suggestionIcon} />
                      {question}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {hasMessages &&
          (reduceMotion ? (
            !isMessagesHidden && (
              <div ref={chatStackRef} className={styles.chatStack}>
                {chatDialogPanel}
              </div>
            )
          ) : (
            <AnimatePresence>
              {!isMessagesHidden && (
                <motion.div
                  ref={chatStackRef}
                  key="chat-dialog"
                  className={styles.chatStack}
                  initial={homeRiseHidden}
                  animate={{
                    ...homeRiseVisible,
                    transition: homeRiseTransition,
                  }}
                  exit={dialogExit}
                >
                  {chatDialogPanel}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
      </div>

      <div ref={cardRef} className={styles.cardArea}>
        {hasMessages &&
          (reduceMotion ? (
            isMessagesHidden && (
              <div className={styles.showButtonAnchor}>
                <button
                  type="button"
                  className={`${styles.toggleButton} ${styles.toggleButtonCompact} text-[13px] leading-none`}
                  onClick={() => setIsMessagesHidden(false)}
                  aria-label="Show conversation"
                >
                  <ChevronUpIcon />
                </button>
              </div>
            )
          ) : (
            <AnimatePresence>
              {isMessagesHidden && (
                <motion.div
                  key="show-button"
                  className={styles.showButtonAnchor}
                  initial={homeRiseHidden}
                  animate={{
                    ...homeRiseVisible,
                    transition: showButtonEnterTransition,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    transition: { duration: 0.18, ease: "easeOut" },
                  }}
                >
                  <button
                    type="button"
                    className={`${styles.toggleButton} ${styles.toggleButtonCompact} text-[13px] leading-none`}
                    onClick={() => setIsMessagesHidden(false)}
                    aria-label="Show conversation"
                  >
                    <ChevronUpIcon />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

        <div className={`${styles.card} rounded-[16px]`}>
        <p className={`${styles.label} text-[14px] font-semibold leading-5 tracking-[-0.4px] min-[810px]:tracking-[-0.5px]`}>
          <ChatStatusLabel isLoading={isLoading} reduceMotion={reduceMotion} />
        </p>

        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <label htmlFor="portfolio-chat-input" className="sr-only">
            Ask about my experience or projects
          </label>
          <textarea
            ref={textareaRef}
            id="portfolio-chat-input"
            rows={1}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask about my experience or projects"
            autoComplete="off"
            disabled={isLoading || isAssistantTyping}
            className={`${styles.input} text-[14px] font-medium tracking-[-0.3px] text-text-primary placeholder:font-medium placeholder:text-[#A8A8B0]`}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading || isAssistantTyping}
            aria-label="Send question"
            className={styles.submitButton}
          >
            <ArrowUpIcon />
          </button>
        </form>
      </div>
      </div>
    </section>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3 w-3 shrink-0"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3 w-3 shrink-0"
    >
      <path
        d="M3 7.5L6 4.5L9 7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AiStarsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M6.66667 4.66666L6.32277 5.59602C5.87183 6.81466 5.64635 7.42399 5.20185 7.86852C4.75735 8.31299 4.14803 8.53846 2.92937 8.98946L2 9.33332L2.92937 9.67719C4.14803 10.1282 4.75735 10.3537 5.20185 10.7981C5.64635 11.2427 5.87183 11.852 6.32277 13.0706L6.66667 14L7.01053 13.0706C7.46153 11.852 7.687 11.2427 8.13147 10.7981C8.576 10.3537 9.18533 10.1282 10.4039 9.67719L11.3333 9.33332L10.4039 8.98946C9.18533 8.53846 8.576 8.31299 8.13147 7.86852C7.687 7.42399 7.46153 6.81466 7.01053 5.59602L6.66667 4.66666Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L11.8526 2.3983C11.6593 2.92058 11.5627 3.18173 11.3722 3.37222C11.1817 3.56272 10.9206 3.65935 10.3983 3.85261L10 4L10.3983 4.14739C10.9206 4.34065 11.1817 4.43728 11.3722 4.62778C11.5627 4.81827 11.6593 5.07942 11.8526 5.6017L12 6L12.1474 5.6017C12.3407 5.07942 12.4373 4.81827 12.6278 4.62777C12.8183 4.43728 13.0794 4.34065 13.6017 4.14739L14 4L13.6017 3.85261C13.0794 3.65935 12.8183 3.56272 12.6278 3.37222C12.4373 3.18173 12.3407 2.92058 12.1474 2.3983L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1 11.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M8 3.25L8 12.75M8 3.25L4.25 7M8 3.25L11.75 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}