"use client";

import Image from "next/image";
import Logo from "@/public/img/logo.png";
import LogoPremium from "@/public/img/logo_premium.png";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const logout = () => {
    console.log("click");
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
      className="w-full flex mt-10 items-center justify-between"
    >
      <div className="flex gap-3 items-center">
        <Image
          src={user.premium ? LogoPremium : Logo}
          width={80}
          height={80}
          alt="Logo"
        />
        <div>
          <h1 className="text-2xl -mb-1 font-bold text-white/70">
            {user?.name}
          </h1>
          <a className="font-semibold text-sm">
            {user.premium ? "Premium User" : "The Best AI Caption"}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <a className="font-normal cursor-pointer"> Historico </a>

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
