"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionToken } from "@/app/actions/GetCookie";

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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/me`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (res.status === 401) {
          router.push("/auth");
          return;
        }
        const data: UserData = await res.json();
        setUserData(data);
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
