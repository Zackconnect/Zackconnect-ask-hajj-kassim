import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { AppShell } from "@/components/app-shell";
import { ChatWindow } from "@/components/chat/chat-window";

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
  const navigate = useNavigate();
  const chatId = useMemo(() => `ask-${q ?? "new"}`, [q]);

  return (
    <AppShell hideFooter>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        <ChatWindow
          chatId={chatId}
          {...(q ? { autoSend: q } : {})}
          guest={true}
          onUserMessage={(text) => {
            if (!q) void navigate({ to: "/ask", search: { q: undefined }, replace: true });
            void text;
          }}
        />
      </div>
    </AppShell>
  );
}
