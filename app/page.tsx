import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-1.5">
      <div className="text-xl flex justify-center items-center">
        Welcome to live bidding platform
      </div>
      <Button className="cursor-pointer">start your next bid</Button>
    </div>
  );
}
