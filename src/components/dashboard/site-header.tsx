"use server";

import Image from "next/image";
import icon from "@/../public/icon.png";
import { Bell, ChevronDown, Megaphone, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCurrentUser } from "@/auth/currentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logOut } from "@/auth/actions";

export async function SiteHeader() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  return (
    <header className="flex justify-between sticky top-0 z-50 h-17 w-full items-center border-b bg-gradient-to-l from-[#296377] to-[#18A2BA] text-white">
      <div className="flex h-full w-full items-center gap-2 px-4 py-3">
        <Image alt="icon" className="h-full w-8" src={icon} />
        <h1>iMeeting</h1>
      </div>
      <div className="flex items-center gap-4 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 p-1 rounded-lg cursor-pointer hover:bg-white/5">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="text-black">
                {currentUser?.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>
            <p className="text-start w-[100px] max-w-[100px] overflow-hidden truncate">
              {currentUser?.name}
            </p>
            <ChevronDown width={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Megaphone />
                Kontak Aduan
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell />
                Pemberitahuan
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={logOut}
                variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
