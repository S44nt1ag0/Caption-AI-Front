"use client";

import { useAuth } from "@/context/AuthContext";
import { useCallback } from "react";

export function useAuthFetch() {
  const { token, logout } = useAuth();

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      console.log("📋 Headers:", headers);

      try {
        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (response.status === 401) {
          console.warn("❌ Token expirado ou inválido");
          logout();
          throw new Error("Sessão expirada");
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Erro completo:", {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText,
          });
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Erro desconhecido na rede");
      }
    },
    [token, logout]
  );

  return authFetch;
}
