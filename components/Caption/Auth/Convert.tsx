"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Convert() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showMain, setShowMain] = useState(true);
  const [link, setLink] = useState("");

  const convert = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search || search.length <= 10) {
      toast.error("Invalid url.", {
        style: {
          background: "#333",
          color: "#fff",
          padding: "10px",
        },
      });
      return;
    }

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: search }),
      });

      if (!res.ok) {
        toast.error("Erro ao converter.", {
          style: {
            background: "#333",
            color: "#fff",
            padding: "10px",
          },
        });
        return;
      }

      const data = await res.json();

      if (!data.id) {
        toast.error("Erro ao converter.", {
          style: {
            background: "#333",
            color: "#fff",
            padding: "10px",
          },
        });
      }

      setLink(data?.id);
      setShowMain(false);
    } catch {
      toast.error("Internal Server error.", {
        style: {
          background: "#333",
          color: "#fff",
          padding: "10px",
        },
      });
    }
  };

  return (
    <form
      onSubmit={convert}
      className="w-full gap-5 p-5 flex flex-col min-h-[400px] justify-center items-center"
    >
      <Toaster position="top-right" />

      <AnimatePresence mode="wait">
        {showMain ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold text-white/80">
                Converta Seu Vídeo
              </h1>
              <a className="font-semibold text-white/60">
                Aceitamos apenas URL do YouTube
              </a>
            </div>

            <div className="w-full gap-5 flex justify-center items-center">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="URL YouTube"
                className="p-7 rounded-full"
              />
              <Button
                variant="outline"
                className="p-7 rounded-full cursor-pointer"
              >
                Convert
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="secondary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full flex flex-col gap-8 justify-center text-center items-center"
          >
            <div>
              <h1 className="text-2xl font-bold text-white/70">Success</h1>
              <a className="font-semibold -mt-4 text-white/40">
                Successfully Converted
              </a>
            </div>

            <div className="flex gap-6 cursor-pointer items-center justify-center">
              <Button
                onClick={() => router.push(`/caption/${link}`)}
                type="button"
                variant="outline"
                className="p-6 w-4/5 shadow-2xs cursor-pointer"
              >
                Next
              </Button>

              <Button
                type="button"
                className="p-6 cursor-pointer w-3/5 bg-black/50 hover:bg-black/10 text-white shadow-2xs"
                onClick={() => setShowMain(true)}
              >
                Back
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
