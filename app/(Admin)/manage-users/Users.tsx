import { useState, useRef } from "react";

import { Confirmation } from "@/app/_components/Confirmation";
import { DataCard } from "@/app/_components/DataCard";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import { DateTemplate } from "@/lib/Templates";
import { createColumns } from "@/lib/utils";
import { createTemplates } from "@/lib/utils/createTemplates";
import { updateUserStatus } from "@/services/apiServices";
import { getUsers } from "@/services/authServices";
import { useToast } from "@/components/ui/use-toast";
import { USER_STATUS } from "@/app/_globals/constant";

import { StatusTemplate } from "./Templates/Status";
import { UserActions } from "./Templates/UserActions";

export type UserRow = {
  name: string;
  email: string;
  roles: { id: number; name: string }[];
  subscritionStartDate: string;
  subscritionEndDate: string;
  status: `${USER_STATUS}`;
};

export const UsersTable = () => {
  const { toast } = useToast();

  const [statusModal, setStatusModal] = useState(false);
  const { data: tableData, refresh } = useAPI({
    requestHandler: getUsers,
    returnData: (res) => res.data,
  });

  const selectedUser = useRef<UserRow | null>(null);

  const columns = createColumns([
    ["name", "Name"],
    ["email", "Email"],
    ["roles", "Roles"],
    ["subscritionStartDate", "Subscription Start Date"],
    ["subscritionEndDate", "Subscription End Date"],
    ["status", "Status"],
    ["actions", "Actions"],
  ] as const);

  const templates = createTemplates(columns, {
    actions: (prop) => {
      return <UserActions row={prop.row.original} refresh={refresh} />;
    },
    subscritionStartDate: (prop) => {
      return <DateTemplate date={prop.row.original.subscritionStartDate} />;
    },
    subscritionEndDate: (prop) => {
      return <DateTemplate date={prop.row.original.subscritionEndDate} />;
    },
    roles: (prop) => {
      const data: UserRow = prop.row.original;
      return data.roles.map((role) => role.name).join(", ");
    },
    status: (prop) => {
      return (
        <StatusTemplate
          status={prop.row.original.status}
          onClick={() => {
            setStatusModal(true);
            selectedUser.current = prop.row.original;
          }}
        />
      );
    },
  });

  const handleStatusConfirm = async () => {
    try {
      if (!selectedUser.current) return;
      await updateUserStatus({
        email: selectedUser.current.email,
        status:
          selectedUser.current.status === USER_STATUS.Y
            ? USER_STATUS.N
            : USER_STATUS.Y,
      });

      toast({
        title: "Status Updated",
        description: "User status has been updated successfully",
        variant: "success",
      });

      selectedUser.current = null;
      refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }

    setStatusModal(true);
  };

  return (
    <>
      <DataCard
        loading={!tableData?.length}
        templates={templates}
        data={tableData}
        searchColumns={["name", "email"]}
        columns={columns}
      />

      <Confirmation
        open={statusModal}
        setOpen={setStatusModal}
        title="Update User Status"
        description="Are you sure you want to update the status?"
        onConfirm={handleStatusConfirm}
      />
    </>
  );
};
