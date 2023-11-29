import { Inter } from "next/font/google";

import { SideNavigation } from "@globals/components/Side-Navigation";
import { TopNavigation } from "@globals/components/Top-Navigation";

import classes from "./Dashboard.module.scss";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Delta Stox",
  description: "Market decoded",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark bg-background")}>
        <div className={"relative h-full flex"}>
          <SideNavigation />
          <div className={"flex-grow overflow-auto"}>
            <TopNavigation />
            <main className="px-4 py-10 isolate">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
