import { createOpenAI } from "@ai-sdk/openai";

/**
 * OpenAI provider. Server-only.
 * Uses OpenAI API for AI-powered responses.
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  const openai = createOpenAI({
    apiKey: apiKey,
  });
  return openai("gpt-4o-mini");
}
