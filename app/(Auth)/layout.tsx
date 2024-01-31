import { Inter } from "next/font/google";
import AuthProtection from "../_components/AuthProtection/AuthProtection";

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
    <html lang="en">
      <body className={`${inter.className} dark auth-screen-bg`}>
        <AuthProtection type="public">{children}</AuthProtection>
        <Toaster />
      </body>
    </html>
  );
}
