"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        const res = await fetch("/api/me");
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
