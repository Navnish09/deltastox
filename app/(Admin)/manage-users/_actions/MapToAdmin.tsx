"use client";

import { mapUserToAdmin } from "@/services/apiServices";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmationContent } from "@/app/_components/Confirmation";
import { ActionProps } from "../_templates/UserActions";
import { useState } from "react";

type Props = ActionProps;

export const MapToAdmin = ({
  row: { email },
  onComplete,
  modalActions,
}: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    return new Promise<undefined>(async (resolve, reject) => {
      try {
        await mapUserToAdmin({
          email,
        });

        toast({
          title: "User mapped to admin successfully",
          variant: "success",
        });
        onComplete?.();
      } catch (error) {
        toast({
          title: "Failed to map user to admin",
          variant: "destructive",
        });
      } finally {
        setLoading(true);
        resolve(undefined);
      }
    });
  };

  return (
    <>
      <ConfirmationContent
        loading={loading}
        title="Map to Admin"
        onCancel={() => modalActions.toggleModal(false)}
        onConfirm={onConfirm}
        description="Are you sure you want to map this user to admin? This action cannot be undone."
      />
    </>
  );
};
