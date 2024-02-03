"use client";
import React, { useLayoutEffect, useState } from "react";

import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Show } from "@/app/_icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "../Divider";
import { login, setToken } from "@/services/authServices";
import { REMEMBER_ME_KEY } from "@/app/_globals/constant";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});

type Props = {};

export const Login = ({}: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onLogin = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password, rememberMe } = values;

    return new Promise((resolve, reject) => {
      login({ email, password })
        .then((res) => {
          if (rememberMe) localStorage.setItem(REMEMBER_ME_KEY, email);

          if (res.data?.jwtToken) {
            setToken(res.data.jwtToken);
            router.push("/");
          } else {
            toast({
              title: "Invalid credentials",
              description: "Please check your email and password",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          resolve("");
        });
    });
  };

  useLayoutEffect(() => {
    // Get previous email from local storage.
    const previousEmail = localStorage.getItem(REMEMBER_ME_KEY);

    if (previousEmail) {
      form.setValue("email", previousEmail);
      form.setValue("rememberMe", true);
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
          "items-center flex flex-col gap-6 justify-center relative w-full"
        }
      >
        <img
          alt="delta logo"
          style={{ aspectRatio: 4 }}
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
            {/* <div className={"w-full flex justify-center items-center"}>
              <Button
                className="flex gap-2 items-center w-full"
                variant={"outline"}
                disabled
              >
                <Google height={20} width={20} />
                Login with Google
              </Button>
            </div> */}
          </div>

          <Divider direction="horizontal" size="small" variant="dark" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onLogin)}
              className="space-y-8 w-full"
            >
              <div className={"items-start self-stretch flex flex-col gap-5"}>
                <div className="flex flex-col gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            size="lg"
                            // label="Email"
                            placeholder={"Enter your email"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={passwordVisible ? "text" : "password"}
                            size="lg"
                            // label="Password"
                            placeholder="Enter your password"
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex w-full justify-between items-center">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({
                      field: { name, disabled, onBlur, ref, value },
                    }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            label="Remember me"
                            checked={value}
                            onCheckedChange={(checked) =>
                              form.setValue("rememberMe", !!checked)
                            }
                            {...{ name, disabled, onBlur, ref }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Link
                    href={"/forgot-password"}
                    className={"underline text-foreground text-sm"}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!formStates.isValid || formStates.isSubmitting}
                >
                  {formStates.isSubmitting ? "Please wait..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
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
