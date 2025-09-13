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
      className="w-full gap-10 flex justify-between items-center mt-30 min-h-[300px]"
    >
      <div className="w-1/2 flex items-center gap-5">
        <div>
          <Image src={Logo} width={100} height={100} alt="LogoFooter" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-1xl font-bold text-white">Caption IA</h1>
          <a className="font-semibold text-white/60 -mt-1">
            captionaisup@captionai.com
          </a>
          <Badge variant="outline" className="p-2 mt-1 w-1/3 rounded-full">
            {" "}
            2025{" "}
          </Badge>
        </div>
      </div>

      <div className="w-1/2 flex items-center gap-5 justify-end">
        <a className="font-semibold cursor-pointer text-white/90"> Contato </a>
        <Button variant="outline" className="p-6 cursor-pointer rounded-full">
          {" "}
          Duvidas{" "}
        </Button>
      </div>
    </motion.div>
  );
}
