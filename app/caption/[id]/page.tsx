"use client";

import React, { use, useEffect, useState } from "react";
import { useProtectedPage } from "@/hooks/useProtectedPage";
import NavAuth from "@/components/Caption/Auth/Nav";
import Result from "@/components/Caption/Result/Result";
import toast from "react-hot-toast";

import Loading from "@/components/Utils/Loading";
import { getSessionToken } from "@/app/actions/GetCookie";

interface ICaption {
  success: boolean;
  url: string;
  body: string;
  title: string;
  thumbnail: string;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { userData, loading } = useProtectedPage();
  const [caption, setCaption] = useState<ICaption>(null);
  const [fetching, setFetching] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    if (!id) return;

    const fetchCaption = async () => {
      try {
        const jwt = await getSessionToken();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/caption/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!res.ok) throw new Error("Erro ao buscar caption");
        const data = await res.json();
        setCaption(data);
      } catch {
        toast.error("Invalid Id Caption.", {
          style: {
            background: "#333",
            color: "#fff",
            padding: "10px",
          },
        });
      } finally {
        setFetching(false);
      }
    };

    fetchCaption();
  }, [id]);

  if (loading || fetching) {
    return <Loading />;
  }

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Id is empty.</div>
      </div>
    );
  }

  return (
    <>
      <NavAuth user={userData} />
      <Result caption={caption} />
    </>
  );
}
