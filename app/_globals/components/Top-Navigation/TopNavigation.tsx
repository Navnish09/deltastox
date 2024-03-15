"use client";
import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import navigations from "@/lib/data/navigations.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout, removeToken } from "@/services/authServices";
import { useUser } from "../../context/AuthContext";
import { Menu, User } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";

export const TopNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const { setSideNavigationOpenState } = useNavigationContext();
  const { user, isUserReady } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const pathHeading = navigations.items.find((item) => {
    return item.href === pathname;
  });

  const onLogout = async () => {
    await logout();
    removeToken();
    router.push("/login");
  };

  return (
    <div
      className={
        "sticky w-full max-h-24 px-8 pl-2 py-4 min-h-[75px] top-0 bg-darked-background border-l-2 z-[1]"
      }
    >
      <div className={"flex justify-between items-center"}>
        <div className="flex items-center gap-1">
          <div
            className="p-2 hover:bg-secondary transition rounded-md cursor-pointer"
            onClick={() => setSideNavigationOpenState((prev) => !prev)}
          >
            <Menu height={20} width={20} />
          </div>
          <h3>{pathHeading?.label}</h3>
        </div>

        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <span className="text-sm">{user?.name}</span>
              {isUserReady && (
                <>
                  <Avatar>
                    <AvatarImage src={user?.profilePic} color="#FFBC99" />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("") || <User height={18} width={18} />}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon height={20} width={20} />
                </>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={10}>
            <div
              className="flex flex-col gap-2 text-sm"
              onClick={() => setOpen(false)}
            >
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
