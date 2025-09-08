"use client";

import Image from "next/image";
import robotImage from "../../../public/img/robot_home.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth");
  };

  return (
    <div className="w-full mt-30 items-center flex">
      <div className="w-1/2">
        <Image src={robotImage} width={400} height={400} alt="robot" />
      </div>

      <div className="w-1/2 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white/70"> Caption AI </h1>
          <Badge
            variant="outline"
            className="p-2 pl-5 pr-5 mt-2 rounded-full font-semibold"
          >
            Converta e Resuma Seus Videos
          </Badge>
        </div>

        <div>
          <p className="font-semibold text-white/50 max-w-5/6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            molestias assumenda autem. Cumque ullam ad reiciendis voluptatum.
            Quae incidunt eius quia corrupti odit, fugit voluptas, deleniti,
            accusamus veniam iusto ratione.
          </p>

          <div className="w-full mt-10">
            <Button
              onClick={handleRedirect}
              variant="outline"
              className="p-7 w-2/6 rounded-full hover:blur-none cursor-pointer"
            >
              Começar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
