import { useEffect, useState } from "react";
export function useSession() {
  return { session: null, user: null, loading: false };
}
