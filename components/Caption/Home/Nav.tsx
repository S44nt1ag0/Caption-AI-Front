"use client";

import { Button } from "../../ui/button";
import Image from "next/image";
import Logo from "@/public/img/logo.png";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Nav() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth");
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
      className="w-full mt-6 px-6 sm:px-6 py-4 shadow-2xs rounded-3xl flex items-center justify-between backdrop-blur-3xl"
    >
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <Image src={Logo} width={80} height={80} alt="Logo" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white/80">Caption AI</h1>
          <a className="font-semibold text-sm text-white/60">
            The Best AI Caption
          </a>
        </div>
      </div>

      <div className="flex items-center gap-7">
        <a className="cursor-pointer font-semibold text-white/90">Premium</a>
        <Button
          onClick={handleRedirect}
          variant="outline"
          className="px-6 py-6 rounded-full cursor-pointer"
        >
          Login
        </Button>
      </div>
    </motion.div>
  );
}
