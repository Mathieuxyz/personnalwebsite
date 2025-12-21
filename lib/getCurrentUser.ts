import { cookies } from "next/headers";

import { verifySessionValue } from "@/lib/session";

type CurrentUser = {
  login: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const store = await cookies();
  const session = store.get("session")?.value;
  if (!session) return null;
  const login = verifySessionValue(session);
  if (!login) return null;
  return { login };
}
