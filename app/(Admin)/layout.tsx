import { Inter } from "next/font/google";

import { SideNavigation } from "@globals/components/Side-Navigation";
import { TopNavigation } from "@globals/components/Top-Navigation";
import { Toaster } from "@/components/ui/toaster";
import adminNavigationData from "@/lib/data/navigation/adminNavigation.json";

import { AuthProvider } from "@globals/context/AuthContext";
import { NavigationProvider } from "@globals/context/NavigationContext";
import { USER_ROLES } from "../_globals/constant";
import { cn } from "@/lib/utils";

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
    // <html lang="en">
    // <body className={cn(inter.className, "dark bg-background")}>
    <>
      <AuthProvider allowedRoles={[USER_ROLES.ADMIN]}>
        <NavigationProvider>
          <div className={"relative h-full flex"}>
            <SideNavigation navigationMenus={adminNavigationData} />
            <div
              className={
                "flex-grow isolate h-full flex flex-col overflow-hidden"
              }
            >
              <TopNavigation navigationData={adminNavigationData} isAdminPage />
              <main className="isolate flex-grow h-full overflow-hidden">
                <div className="py-2 px-4 overflow-auto h-full">{children}</div>
              </main>
            </div>
          </div>
        </NavigationProvider>
      </AuthProvider>
      <Toaster />
    </>
    // </body>
    // </html>
  );
}
