import { Inter } from "next/font/google";

import { SideNavigation } from "@globals/components/Side-Navigation";
import { TopNavigation } from "@globals/components/Top-Navigation";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import userNavigationData from "@/lib/data/navigation/userNavigation.json";
import { AuthProvider } from "../_globals/context/AuthContext";
import { NavigationProvider } from "../_globals/context/NavigationContext";
import "../globals.css";

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
    <>
      <AuthProvider>
        <NavigationProvider>
          <div className={"relative h-full flex"}>
            <SideNavigation navigationMenus={userNavigationData} />
            <div
              className={
                "flex-grow isolate h-full flex flex-col overflow-hidden"
              }
            >
              <TopNavigation navigationData={userNavigationData} />
              <main className="isolate flex-grow h-full overflow-hidden">
                <div className="py-2 px-4 overflow-auto h-full">{children}</div>
              </main>
            </div>
          </div>
        </NavigationProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}
