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

  return (
    <>
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-start gap-4">
          {isOrderPage && (
            <Button
              className="bg-[#4A8394] aspect-square size-10 cursor-pointer"
              type="button"
              asChild>
              <Link href={"/dashboard/ruang-meeting"}>
                <ChevronLeft />
              </Link>
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold">Ruang Meeting</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  {isOrderPage ? (
                    <BreadcrumbLink
                      className={`${
                        isOrderPage && "text-[#4A8394] cursor-pointer "
                      }`}
                      asChild>
                      <Link href={"/dashboard/ruang-meeting"}>
                        Ruang Meeting
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <p>Ruang Meeting</p>
                  )}
                </BreadcrumbItem>
                {isOrderPage && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>Pesan Ruangan</BreadcrumbItem>
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
      <div className="py-4 max-h-[71vh] overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </>
  );
};

export default RuangMeetingLayout;
