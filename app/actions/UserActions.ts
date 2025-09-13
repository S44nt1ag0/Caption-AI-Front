"use server";

import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Erro ${response.status}: ${response.statusText}`
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("session_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return { success: true, token: data.access_token };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido no login" };
  }
}
