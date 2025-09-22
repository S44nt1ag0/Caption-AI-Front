"use server";

import { cookies } from "next/headers";
import { getSessionToken } from "./GetCookie";
import { AxiosService } from "@/services/AxiosService";

export async function loginUser(email: string, password: string) {
  try {
    const { data } = await AxiosService.post("/v1/login", { email, password });

    if (!data) {
      throw new Error(data.message || "Erro desconhecido no login");
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

    const { data } = await AxiosService.post(
      "/v1/create",
      {
        email,
        password,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!data) {
      throw new Error(data.error || "Internal server error.");
    }

    return { success: true, message: data?.message || "User created." };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Internal server error." };
  }
}
