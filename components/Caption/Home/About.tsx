"use client";

import Image from "next/image";
import robotImage from "../../../public/img/robot_home.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function About() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
      }}
      className="w-full mt-30 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 px-3 sm:px-6"
    >
      {/* Imagem do robô */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={robotImage}
          width={400}
          height={400}
          alt="robot"
          className="max-w-full h-auto"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white/70 text-center lg:text-left">
            Caption AI
          </h1>
          <div className="flex justify-center lg:justify-start mt-2">
            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full font-semibold"
            >
              Converta e Resuma Seus Videos
            </Badge>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white/50 max-w-full lg:max-w-5/6 text-center lg:text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            molestias assumenda autem. Cumque ullam ad reiciendis voluptatum.
            Quae incidunt eius quia corrupti odit, fugit voluptas, deleniti,
            accusamus veniam iusto ratione.
          </p>

          <div className="w-full mt-6 flex justify-center lg:justify-start">
            <Button
              onClick={handleRedirect}
              variant="outline"
              className="p-6 w-3/4 sm:w-2/6 rounded-full cursor-pointer"
            >
              Começar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
