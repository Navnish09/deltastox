"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Divider } from "@components/Divider";

import { Google, Show } from "@icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { login, setToken, signUp } from "@/services/authServices";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const SignupSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .nonempty("Name is required"),
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
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .nonempty("Confirm password is required"),
    agreed: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.agreed, {
    message: "You must agree to the terms and conditions",
    path: ["agreed"],
  });

const SignupPage = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
    mode: "onChange",
  });

  const formStates = form.formState;

  const SignUp = async (values: z.infer<typeof SignupSchema>) => {
    const { name, email, password } = values;

    if (!formStates.isValid) return;

    try {
      await signUp({ name, password, email });
      // Login user once signed up
      const res = await login({ email, password });

      setToken(res.data.jwtToken);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"flex justify-center relative w-full h-full items-center"}>
      <div
        className={
          "flex items-start w-fit self-stretch relative flex-col justify-center"
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
            <img
              alt="delta logo"
              height={80}
              width={220}
              style={{ aspectRatio: 3.5 }}
              src="/Images/Delta_Logo.svg"
            />

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
                  Let’s get started by filling out the form
                </p>
              </div>

              <Divider direction="horizontal" size="small" variant="dark" />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(SignUp)}
                  className="space-y-8 w-full"
                >
                  <div
                    className={"items-start self-stretch flex flex-col gap-6"}
                  >
                    <div className="flex flex-col gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                size="lg"
                                placeholder={"Enter your full name"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                size="lg"
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
                                size="lg"
                                type={passwordVisible ? "text" : "password"}
                                placeholder={"Enter your password"}
                                {...field}
                                endIcon={
                                  <Show
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                    height={20}
                                    width={20}
                                    style={{ cursor: "pointer" }}
                                  />
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type={passwordVisible ? "text" : "password"}
                                size="lg"
                                placeholder={"Confirm your password"}
                                {...field}
                                endIcon={
                                  <Show
                                    onClick={() =>
                                      setPasswordVisible(!passwordVisible)
                                    }
                                    height={20}
                                    width={20}
                                    style={{ cursor: "pointer" }}
                                  />
                                }
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
                        name="agreed"
                        render={({
                          field: {
                            name,
                            disabled,
                            onBlur,
                            ref,
                            value,
                            onChange,
                          },
                        }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                label="I agree to the Terms and Conditions and the Trading Risk Notice"
                                checked={value}
                                onChange={console.log}
                                onCheckedChange={(checked) =>
                                  onChange({ target: { value: checked, name } })
                                }
                                {...{ name, disabled, onBlur, ref }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={formStates.isSubmitting || !formStates.isValid}
                    >
                      {formStates.isSubmitting
                        ? "Signing up..."
                        : "Sign up now"}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className={"w-full flex justify-center text-sm"}>
                <span className={"text-muted-foreground"}>
                  Already have an account?&nbsp;&nbsp;
                </span>
                <Link href={"/login"} className={"underline text-foreground"}>
                  Sign in now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
