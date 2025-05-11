"use client";

import * as React from "react";
import { File, Home, type LucideIcon } from "lucide-react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

export type SidebarDataProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

const data = [
  {
    title: "Home",
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
  return (
    <Sidebar collapsible="icon" className="top-12 border-none" {...props}>
      <SidebarContent className="bg-white drop-shadow-xl">
        <NavMain items={data} />
      </SidebarContent>
    </Sidebar>
  );
}
