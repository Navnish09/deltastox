"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateUserPassword } from "@/services/apiServices";
import { useToast } from "@/components/ui/use-toast";
import { ActionProps } from "../templates/UserActions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Show } from "@/app/_icons";

type Props = ActionProps;

const ChangePasswordSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ChangePassword = ({ row: { email }, onComplete }: Props) => {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    const { password } = values;
    return new Promise(async (resolve, reject) => {
      try {
        await updateUserPassword({
          email,
          password,
        });

        toast({
          title: "Password updated successfully",
          variant: "success",
        });
        onComplete?.();
      } catch (error) {
        toast({
          title: "Failed to update password",
          variant: "destructive",
        });
      } finally {
        resolve(undefined);
      }
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Update password for {email}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-10">
              <div className={"items-start self-stretch flex flex-col gap-5"}>
                <div className="flex flex-col gap-4 w-full">
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
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={!formStates.isValid || formStates.isSubmitting}
                type="submit"
              >
                {formStates.isSubmitting ? "Please wait..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};
