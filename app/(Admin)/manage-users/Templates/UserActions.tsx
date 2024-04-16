"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { USER_ROLES } from "@/app/_globals/constant";

import { UserRow } from "../Users";
import { UserSubscription } from "../Actions/Subscription";
import { MapToAdmin } from "../Actions/MapToAdmin";
import { Contact, LockKeyhole, UserRoundCog } from "lucide-react";
import { ChangePassword } from "../Actions/ChangePassword";
import { cn } from "@/lib/utils";

export type ModalActions = {
  toggleModal: Dispatch<SetStateAction<boolean>>;
};

export type ActionProps = {
  row: UserRow;
  onComplete: () => void;
  modalActions: ModalActions;
};

export type Action = {
  label: string;
  Icon?: ReactNode;
  disable?: boolean;
  component: ReactNode;
};

const ActionHandler = ({
  actions,
  onSelect,
}: {
  actions: Action[];
  onSelect: (action: Action) => void;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        {actions.map((action: any, index: number) => (
          <div
            key={index}
            className={cn(
              "hover:bg-secondary/50 rounded-sm p-2 px-2 cursor-pointer border-b last:border-b-0",
              {
                "text-muted-foreground cursor-not-allowed": action.disable,
              }
            )}
            onClick={() => {
              !action.disable && onSelect(action);
            }}
          >
            <div className="flex items-center gap-3">
              {action.Icon ? action.Icon : null}
              {action.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const UserActions = ({
  row,
  refresh,
}: {
  row: UserRow;
  refresh: () => void;
}) => {
  const isUserAdmin = row.roles.some((role) => role.name === USER_ROLES.ADMIN);

  const [open, setOpen] = useState(false);
  const [Component, setComponent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const modalActions: ModalActions = {
    toggleModal: (state) => setModalOpen(state),
  };

  const onComplete = () => {
    setModalOpen(false);
    refresh();
  };

  const actions: Action[] = [
    {
      label: "Subscription",
      Icon: <Contact height={20} width={20} />,
      component: (
        <UserSubscription
          row={row}
          onComplete={onComplete}
          modalActions={modalActions}
        />
      ),
    },
    {
      label: "Map to Admin",
      Icon: <UserRoundCog height={20} width={20} />,
      disable: isUserAdmin,
      component: (
        <MapToAdmin
          row={row}
          onComplete={onComplete}
          modalActions={modalActions}
        />
      ),
    },
    {
      label: "Change Password",
      Icon: <LockKeyhole height={20} width={20} />,
      component: (
        <ChangePassword
          row={row}
          onComplete={onComplete}
          modalActions={modalActions}
        />
      ),
    },
  ];

  return (
    <>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger>
          <div className="flex items-center justify-center w-full gap-2 ml-2">
            <Button size={"icon"} variant={"ghost"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ellipsis text-primary"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10}>
          <div className="flex flex-col gap-2 text-sm">
            <ActionHandler
              actions={actions}
              onSelect={(action) => {
                setOpen(false);

                if (action.component) {
                  setModalOpen(true);
                  setComponent(action.component);
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      <Dialog modal onOpenChange={setModalOpen} open={modalOpen}>
        {Component}
      </Dialog>
    </>
  );
};
