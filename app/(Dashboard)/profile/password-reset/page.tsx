"use client";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/app/_components/Divider";
import { login, updateMobileAndPassword } from "@/services/authServices";
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

const PasswordSchema = z
  .object({
    // currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function PasswordReset() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onSubmit = (data: z.infer<typeof PasswordSchema>) => {
    return new Promise((resolve, reject) => {
      updateMobileAndPassword({ password: data.newPassword })
        .then((res) => {
          toast({
            title: "Password updated successfully",
            variant: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          reject("");
        })
        .finally(() => {
          resolve("");
        });
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4>Password Reset</h4>
      <Divider />
      <div className="flex flex-col gap-8 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-8 w-full">
              {/* <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="You current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter a new password"
                        {...field}
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="default"
                className="max-w-max"
                type="submit"
                disabled={
                  formStates.isSubmitting ||
                  !(
                    formStates.isValid &&
                    !!Object.keys(formStates.dirtyFields).length
                  )
                }
              >
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
