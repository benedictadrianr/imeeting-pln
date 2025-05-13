"use server";

import Image from "next/image";
import icon from "@/../public/icon.png";
import { Button } from "../ui/button";
import { Bell, ChevronDown, Megaphone, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCurrentUser } from "@/auth/currentUser";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logOut } from "@/auth/actions";

export async function SiteHeader() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/");
  return (
    <header className="flex justify-between sticky top-0 z-50 h-17 w-full items-center border-b bg-gradient-to-l from-[#296377] to-[#18A2BA] text-white">
      <div className="flex h-full w-full items-center gap-2 px-4 py-3">
        <Image alt="icon" className="h-full w-8" src={icon} />
        <h1>iMeeting</h1>
      </div>
      <div className="flex items-center gap-4 px-4">
        <Button type="button" className="bg-[#3D7D8F] cursor-pointer">
          <Megaphone />
          Kontak Aduan
        </Button>
        <Bell className="cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 p-1 rounded-lg cursor-pointer hover:bg-white/5">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="text-black">
                {currentUser.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>
            <p className="text-start w-[100px] max-w-[100px] overflow-hidden truncate">
              {currentUser.name}
            </p>
            <ChevronDown width={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={logOut}
              variant="destructive">
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
