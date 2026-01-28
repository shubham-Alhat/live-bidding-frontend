"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-1.5">
      <div className="text-xl flex justify-center items-center">
        Welcome to live bidding platform
      </div>
      <Button onClick={() => router.push("/home")} className="cursor-pointer">
        start your next bid
      </Button>
    </div>
  );
}
