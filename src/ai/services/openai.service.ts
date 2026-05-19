import { OPENAI_MODEL } from "../constants";
import type { AICompletionRequest, AICompletionResult } from "../types";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

export function isOpenAIConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.length > 10 && !API_KEY.startsWith("sk-your"));
}

export async function completeWithOpenAI(req: AICompletionRequest): Promise<AICompletionResult> {
  if (!isOpenAIConfigured()) {
    return { text: "", source: "rules" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: req.user },
        ],
        max_tokens: req.maxTokens ?? 512,
        temperature: req.temperature ?? 0.4,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn("[OpenAI]", res.status, err);
      return { text: "", source: "rules" };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      usage?: { total_tokens?: number };
    };

    const text = json.choices?.[0]?.message?.content?.trim() ?? "";
    return {
      text,
      source: text ? "openai" : "rules",
      tokensUsed: json.usage?.total_tokens,
    };
  } catch (e) {
    console.warn("[OpenAI] request failed", e);
    return { text: "", source: "rules" };
  } finally {
    clearTimeout(timeout);
  }
}

/** Retry once on failure */
export async function completeWithRetry(req: AICompletionRequest): Promise<AICompletionResult> {
  const first = await completeWithOpenAI(req);
  if (first.text) return first;
  return completeWithOpenAI(req);
}
