import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Together.ai provider. Server-only.
 * Uses Together.ai API for AI-powered responses (completely free).
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "together",
    baseURL: "https://api.together.xyz/v1",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });
}
