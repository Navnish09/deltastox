"use client";
import React, { useLayoutEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";

import { Google, Show } from "@/app/_icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "../Divider";
import { login } from "@/services/authServices";
import { REMEMBER_ME_KEY } from "@/app/_globals/constant";

type Props = {};

export const Login = ({}: Props) => {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState<CheckedState>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await login(userDetails);

      // Store token in local storage.
      if (res.data?.jwtToken) localStorage.setItem("token", res.data.jwtToken);

      // Store email in local storage if remember me is checked.
      if (rememberMe) localStorage.setItem(REMEMBER_ME_KEY, userDetails.email);
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    // Get previous email from local storage.
    const previousEmail = localStorage.getItem(REMEMBER_ME_KEY);
    if (previousEmail) {
      setRememberMe(true);
      setUserDetails({ ...userDetails, email: previousEmail });
    }
  }, []);

  return (
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
        <img
          alt="delta logo"
          height={80}
          width={220}
          src="/Images/Delta_Logo.svg"
        />

        <div className={"items-start flex w-full flex-col gap-8 relative"}>
          <div
            className={"items-start self-stretch flex flex-col gap-5 relative"}
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
              <Input
                size="lg"
                value={userDetails.email}
                placeholder={"Enter your email"}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
              <Input
                size="lg"
                type={passwordVisible ? "text" : "password"}
                value={userDetails.password}
                placeholder={"Enter your Password"}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                endIcon={
                  <Show
                    height={20}
                    width={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
            </div>

            <div className="flex w-full justify-between items-center">
              <Checkbox
                label="Remember password"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <Link
                href={"/forgot-password"}
                className={"underline text-foreground text-sm"}
              >
                Forgot Password?
              </Link>
            </div>
            <Button className="w-full" onClick={onLogin} disabled={loading}>
              {loading ? "Please wait..." : "Sign in"}
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
  );
};

export default Login;
