"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { createUser } from "@/app/actions/UserActions";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Form() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dash");
    }
  }, [isAuthenticated, router]);

  const back = (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Invalid Fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const result = await createUser(email, password, name);

      if (result.success && result.message) {
        router.push("/auth");
      } else {
        setError(result.error);
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full lg:w-1/2 flex justify-center items-center fixed h-[calc(100vh-80px)] top-20"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col gap-8 p-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white/80">SignUp</h1>
          <p className="text-white/50">Cadastre suas credenciais</p>
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
            type="name"
            placeholder="Name"
            value={name}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="p-7"
          />

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
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Button
            onClick={back}
            variant="ghost"
            disabled={isLoading}
            className="p-6 cursor-pointer w-1/2"
          >
            Back
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
