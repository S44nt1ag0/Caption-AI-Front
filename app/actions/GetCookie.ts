"use server";

import { cookies } from "next/headers";

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get("session_token")?.value || null;
}
