import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { HADITHS, VERSES } from "@/lib/islamic-content";
import { LANGUAGE_NAMES, type LanguageCode } from "@/i18n/translations";

const SENSITIVE = [
  "divorce",
  "talaq",
  "inherit",
  "custody",
  "fatwa",
  "dispute",
  "contract",
  "khul",
  "criminal",
  "abortion",
  "will",
  "estate",
  "gado",
  "aure",
  "ميراث",
  "طلاق",
];

/** Naive multilingual keyword retrieval over the verified sample corpus. */
function retrieveEvidence(question: string) {
  const q = question.toLowerCase();
  const words = q.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 3);
  const score = (text: string, topics: string[]) => {
    const hay = `${text} ${topics.join(" ")}`.toLowerCase();
    return words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
  };
  const verses = VERSES.map((v) => ({ v, s: score(v.translation, v.topics) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(
      ({ v }) =>
        `Qur'an ${v.surah}:${v.ayah} (Surah ${v.surahName}) — Arabic: ${v.arabic} — Translation: ${v.translation}`,
    );
  const hadiths = HADITHS.map((h) => ({ h, s: score(h.translation, h.topics) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(
      ({ h }) =>
        `${h.collection} ${h.number} (${h.grade}), narrated by ${h.narrator} — ${h.translation}`,
    );
  return [...verses, ...hadiths];
}

function buildSystemPrompt(language: LanguageCode, question: string) {
  const evidence = retrieveEvidence(question);
  const sensitive = SENSITIVE.some((k) => question.toLowerCase().includes(k));

  return `You are "Ask Hajj Kassim", an educational Islamic knowledge assistant.

LANGUAGE
- The user's interface language is ${LANGUAGE_NAMES[language]}.
- Detect the language of the user's question and ALWAYS answer in that same language (English, Arabic, Hausa or Twi). If it is unclear, answer in ${LANGUAGE_NAMES[language]}.
- Use natural Islamic terminology of that language (e.g. Hausa: Sallah, Azumi, Zakka, Aure, Gado, Alwala; Twi: natural everyday Twi).
- NEVER translate Qur'anic Arabic, hadith Arabic text or Arabic duas. Quote the Arabic as-is and give the translation separately, clearly marked as a translation.

ACCURACY — NON-NEGOTIABLE
- NEVER fabricate Qur'an verses, hadith, hadith numbers, scholars, fatwas, references or historical events.
- Only cite a Qur'an verse or hadith when you are confident of the reference. Prefer the verified evidence provided below.
- If you cannot find reliable evidence, say exactly (in the user's language): "I couldn't find enough reliable evidence to give you a confident answer. Please consult a qualified Islamic scholar."

ANSWER FORMAT (markdown, in the user's language)
## Answer
A concise, clear explanation in simple language.

## Qur'an Evidence
Relevant verses with surah name and verse number, Arabic then translation. Omit the section if there is none.

## Hadith Evidence
Authentic narrations with collection and number. Omit the section if there is none.

## Scholarly Explanation
Explain the reasoning, and where scholars differ explain the Hanafi, Maliki, Shafi'i and Hanbali positions honestly instead of presenting one opinion as the only view.

## Sources & Evidence
A short bulleted list of the references used.

End with one line: either "✅ Source-backed answer" or "⚠️ Scholarly verification recommended".

${
  sensitive
    ? `SENSITIVE TOPIC: This question touches marriage, divorce, inheritance, property, custody, contracts, finance, criminal or personal-fatwa matters. Give general educational information only, do NOT issue a binding ruling or a final inheritance calculation, and finish with: "This question may depend on personal circumstances and differences in Islamic jurisprudence. Please consult a qualified Islamic scholar before making an important decision."`
    : ""
}

VERIFIED EVIDENCE FROM THE PLATFORM LIBRARY (use when relevant; quote references exactly):
${evidence.length ? evidence.map((e) => `- ${e}`).join("\n") : "- (no direct match found in the library)"}

Always be respectful, calm and educational. Never claim religious authority.`;
}

type ChatBody = { messages?: unknown; language?: LanguageCode };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatBody;
        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        console.debug("LOVABLE_API_KEY present:", Boolean(key));
        if (!key) {
          return new Response(
            "Missing Lovable API key. Set LOVABLE_API_KEY in your server environment.",
            { status: 500 },
          );
        }

        const uiMessages = messages as UIMessage[];
        const last = uiMessages[uiMessages.length - 1];
        const question =
          last?.parts
            ?.map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim() ?? "";

        const gateway = createLovableAiGatewayProvider(key);

        try {
          const result = streamText({
            model: gateway("google/gemini-3.5-flash"),
            system: buildSystemPrompt(body.language ?? "en", question),
            messages: await convertToModelMessages(uiMessages),
            abortSignal: request.signal,
            onError: ({ error }) => {
              console.error("lovable stream error", error);
              return error instanceof Error ? error.message : String(error);
            },
          });

          return result.toUIMessageStreamResponse({ originalMessages: uiMessages });
        } catch (error) {
          console.error("chat error", error);
          const message =
            error instanceof Error
              ? error.message
              : typeof error === "string"
              ? error
              : JSON.stringify(error);
          return new Response(message || "The assistant is unavailable right now.", {
            status: 502,
          });
        }
      },
    },
  },
});
