"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SwingChart, BarChart, Home, LineChart, PieChart, Tool } from "@icons";
import { cn } from "@lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MessageSquareIcon, MessageSquarePlus, User, X } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";

const IconList = {
  Dashboard: <Home height={24} width={24} />,
  Market: <BarChart height={24} width={24} />,
  Delta: <Tool height={24} width={24} />,
  Power: <LineChart height={24} width={24} />,
  Sector: <PieChart height={24} width={24} />,
  Swing: <SwingChart height={24} width={24} />,
  User: <User height={24} width={24} />,
  Message: <MessageSquarePlus height={24} width={24} />,
};

export type NavigationData = {
  items: {
    label: string;
    href: string;
    icon: string;
  }[];
};

export type Props = {
  navigationMenus: NavigationData;
};

export const SideNavigation = ({ navigationMenus }: Props) => {
  const { sideNavigationOpenState, setSideNavigationOpenState } =
    useNavigationContext();

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-darked-background md:static h-full md:max-w-[250px] transition-all duration-200 flex justify-center py-5 px-5 top-0 absolute z-[1] w-full ",
        {
          ["md:max-w-[90px] md:min-w-[90px] overflow-hidden -translate-x-full md:-translate-x-0"]:
            !sideNavigationOpenState,
        }
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-12 w-full opacity-100 overflow-hidden transition-opacity"
        )}
      >
        <div className={"flex md:justify-start justify-between items-center"}>
          <img
            src="/Images/Delta_Logo.svg"
            width={175}
            alt="Logo"
            className={cn("w-44 h-12 min-w-[11rem] min-h-[3rem]")}
          />
          <X
            className="md:hidden h-6 w-6 text-muted-foreground"
            onClick={() => {
              setSideNavigationOpenState(false);
            }}
          />
        </div>
        <NavigationMenu
          orientation="vertical"
          className="w-full items-start overflow-hidden"
        >
          <NavigationMenuList className="flex flex-col gap-2 w-full items-start">
            {navigationMenus.items.map((item) => (
              <NavigationMenuItem
                key={item.label}
                className={cn("w-full !m-0", {
                  // ["w-max"]: !sideNavigationOpenState,
                })}
              >
                <Link href={item.href} passHref legacyBehavior>
                  <NavigationMenuLink
                    className={cn(
                      "flex items-center gap-3 text-muted-foreground transition-all duration-100 p-3 outline-none rounded-xl hover:bg-secondary focus-within:bg-secondary",
                      {
                        ["bg-primary text-primary-foreground hover:bg-primary focus-within:bg-primary shadow-[0_1px_1px_0_#FFF_inset]"]:
                          pathname === item.href,
                      }
                    )}
                  >
                    <span
                      className={cn({
                        ["text-primary-foreground"]: pathname === item.href,
                      })}
                    >
                      {IconList[`${item.icon as keyof typeof IconList}`]}
                    </span>
                    <div
                      className={cn("font-semibold text-sm whitespace-nowrap", {
                        ["text-primary-foreground"]: pathname === item.href,
                        ["hidden"]: !sideNavigationOpenState,
                      })}
                    >
                      {item.label}
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default SideNavigation;
