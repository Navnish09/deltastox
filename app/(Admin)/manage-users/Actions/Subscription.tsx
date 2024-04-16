"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { updateSubscription } from "@/services/apiServices";
import { UserRow } from "../page";
import { useToast } from "@/components/ui/use-toast";
import { ActionProps } from "../Templates/UserActions";

type Props = ActionProps;

const SubscriptionSchema = z.object({
  endDate: z.date({
    required_error: "End date is required",
  }),
});

export const UserSubscription = ({
  row: { email, subscritionEndDate },
  onComplete,
}: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      endDate: subscritionEndDate ? new Date(subscritionEndDate) : new Date(),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formStates = form.formState;

  const onSubmit = (values: z.infer<typeof SubscriptionSchema>) => {
    const endDate = format(values.endDate, "yyyy-MM-dd");
    return new Promise(async (resolve, reject) => {
      try {
        await updateSubscription({
          email,
          endDate,
        });

        toast({
          title: "Subscription updated successfully",
          variant: "success",
        });
        onComplete?.();
      } catch (error) {
        toast({
          title: "Failed to update subscription",
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
              <DialogTitle>Manage subscription</DialogTitle>
              <DialogDescription>
                Update subscription end date for {email}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-10">
              <div className={"items-start self-stretch flex flex-col gap-5"}>
                <div className="flex flex-col gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
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
                {formStates.isSubmitting ? "Please wait..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};
