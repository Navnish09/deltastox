import { Inter } from "next/font/google";

import { SideNavigation } from "@globals/components/Side-Navigation";
import { TopNavigation } from "@globals/components/Top-Navigation";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

import "../globals.css";
import { AuthProvider } from "../_globals/context/AuthContext";
import { NavigationProvider } from "../_globals/context/NavigationContext";

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
        <AuthProvider>
          <NavigationProvider>
            <div className={"relative h-full flex"}>
              <SideNavigation />
              <div className={"flex-grow overflow-auto isolate"}>
                <TopNavigation />
                <main className="px-4 py-2 isolate">{children}</main>
              </div>
            </div>
          </NavigationProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
