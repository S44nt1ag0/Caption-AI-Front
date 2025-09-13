"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Logo from "@/public/img/logoFooter.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
      }}
      className="w-full flex flex-col lg:flex-row justify-between items-center mt-30 gap-6 px-3 sm:px-6 min-h-[300px]"
    >
      <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-5">
        <div>
          <Image src={Logo} width={100} height={100} alt="LogoFooter" />
        </div>

        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-bold text-white">
            Caption IA
          </h1>
          <a className="font-semibold text-white/60 -mt-1">
            captionaisup@captionai.com
          </a>
          <Badge
            variant="outline"
            className="p-3 mt-1 rounded-full mx-auto sm:mx-0"
          >
            2025
          </Badge>
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 flex-col sm:flex-row items-center justify-end gap-4 sm:gap-5 mt-0">
        <a className="font-semibold cursor-pointer text-white/90">Contato</a>
        <Button
          variant="outline"
          className="p-5 rounded-full w-full max-w-xs sm:w-auto cursor-pointer"
        >
          Duvidas
        </Button>
      </div>
    </motion.div>
  );
}
