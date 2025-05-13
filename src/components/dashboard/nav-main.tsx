"use client";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { SidebarDataProps } from "./app-sidebar";
import SidebarMenuItemComp from "./sidebar-menu-item-comp";

export function NavMain({ items }: { items: SidebarDataProps[] }) {
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          return (
            <SidebarMenuItemComp key={item.title} item={item} path={path} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
