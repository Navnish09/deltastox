"use client";

import { Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/app/_components/Divider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import {
  getUserDetails,
  updateMobileAndPassword,
} from "@/services/authServices";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";

const ProfileSchema = z.object({
  name: z.string(),
  mobile: z
    .string({
      required_error: "Mobile number is required",
    })
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits"),

  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
});

const ProfileContent = ({ data }: { data: z.infer<typeof ProfileSchema> }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: data,
    values: data,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    return new Promise((resolve, reject) => {
      updateMobileAndPassword({ mobile: data.mobile })
        .then((res) => {
          toast({
            title: "Profile updated successfully",
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
    <>
      <div className="flex flex-col gap-10">
        <div className="flex gap-8 items-center">
          <Avatar className="bg-primary h-16 w-16">
            <AvatarImage src="/Images/User.png" color="#FFBC99" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex gap-3 items-center">
            <Button>
              <Plus height={20} width={20} /> Update
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Trash2 className="text-destructive" height={20} width={20} />
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-8 w-full">
              <Input
                disabled
                label="Display name"
                value={data.name}
                placeholder="Enter display name"
              />
              <Input
                disabled
                label="Email"
                value={data.email}
                placeholder="Enter email"
              />
              <Input
                disabled
                label="Location"
                value={data.location}
                placeholder="Enter display name"
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Mobile" {...field} />
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default function Profile() {
  const { data, isLoading } = useAPI<
    z.infer<typeof ProfileSchema>,
    typeof getUserDetails
  >({
    requestHandler: getUserDetails,
    returnData: (res) => res.data,
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4>Profile Information</h4>
      <Divider />

      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full  min-h-[500px]">
          <LoadingSpinner />
        </div>
      ) : (
        <ProfileContent data={data} />
      )}
    </div>
  );
}
