"use client";

import { Button } from "../../ui/button";
import Image from "next/image";
import Logo from "@/public/img/logo.png";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth");
  };

  return (
    <div className="w-full mt-6 p-4 border-1 border-white/10 shadow-2xs rounded-3xl flex items-center justify-between bg-black/10 backdrop-blur-3xl">
      <div className="flex gap-4 items-center p-3">
        <div>
          <Image src={Logo} width={80} height={80} alt="Logo" />
        </div>
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-white/80">Caption AI</h1>
          <a className="font-semibold text-sm">The Best AI Caption</a>
        </div>
      </div>

      <div className="flex gap-7 justify-center items-center p-6">
        <a className="cursor-pointer font-semibold text-white/90">About</a>
        <Button
          onClick={handleRedirect}
          variant="outline"
          className="p-6 w-3/5 rounded-full cursor-pointer"
        >
          {" "}
          Login{" "}
        </Button>
      </div>
    </div>
  );
}
