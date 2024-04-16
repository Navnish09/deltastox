import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  variant?: "danger" | "success";
  title: string;
  description?: string;
  onConfirm: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const variantMap: Record<"danger" | "success", ButtonProps["variant"]> = {
  danger: "destructive",
  success: "default",
};

const buttonTextMap: Record<"danger" | "success", string> = {
  danger: "Delete",
  success: "Confirm",
};

export const ConfirmationContent = ({
  title,
  description,
  variant = "success",
  onCancel,
  onConfirm,
  loading,
}: Omit<Props, "open" | "setOpen"> & {
  loading: boolean;
  onCancel: () => void;
}) => {
  return (
    <DialogContent>
      <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
      {description && <DialogDescription>{description}</DialogDescription>}
      <DialogFooter className="mt-5">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={variantMap[variant]}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Please wait..." : buttonTextMap[variant]}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export const Confirmation = ({
  open,
  title,
  setOpen,
  variant = "success",
  onConfirm,
  description,
}: Props) => {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <ConfirmationContent
        {...{
          title,
          description,
          variant,
          onCancel: () => setOpen(false),
          onConfirm: handleConfirm,
          loading,
        }}
      />
    </Dialog>
  );
};

export default Confirmation;
