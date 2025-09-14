"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from 'react-spinners';

export default function Convert() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showMain, setShowMain] = useState(true);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={convert}
      className="w-full gap-3 md:gap-5 p-4 md:p-5 flex flex-col min-h-[300px] md:min-h-[400px] justify-center items-center"
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
            className="w-full max-w-md md:max-w-full"
          >
            <div className="w-full mb-4 md:mb-6 text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-white/80">
                Converta Seu Vídeo
              </h1>
              <p className="font-semibold text-white/60 text-sm md:text-base">
                Aceitamos apenas URL do YouTube
              </p>
            </div>

            <div className="w-full gap-3 md:gap-5 flex flex-col md:flex-row justify-center items-center">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="URL YouTube"
                className="p-7 rounded-full w-full text-sm md:text-base"
              />
              <Button
                type="submit"
                variant="outline"
                disabled={loading}
                className="p-7 rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base"
              >
                {loading ? <BeatLoader color="white" size={8} speedMultiplier={1} /> : "Convert"}
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
            className="w-full max-w-md md:max-w-full flex flex-col gap-6 md:gap-8 justify-center text-center items-center"
          >
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white/70">
                Success
              </h1>
              <p className="font-semibold text-white/40 text-sm md:text-base">
                Successfully Converted
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 cursor-pointer items-center justify-center w-full lg:w-1/4">
              <Button
                onClick={() => router.push(`/caption/${link}`)}
                type="button"
                variant="outline"
                className="p-6 w-full md:w-4/5 shadow-2xs cursor-pointer text-sm md:text-base"
              >
                Next
              </Button>

              <Button
                type="button"
                className="p-6 cursor-pointer w-full md:w-3/5 bg-black/50 hover:bg-black/10 text-white shadow-2xs text-sm md:text-base"
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
