import { createGroq } from "@ai-sdk/groq";

/**
 * Groq provider. Server-only.
 * Uses Groq API for AI-powered responses (completely free).
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  const groq = createGroq({
    apiKey: apiKey,
  });
  return groq("mixtral-8x7b-32768");
}
