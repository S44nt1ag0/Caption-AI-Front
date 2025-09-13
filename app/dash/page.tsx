"use client";

import { useProtectedPage } from "@/hooks/useProtectedPage";
import NavAuth from "@/components/Caption/Auth/Nav";
import Convert from "@/components/Caption/Auth/Convert";
import Loading from "@/components/Utils/Loading";

export default function Dashboard() {
  const { userData, loading } = useProtectedPage();

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Não autorizado</div>
      </div>
    );
  }

  return (
    <>
      <NavAuth user={userData} />
      <Convert />
    </>
  );
}
