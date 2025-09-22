"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionToken } from "@/app/actions/GetCookie";
import { AxiosService } from "@/services/AxiosService";

interface UserData {
  id: string;
  name: string;
  email: string;
  premium: boolean;
}

export function useProtectedPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const jwt = await getSessionToken();

        const { data: dataMe } = await AxiosService.get("/v1/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!dataMe.name) {
          router.push("/auth");
          return;
        }

        setUserData(dataMe);
      } catch {
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { userData, loading };
}
