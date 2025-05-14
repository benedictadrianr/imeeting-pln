"use client";

import * as React from "react";
import { File, Home, type LucideIcon } from "lucide-react";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

export type SidebarDataProps = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const data = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Pengajuan",
    url: "/dashboard/ruang-meeting",
    icon: File,
  },
] satisfies SidebarDataProps[];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isHovered } = useSidebar();
  return (
    <Sidebar variant="inset" collapsible="none" className="relative" {...props}>
      <SidebarContent
        className={`bg-white ${isHovered ? "" : "drop-shadow-xl"} px-1 z-20`}>
        <NavMain items={data} />
      </SidebarContent>
      <div
        className={`bg-white drop-shadow-xl absolute left-full w-fit h-full transition-all ease-in-out duration-300 pt-3 pr-3 ${
          isHovered ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}>
        <div
          className={`rounded-r-lg w-[150px] px-3 py-2 bg-[#3b7f96] text-white `}>
          Dashboard
        </div>
      </div>
    </Sidebar>
  );
}
