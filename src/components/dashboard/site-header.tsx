"use client";

import Image from "next/image";
import icon from "@/../public/icon.png";

export function SiteHeader() {
  return (
    <header className="flex sticky top-0 z-50 h-12 w-full items-center border-b bg-gradient-to-l from-[#296377] to-[#18A2BA] text-white">
      <div className="flex h-full w-full items-center gap-2 px-4 py-1">
        <Image alt="icon" className="h-full w-7" src={icon} />
        <h1>iMeeting</h1>
      </div>
    </header>
  );
}
