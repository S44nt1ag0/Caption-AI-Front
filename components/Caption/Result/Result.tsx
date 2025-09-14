"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuCopy } from "react-icons/lu";

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
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
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
      className="w-full mt-16 px-4 md:px-0"
    >
      <Toaster position="top-right" />

      <div className="w-full flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="w-full">
            <Image
              src={caption.thumbnail}
              width={500}
              height={500}
              alt="thumb"
              className="rounded-3xl shadow-2xl object-cover w-full h-auto"
            />
          </div>

          <h1 className="text-lg font-semibold text-white/60">
            {caption.title.length > 34
              ? caption.title.slice(0, 34) + "..."
              : caption.title}
          </h1>

          <div className="w-full mt-2 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full sm:w-1/2 shadow-2xl cursor-pointer pt-6 pb-6"
            >
              <LuCopy /> {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="w-full sm:w-1/2 cursor-pointer pt-6 pb-6"
            >
              Voltar
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Textarea
            value={caption.body}
            disabled
            className="min-h-[200px] md:min-h-[500px] max-h-[500px] w-full text-left text-semibold resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
