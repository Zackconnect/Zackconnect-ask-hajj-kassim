import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Copy, Languages, Mic } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useI18n } from "@/i18n";
import { LANGUAGE_NAMES, type LanguageCode } from "@/i18n/translations";

export type ChatWindowProps = {
  chatId: string;
  initialMessages?: UIMessage[];
  autoSend?: string;
  guest?: boolean;
  onUserMessage?: (text: string, message: UIMessage) => void;
  onAssistantMessage?: (message: UIMessage) => void;
};

function textOf(message: UIMessage) {
  return message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
}

export function ChatWindow({
  chatId,
  initialMessages,
  autoSend,
  guest,
  onUserMessage,
  onAssistantMessage,
}: ChatWindowProps) {
  const { t, lang } = useI18n();
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sentAuto = useRef(false);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { language: lang } }),
    [lang],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: chatId,
    messages: initialMessages ?? [],
    transport,
    onFinish: ({ message }) => {
      if (message.role === "assistant") onAssistantMessage?.(message);
    },
    onError: () => {
      toast.error(t("chat.error"));
    },
  });

  const busy = status === "submitted" || status === "streaming";

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;
      const message: UIMessage = {
        id: `local-${Date.now()}`,
        role: "user",
        parts: [{ type: "text", text: value }],
      };
      onUserMessage?.(value, message);
      void sendMessage({ text: value });
      setInput("");
      requestAnimationFrame(() => textareaRef.current?.focus());
    },
    [busy, onUserMessage, sendMessage],
  );

  useEffect(() => {
    if (autoSend && !sentAuto.current && messages.length === 0) {
      sentAuto.current = true;
      submit(autoSend);
    }
  }, [autoSend, messages.length, submit]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [chatId]);

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  const startVoice = () => {
    const w = window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Recognition = w.webkitSpeechRecognition;
    if (!Recognition) {
      toast.info(t("chat.voiceUnsupported"));
      return;
    }
    const recognition = new Recognition();
    recognition.lang = lang === "ar" ? "ar-SA" : lang === "ha" ? "ha-NG" : "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setInput((prev) => `${prev} ${transcript}`.trim());
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const translateTo = (code: LanguageCode) =>
    submit(
      `Translate your previous answer into ${LANGUAGE_NAMES[code]}. Keep all Qur'an and hadith Arabic text exactly as it is, keep references unchanged, and preserve Islamic terminology.`,
    );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center py-14 text-center">
              <img src={logo} alt="" width={72} height={72} className="size-16" />
              <h2 className="mt-5 font-display text-2xl font-semibold">{t("chat.welcome")}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("chat.welcomeDesc")}</p>
            </div>
          ) : null}

          {messages.map((message) => (
            <div key={message.id}>
              <Message from={message.role}>
                <MessageContent
                  className={
                    message.role === "assistant"
                      ? "bg-transparent p-0 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }
                >
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <MessageResponse key={index}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>

              {message.role === "assistant" ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        <Languages className="size-3.5" /> {t("chat.translate")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>{t("chat.translateTo")}</DropdownMenuLabel>
                      {LANGUAGES.map((l) => (
                        <DropdownMenuItem key={l.code} onClick={() => translateTo(l.code)}>
                          {l.flag} {l.native}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => {
                      void navigator.clipboard.writeText(textOf(message));
                      toast.success(t("chat.copy"));
                    }}
                  >
                    <Copy className="size-3.5" /> {t("chat.copy")}
                  </Button>
                </div>
              ) : null}
            </div>
          ))}

          {status === "submitted" ? (
            <Shimmer className="text-sm">{t("chat.thinking")}</Shimmer>
          ) : null}
          {error ? <p className="text-sm text-destructive">{t("chat.error")}</p> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl">
          {guest ? (
            <p className="mb-2 text-xs text-muted-foreground">{t("chat.guestNotice")}</p>
          ) : null}
          <PromptInput
            onSubmit={(_message, event) => {
              event.preventDefault();
              submit(input);
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t("chat.placeholder")}
            />
            <PromptInputFooter className="justify-between">
              <PromptInputTools>
                <Button
                  type="button"
                  variant={listening ? "default" : "ghost"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={startVoice}
                >
                  <Mic className="size-3.5" />
                  {listening ? t("chat.listening") : t("hero.voice")}
                </Button>
              </PromptInputTools>
              <PromptInputSubmit status={status} disabled={!input.trim() || busy} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            {t("disclaimer.important")}
          </p>
        </div>
      </div>
    </div>
  );
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  onresult: (event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
};
