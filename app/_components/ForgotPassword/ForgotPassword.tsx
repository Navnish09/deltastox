"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/services/authServices";
import { REMEMBER_ME_KEY } from "@/app/_globals/constant";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

type Props = {};

export const ForgotPassword = ({}: Props) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: localStorage.getItem(REMEMBER_ME_KEY) || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const { email } = values;

    return new Promise((resolve, reject) => {
      forgotPassword({ email })
        .then((res) => {
          toast({
            title: "Updated password sent to email",
            description: "Please check your spam folder as well",
            variant: "success",
          });
        })
        .catch((err) => {
          toast({
            title: "Error occurred while sending email",
            variant: "destructive",
          });
        })
        .finally(() => {
          resolve("");
        });
    });
  };

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
        {/* <img
          alt="delta logo"
          style={{ aspectRatio: 4 }}
          height={80}
          width={220}
          src="/Images/Delta_Logo.svg"
        /> */}

        <div className={"items-start flex w-full flex-col gap-8 relative"}>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to reset your password
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
                            label="Email"
                            placeholder={"Enter your email"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!formStates.isValid || formStates.isSubmitting}
                >
                  {formStates.isSubmitting ? "Please wait..." : "Send Email"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Please check your spam folder if you don't see the email in
                  your inbox.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
