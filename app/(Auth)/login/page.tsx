"use client";

import React from "react";

import Link from "next/link";

import { Divider } from "@components/Divider";

import { Google, Show } from "@icons";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className={"flex justify-center relative w-full h-full items-center"}>
      <div
        className={
          "flex items-start basis-4/12 self-stretch relative flex-col justify-center"
        }
      >
        <div
          className={
            "bg-darked-background items-center self-stretch flex flex-col p-8 justify-center relative rounded-[20px]"
          }
        >
          <div
            className={
              "items-center flex flex-col gap-8 justify-center relative w-full"
            }
          >
            <img height={80} width={220} src="/Images/Delta_Logo.svg" />

            <div className={"items-start flex w-full flex-col gap-8 relative"}>
              <div
                className={
                  "items-start self-stretch flex flex-col gap-5 relative"
                }
              >
                <p
                  className={
                    "text-sm whitespace-nowrap text-muted-foreground text-center w-full"
                  }
                >
                  Welcome back! Login to DELTASTOX
                </p>
                <div className={"w-full flex justify-center items-center"}>
                  <Button
                    className="flex gap-2 items-center w-full"
                    variant={"outline"}
                  >
                    <Google height={20} width={20} />
                    Login with Google
                  </Button>
                </div>
              </div>

              <Divider direction="horizontal" size="small" variant="dark" />

              <div className={"items-start self-stretch flex flex-col gap-5"}>
                <div className="flex flex-col gap-4 w-full">
                  <Input size="lg" placeholder={"Enter your email"} />
                  <Input
                    size="lg"
                    type="password"
                    placeholder={"Enter your Password"}
                    endIcon={
                      <Show
                        height={20}
                        width={20}
                        style={{ cursor: "pointer" }}
                      />
                    }
                  />
                </div>

                <div className="flex w-full justify-between items-center">
                  <Checkbox label="Remember password" />
                  <Link
                    href={"/forgot-password"}
                    className={"underline text-foreground text-sm"}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button className="w-full" onClick={() => router.push("/")}>
                  Sign in
                </Button>
              </div>
              <div className={"w-full flex justify-center text-sm"}>
                <span className={"text-muted-foreground"}>
                  Haven’t an account?&nbsp;&nbsp;
                </span>
                <Link href={"/signup"} className={"underline text-foreground"}>
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
