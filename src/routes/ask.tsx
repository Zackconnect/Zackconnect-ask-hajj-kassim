import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef } from "react";

import { AppShell } from "@/components/app-shell";
import { ChatWindow } from "@/components/chat/chat-window";
import { useSession } from "@/hooks/use-session";
import { createThread, saveMessages } from "@/lib/threads.functions";

type AskSearch = { q?: string };

export const Route = createFileRoute("/ask")({
  validateSearch: (search: Record<string, unknown>): AskSearch =>
    typeof search['q'] === "string" && search['q'] ? { q: search['q'] } : {},
  head: () => ({
    meta: [
      { title: "Ask a Question — Ask Hajj Kassim" },
      {
        name: "description",
        content:
          "Ask Hajj Kassim your Islamic question and get an answer with Qur'an and Hadith evidence in English, Arabic, Hausa or Twi.",
      },
      { property: "og:title", content: "Ask a Question — Ask Hajj Kassim" },
      {
        property: "og:description",
        content: "Islamic answers with clear evidence and scholarly disclaimers.",
      },
    ],
  }),
  component: AskPage,
});

function AskPage() {
  const { q } = Route.useSearch();
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const threadRef = useRef<string | null>(null);
  const chatId = useMemo(() => `ask-${q ?? "new"}`, [q]);

  const persist = async (role: "user" | "assistant", parts: unknown) => {
    if (!user) return;
    try {
      if (!threadRef.current) {
        const thread = await createThread({ data: {} });
        threadRef.current = thread.id;
      }
      await saveMessages({
        data: {
          threadId: threadRef.current,
          messages: [{ role, parts: parts as never }],
        },
      });
    } catch {
      /* persistence is best-effort while chatting from /ask */
    }
  };

  return (
    <AppShell hideFooter>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        <ChatWindow
          chatId={chatId}
          {...(q ? { autoSend: q } : {})}
          guest={!user && !loading}
          onUserMessage={(text, message) => {
            void persist("user", message.parts);
            if (!q) void navigate({ to: "/ask", search: { q: undefined }, replace: true });
            void text;
          }}
          onAssistantMessage={(message) => void persist("assistant", message.parts)}
        />
      </div>
    </AppShell>
  );
}
