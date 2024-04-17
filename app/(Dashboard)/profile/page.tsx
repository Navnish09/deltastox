"use client";

import { ChangeEvent, useRef } from "react";
import { Plus, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/app/_components/Divider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateMobileAndPassword, uploadLogo } from "@/services/authServices";
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
import { useUser } from "@/app/_globals/context/AuthContext";

const ProfileSchema = z.object({
  name: z.string(),
  profilePic: z.string().optional(),
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
  const { user, refetchUser } = useUser();

  const { toast } = useToast();
  const avatarRef = useRef<HTMLImageElement>(null);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: data,
    values: {
      name: data.name,
      email: data.email,
      location: data.location,
      mobile: data.mobile,
    },
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

  const openFileExplorer = () => {
    // Open file picker
    const filePicker = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    filePicker.value = "";
    filePicker.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type should be image
    if (!file.type.includes("image")) {
      toast({
        title: "File type should be image",
        variant: "destructive",
      });
      return;
    }

    // File size should be smaller than 200kb
    const maxSize = 1024 * 200;
    if (file.size > maxSize) {
      toast({
        title: "File size should be smaller than 200kb",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    uploadLogo(formData)
      .then(() => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (readerEvent) => {
          const result = readerEvent.target?.result;
          if (typeof result === "string") {
            avatarRef.current?.setAttribute("src", result);
          }
        });

        toast({
          title: "Profile picture updated successfully",
          variant: "success",
        });
        refetchUser?.((p) => !p);
      })
      .catch(() => {
        toast({
          title: "Failed to update profile picture",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4 items-center">
        <Avatar className="h-14 w-14">
          <AvatarImage
            src={`data:image/png;base64,${user?.profilePic}`}
            color="#FFBC99"
          />
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((name) => name[0])
              .join("") || <User height={30} width={30} />}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2 items-center">
          <Button onClick={openFileExplorer}>
            <Plus height={20} width={20} /> Update
            <input
              type="file"
              style={{ height: 0, width: 0, opacity: 0 }}
              onChange={handleFileChange}
              accept="image/gif, image/jpeg, image/png"
            />
          </Button>
          {/* <Button variant={"ghost"} size={"icon"}>
            <Trash2 className="text-destructive" height={20} width={20} />
          </Button> */}
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
  );
};

export default function Profile() {
  const { user, isUserReady } = useUser();
  const data = {
    name: user?.name || "",
    email: user.email,
    location: user?.location1 || "",
    mobile: user?.mobile || "",
  };

  return (
    <div className="flex flex-col gap-5 w-full fade-in-5 py-5">
      <h4>Profile Information</h4>
      <Divider />

      {isUserReady ? (
        <div className="flex justify-center items-center h-full w-full  min-h-[500px]">
          <LoadingSpinner />
        </div>
      ) : (
        <ProfileContent data={data} />
      )}
    </div>
  );
}
