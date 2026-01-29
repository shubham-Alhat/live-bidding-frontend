"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import { LogOutIcon, PlusCircle, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, User } from "@/types/api";

export function DropdownMenuIcons() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await api.post<ApiResponse<User>>("/auth/logout");

      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleCreateAuction = () => {
    router.push("/home/create");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            S
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCreateAuction}>
          <PlusCircle />
          Auction
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
