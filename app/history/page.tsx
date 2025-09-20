"use client";

import NavAuth from "@/components/Caption/Auth/Nav";
import Loading from "@/components/Utils/Loading";
import { useProtectedPage } from "@/hooks/useProtectedPage";
import HistoryPage from "@/components/Caption/History/History";

export default function Page() {
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
      <HistoryPage />
    </>
  );
}
