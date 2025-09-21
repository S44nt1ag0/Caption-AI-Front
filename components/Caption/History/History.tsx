"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";

interface IHistory {
  id: string;
  url: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = React.useState([] as IHistory[]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          console.error("Failed to fetch history");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <motion.div
      className="my-10 max-h-[70vh] overflow-y-auto scroll-hidden"
    >
      <div className="my-7 w-full">
      <div className="w-full flex gap-4 items-center">
        <motion.div
          initial={{ rotate: 360 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <LuHistory className="text-4xl text-white/50" />
        </motion.div>

        <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-white/80 ">
          Latest Conversations
        </h1>
        <a className="text-white/60"> Track your History </a>
        </div>
      </div>
      </div>

      <div className="w-full flex flex-col gap-5">
      {history.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className="w-full p-3 flex shadow-2xl flex-row items-center justify-between"
          >
            <h3 className="text-white/60">{item.id}</h3>
            <Button
              variant="outline"
              className="p-6 cursor-pointer min-w-[80px] shadow-2xl"
              onClick={() => router.push(`/caption/${item.id}`)}
            >
              <LuEye className="text-8xl text-white/80" />
            </Button>
          </Card>
        </motion.div>
      ))}
      </div>
    </motion.div>
  );
}
