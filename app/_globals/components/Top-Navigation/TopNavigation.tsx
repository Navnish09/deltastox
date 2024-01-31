"use client";
import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import navigations from "@/lib/data/navigations.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export const TopNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathHeading = navigations.items.find((item) => {
    return item.href === pathname;
  });

  const onLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div
      className={
        "sticky w-full max-h-24 px-8 py-4 top-0 bg-darked-background border-l-2 z-[1]"
      }
    >
      <div className={"flex justify-between items-center"}>
        <div>
          <h3>{pathHeading?.label}</h3>
        </div>

        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <span className="text-sm">John Doe</span>
              <Avatar className="bg-primary">
                <AvatarImage src="/Images/User.png" color="#FFBC99" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ChevronDownIcon height={20} width={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={10}>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href={"/profile"}
                className="hover:bg-secondary/50 rounded-sm p-2 px-3"
              >
                Profile
              </Link>
              <div
                role="button"
                className="hover:bg-secondary/50 rounded-sm p-2 px-3"
                onClick={onLogout}
              >
                Logout
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopNavigation;
