import { createGroq } from "@ai-sdk/groq";

/**
 * Groq provider. Server-only.
 * Uses Groq API for AI-powered responses (completely free).
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createGroq({
    apiKey: apiKey,
  });
}
