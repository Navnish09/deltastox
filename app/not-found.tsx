"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@globals/context/AuthContext";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function NotFound(props: any) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-secondary/50">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-muted-foreground/90">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button
            rel="noopener noreferrer"
            variant={"default"}
            onClick={() => {
              router.replace("/");
            }}
          >
            Back to homepage
          </Button>
        </div>
      </div>
    </section>
  );
}
