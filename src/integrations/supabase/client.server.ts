export const supabaseAdmin = new Proxy({} as Record<string, unknown>, {
  get(_, prop) {
    return undefined;
  },
});
