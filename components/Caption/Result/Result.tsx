"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ICaption {
  success: boolean;
  url: string;
  body: string;
  title: string;
  thumbnail: string;
}

interface Caption {
  caption: ICaption;
}

export default function Result({ caption }: Caption) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption?.body);
      setIsCopied(true);
      toast.success("Copiado...", {
        style: {
          background: "#333",
          color: "#fff",
          padding: "10px",
        },
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar: ", err);
    }
  };

  if (!caption.body)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="min-h-full mt-20 flex flex-col gap-4 items-center justify-center"
      >
        <div className="text-lg font-bold text-white/60">
          Caption ID is Invalid
        </div>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="w-1/6 rounded-full shadow-2xl cursor-pointer pt-6 pb-6"
        >
          Voltar
        </Button>
      </motion.div>
    );

  return (
    <motion.div
      key="main"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full mt-14"
    >
      <Toaster position="top-right" />

      <div className="flex justify-between items-center gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold text-white/70">Result</h1>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-8 mt-6">
        <div className="w-1/2 flex flex-col gap-5">
          <Image
            src={caption.thumbnail}
            width={500}
            height={500}
            alt="thumb"
            className="rounded-3xl shadow-2xl object-cover"
          />

          <h1 className="text-lg font-semibold text-white/60">
            {caption.title.length > 34
              ? caption.title.slice(0, 34) + "..."
              : caption.title}
          </h1>

          <div className="w-full mt-2 flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-1/2 shadow-2xl cursor-pointer pt-6 pb-6"
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="w-1/2 cursor-pointer pt-6 pb-6"
            >
              Voltar
            </Button>
          </div>
        </div>

        <div className="w-1/2">
          <Textarea
            value={caption.body}
            disabled
            className="min-h-full max-h-[500px] text-left text-semibold"
          />
        </div>
      </div>
    </motion.div>
  );
}
