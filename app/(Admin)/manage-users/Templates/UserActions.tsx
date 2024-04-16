"use client";

import { Dispatch, SetStateAction, useState } from "react";
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

export type ModalActions = {
  toggleModal: Dispatch<SetStateAction<boolean>>;
};

export type ActionProps = {
  row: UserRow;
  onComplete: () => void;
  modalActions: ModalActions;
};

const ActionHandler = ({ actions, onSelect }: any) => {
  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        {actions.map((action: any, index: number) => (
          <div
            key={index}
            className="hover:bg-secondary/50 rounded-sm p-2 px-3"
            onClick={() => {
              onSelect(action);
            }}
          >
            {action.label}
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

  const actions = [
    {
      label: "Subscription",
      component: (
        <UserSubscription
          row={row}
          onComplete={onComplete}
          modalActions={modalActions}
        />
      ),
    },
    ...(!isUserAdmin
      ? [
          {
            label: "Map to Admin",
            component: (
              <MapToAdmin
                row={row}
                onComplete={onComplete}
                modalActions={modalActions}
              />
            ),
          },
        ]
      : []),
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
              onSelect={(action: (typeof actions)[0]) => {
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
