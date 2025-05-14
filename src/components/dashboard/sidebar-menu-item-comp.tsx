"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { SidebarDataProps } from "./app-sidebar";

type Props = {
  item: SidebarDataProps;
  path: string;
};

const SidebarMenuItemComp = ({ item, path }: Props) => {
  const { setIsHovered } = useSidebar();
  function PathEqual(path: string, url: string) {
    if (url === "/dashboard") return url === path;
    if (url === "/dashboard/ruang-meeting") return path.startsWith(url);
  }
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        size={"lg"}
        tooltip={item.title}
        onMouseEnter={() => {
          if (item.url === "/dashboard") setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (item.url === "/dashboard") setIsHovered(false);
        }}
        isActive={PathEqual(path, item.url)}
        className="cursor-pointer justify-center group transition-all ease-in-out duration-300"
        asChild>
        <Link href={item.url}>
          <item.icon
            className={`${
              PathEqual(path, item.url) ? "text-white" : "text-[#296377]"
            } group-hover:text-white transition-all ease-in-out duration-300`}
          />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarMenuItemComp;
