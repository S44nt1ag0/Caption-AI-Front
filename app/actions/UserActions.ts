"use server";

import { cookies } from "next/headers";
import { getSessionToken } from "./GetCookie";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

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

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const jwt = await getSessionToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Erro ${response.status}: ${response.statusText}`
      );
    }

    return { success: true, message: data?.message || "User created." };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Internal server error." };
  }
}
