"use client";

import Image from "next/image";
import Logo from "@/public/img/logo.png";
import LogoPremium from "@/public/img/logo_premium.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface User {
  id: string;
  name: string;
  email: string;
  premium: boolean;
}

interface NavAuthProps {
  user: User;
}

export default function NavAuth({ user }: NavAuthProps) {
  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/auth";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        damping: 15,
        stiffness: 100,
      }}
      className="w-full flex items-center justify-between mt-10 px-4 md:px-0"
    >
      <div className="flex items-center gap-3">
        <Image
          src={user.premium ? LogoPremium : Logo}
          width={80}
          height={80}
          alt="Logo"
          className="hidden md:block"
        />
        <div>
          <h1 className="text-2xl font-bold text-white/70 -mb-1">
            {user.name ? user.name?.split(" ")[0] : "Pedro"}
          </h1>
          <a className="font-semibold text-sm">
            {user.premium ? "Premium User" : "The Best AI Caption"}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <a className="font-normal cursor-pointer">Historico</a>
        <Button
          onClick={logout}
          variant="outline"
          className="p-5 cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
