"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SwingChart, BarChart, Home, LineChart, PieChart, Tool } from "@icons";
import { cn } from "@/lib/utils";

import navigationData from "@/lib/data/navigations.json";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const IconList = {
  Dashboard: <Home height={24} width={24} />,
  Market: <BarChart height={24} width={24} />,
  Delta: <Tool height={24} width={24} />,
  Power: <LineChart height={24} width={24} />,
  Sector: <PieChart height={24} width={24} />,
  Swing: <SwingChart height={24} width={24} />,
};

export const SideNavigation = () => {
  const pathname = usePathname();

  return (
    <div
      className={
        "bg-darked-background sticky h-full w-[250px] min-w-[250px] flex justify-center py-5 px-5 top-0"
      }
    >
      <div className={"flex flex-col gap-12 w-full"}>
        <div className={"flex justify-center"}>
          <img src="/Images/Delta_Logo.svg" width={175} alt="Logo" />
        </div>
        <NavigationMenu orientation="vertical" className="w-full items-start">
          <NavigationMenuList className="flex flex-col gap-2 w-full">
            {navigationData.items.map((item) => (
              <NavigationMenuItem key={item.label} className="w-full">
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
                      className={cn("font-semibold text-sm", {
                        ["text-primary-foreground"]: pathname === item.href,
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
