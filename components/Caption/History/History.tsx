"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { getSessionToken } from "@/app/actions/GetCookie";
import { AxiosService } from "@/services/AxiosService";

interface IHistory {
  id: string;
  title: string;
  createdAt: Date;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = React.useState([] as IHistory[]);

  useEffect(() => {
    const fetchHistory = async () => {
      const jwt = await getSessionToken();

      try {
        const { data } = await AxiosService.get("/v1/history", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (data) {
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
    <motion.div className="my-10 max-h-[70vh] overflow-y-auto scroll-hidden">
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
        {Array.isArray(history) && history.length > 0 ? (
          history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="w-full p-4 flex shadow-2xl flex-row items-center justify-between">
                <div>
                  <h3>
                    {item.title && item.title.length > 40
                      ? `${item.title.slice(0, 40)}...`
                      : item.title || item.id}
                  </h3>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <h3 className="flex flex-row items-center gap-2 text-white/60">
                    <LuCalendar className="text-1xl text-white/80" />
                    {new Date(item.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <Button
                    variant="outline"
                    className="p-6 cursor-pointer rounded-2xl min-w-[70px] shadow-2xs"
                    onClick={() => router.push(`/caption/${item.id}`)}
                  >
                    <LuEye className="text-white/80" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-white/60 text-center py-4">
            Nenhuma pesquisa encontrada
          </div>
        )}
      </div>
    </motion.div>
  );
}
