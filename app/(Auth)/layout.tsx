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
    <html lang="en">
      <body className={`${inter.className} dark auth-screen-bg`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
