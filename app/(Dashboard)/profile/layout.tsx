"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { PropsWithChildren } from "react";
import { Divider } from "@/app/_components/Divider";
import { Separator } from "@/components/ui/separator";

const navigationData = {
  items: [
    {
      label: "Profile information",
      href: "/profile",
    },
    {
      label: "Password Reset",
      href: "/profile/password-reset",
    },
  ],
};

export default function ProfileLayout({ children }: PropsWithChildren<{}>) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6 py-5">
        <ThumbHeading heading="Profile" />
        <Card className="p-5">
          <div className="flex">
            <div role="navigation" className="w-1/5">
              <NavigationMenu
                orientation="vertical"
                className="w-full items-start"
              >
                <NavigationMenuList className="flex flex-col gap-2 w-full">
                  {navigationData.items.map((item) => (
                    <NavigationMenuItem key={item.label} className="w-full">
                      <Link href={item.href} passHref legacyBehavior>
                        <NavigationMenuLink
                          className={cn(
                            "font-semibold text-sm text-muted-foreground flex transition-all duration-100 p-3 outline-none rounded-xl hover:bg-secondary focus-within:bg-secondary",
                            {
                              "text-primary": pathname === item.href,
                            }
                          )}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Separator orientation="vertical" />
            <div className="p-3 w-full">{children}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
