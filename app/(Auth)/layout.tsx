import { Inter } from "next/font/google";

import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delta Stox",
  description: "Market Decoded",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`auth-screen-bg h-full w-full`}>
      {children}
      <Toaster />
    </div>
  );
}
