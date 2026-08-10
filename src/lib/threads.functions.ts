import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

type MessageRow = {
  id: string;
  role: "user" | "assistant";
  parts: Json[];
  created_at: string;
};

export const listThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("threads")
      .select("id, title, language, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { title?: string; language?: string }) => input ?? {})
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("threads")
      .insert({
        user_id: context.userId,
        title: (data.title ?? "New question").slice(0, 120),
        language: data.language ?? "en",
      })
      .select("id, title, language, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const getThreadMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { threadId: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("messages")
      .select("id, role, parts, created_at")
      .eq("thread_id", data.threadId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => ({
      id: r.id as string,
      role: r.role as "user" | "assistant",
      parts: (Array.isArray(r.parts) ? r.parts : []) as Json[],
      created_at: r.created_at as string,
    })) satisfies MessageRow[];
  });

export const saveMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      threadId: string;
      title?: string;
      messages: { role: "user" | "assistant"; parts: Json[]; sdkMessageId?: string }[];
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const rows = data.messages.map((m) => ({
      thread_id: data.threadId,
      user_id: context.userId,
      role: m.role,
      parts: m.parts as never,
      sdk_message_id: m.sdkMessageId ?? null,
    }));

    const { error } = await context.supabase.from("messages").insert(rows);
    if (error) throw new Error(error.message);

    const { error: threadError } = await context.supabase
      .from("threads")
      .update(
        data.title
          ? { updated_at: new Date().toISOString(), title: data.title.slice(0, 120) }
          : { updated_at: new Date().toISOString() },
      )
      .eq("id", data.threadId);
    if (threadError) throw new Error(threadError.message);

    return { ok: true };
  });

export const deleteThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { threadId: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("threads").delete().eq("id", data.threadId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
