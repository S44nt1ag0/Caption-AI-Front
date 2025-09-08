"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Convert() {
  return (
    <div className="w-full gap-5 p-5 flex flex-col min-h-[400px] justify-center items-center">
        <div className="w-5/6">
            <h1 className="text-2xl font-bold text-white/80">Coverta Seu Video</h1>
            <a className="font-semibold text-white/60">Aceitamos apenas url do youtube</a>
        </div>
        
      <div className="w-5/6 gap-5 flex justify-center items-center">
        <Input
          type="text"
          placeholder="URL Youtube"
          className="p-7 rounded-full"
        />
        <Button variant="outline" className="p-7 rounded-full cursor-pointer">
          Convert
        </Button>
      </div>
    </div>
  );
}
