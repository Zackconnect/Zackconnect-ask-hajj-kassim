export const supabase = {
  auth: {
    onAuthStateChange: () => ({ subscription: { unsubscribe: () => undefined } }),
    getSession: async () => ({ data: { session: null } }),
    signUp: async () => ({ error: null }),
    signInWithPassword: async () => ({ error: null }),
    setSession: async () => ({ error: null }),
  },
} as const;

