"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RuangMeetingLayout = ({ children }: Props) => {
  const path = usePathname();
  const isOrderPage = path === "/dashboard/ruang-meeting/pesan-ruang-meeting";
  const isRoomPage = path === "/dashboard/ruang-meeting";

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          {isOrderPage && (
            <Button
              className="bg-[#4A8394] aspect-square size-10 cursor-pointer"
              type="button">
              <Link href={"/dashboard/ruang-meeting"}>
                <ChevronLeft />
              </Link>
            </Button>
          )}
          <div>
            <h1>Ruang Meeting</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={`${isRoomPage && "text-[#4A8394] cursor-auto"}`}
                    asChild>
                    {isRoomPage ? (
                      <p>Ruang Meeting</p>
                    ) : (
                      <Link href={"/dashboard/ruang-meeting"}>
                        Ruang Meeting
                      </Link>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {isOrderPage && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-[#4A8394]">
                        Pesan Ruangan
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {!isOrderPage && (
          <Button className="bg-[#4A8394]" type={"button"} asChild>
            <Link
              className="cursor-pointer"
              href="ruang-meeting/pesan-ruang-meeting">
              + Pesan Ruangan
            </Link>
          </Button>
        )}
      </div>
      <div className="py-4 h-full">{children}</div>
    </>
  );
};

export default RuangMeetingLayout;
