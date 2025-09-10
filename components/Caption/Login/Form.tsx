"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { loginUser } from "@/app/actions/UserActions";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dash");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const result = await loginUser(email, password);

      if (result.success && result.token) {
        login(result.token);
      } else {
        setError("Invalid Email or Username.");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 max-w-[1200px] flex justify-center items-center fixed h-[calc(100vh-80px)] top-20">
      <form
        onSubmit={handleSubmit}
        className="w-3/6 flex flex-col gap-8 p-8 rounded-xl shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-white/80">Login</h1>
          <p className="text-white/50">Entre com suas credenciais</p>
        </div>

        {error && (
          <div
            id="login-error"
            className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded text-sm"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="p-7"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="p-7"
          />
        </div>

        <div className="flex gap-2 w-full">
          <Button
            type="submit"
            variant="outline"
            disabled={isLoading}
            className="p-6 cursor-pointer w-1/2 font-semibold"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <Button
            type="submit"
            variant="ghost"
            disabled={isLoading}
            className="p-6 cursor-pointer w-1/2"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
