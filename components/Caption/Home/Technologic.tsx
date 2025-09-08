import RobotRelax from "@/public/img/robo_relax.png";
import SecureIcon from "@/public/img/icon/secure.png"
import Bolt from "@/public/img/icon/bolt.png"
import Otimizacao from "@/public/img/icon/otimization.png"

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Tecnologic() {
  return (
    <div className="w-full mt-30 gap-10 items-center flex">
      <div className="w-1/2 flex gap-5 flex-col">
        <div>
          <h1 className="text-3xl font-bold text-white/90">
            Tecnologia e Segurança
          </h1>
          <h3 className="text-white/50 font-semibold">
            Combinamos Tecnologia e Segurança
          </h3>
        </div>

        <p className="font-semibold text-white/80">
          Seus Prompts estão seguros, Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eos totam molestiae, quia voluptatum repellat alias
          possimus dignissimos dicta nemo, enim iusto excepturi quod harum! Quam
          quasi eligendi ea incidunt ullam!
        </p>

        <div className="w-full flex gap-2 mt-10">
          <div className="w-1/3 flex gap-4 flex-col bg-gradient-to-b from-green-600/10 to-transparent shadow-2xs p-5 items-center justify-center rounded-2xl">
            <Image src={SecureIcon} width={80} height={80} alt="SecureIcon" />
            <Badge variant="outline" className="p-2 pl-6 pr-6 border-green-700/30 text-bold rounded-full"> Segurança</Badge>
          </div>


          <div className="w-1/3 flex gap-4 flex-col p-5 items-center bg-gradient-to-t from-yellow-400/10 to-transparent backdrop-blur-3xl justify-center rounded-2xl">
            <Image src={Bolt} width={80} height={80} alt="Bolt" />
            <Badge variant="outline" className="p-2 pl-6 pr-6 border-yellow-300/20 text-bold rounded-full"> Velocidade</Badge>
          </div>


          <div className="w-1/3 flex gap-4 flex-col bg-gradient-to-b from-blue-600/10 to-transparent shadow-2xs p-5 items-center justify-center rounded-2xl">
            <Image src={Otimizacao} width={80} height={80} alt="Otimizacao" />
            <Badge variant="outline" className="p-2 pl-6 border-blue-600/40 pr-6 text-bold rounded-full"> Otimizaçao </Badge>
          </div>

        </div>
      </div>
      <div className="w-1/2">
        <Image src={RobotRelax} width={430} height={430} alt="RobotRelax" />
      </div>
    </div>
  );
}
