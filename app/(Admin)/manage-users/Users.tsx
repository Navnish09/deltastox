import { useState, useRef } from "react";

import { Confirmation } from "@/app/_components/Confirmation";
import { DataCard } from "@/app/_components/DataCard";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import { DateTemplate } from "@/lib/templates";
import { createColumns } from "@lib/utils";
import { createTemplates } from "@lib/utils/createTemplates";
import { updateUserStatus } from "@/services/apiServices";
import { getUsers } from "@/services/authServices";
import { useToast } from "@/components/ui/use-toast";
import { USER_STATUS } from "@/app/_globals/constant";
import { UserDetails, useUser } from "@/app/_globals/context/AuthContext";

import { StatusTemplate } from "./_templates/Status";
import { UserActions } from "./_templates/UserActions";
import { UserRoles } from "./_templates/UserRoles";

export type UserRow = Pick<
  UserDetails,
  | "name"
  | "email"
  | "roles"
  | "subscritionStartDate"
  | "subscritionEndDate"
  | "status"
>;

export const UsersTable = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [statusModal, setStatusModal] = useState(false);
  const { data: tableData, refresh } = useAPI({
    requestHandler: getUsers,
    returnData: (res) => res.data,
  });

  const selectedUser = useRef<UserRow | null>(null);

  const isCurrentUser = (email: string) => email === user.email;

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
    actions: ({ row: { original: rowData } }) => {
      if (isCurrentUser(rowData.email)) return null;
      return <UserActions row={rowData} refresh={refresh} />;
    },
    subscritionStartDate: ({ row: { original: rowData } }) => {
      return <DateTemplate date={rowData.subscritionStartDate} />;
    },
    subscritionEndDate: ({ row: { original: rowData } }) => {
      return <DateTemplate date={rowData.subscritionEndDate} />;
    },
    roles: ({ row: { original: rowData } }) => {
      return <UserRoles roles={rowData.roles} />;
    },
    status: ({ row: { original: rowData } }) => {
      // If the user is the logged in user, then the status should be always active
      if (isCurrentUser(rowData.email)) {
        return <StatusTemplate status={USER_STATUS.Y} />;
      }
      return (
        <StatusTemplate
          status={rowData.status}
          onClick={() => {
            setStatusModal(true);
            selectedUser.current = rowData;
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
