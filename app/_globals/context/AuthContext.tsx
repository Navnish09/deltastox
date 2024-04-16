"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { notFound, useRouter } from "next/navigation";

import { getUserDetails, logout, removeToken } from "@/services/authServices";
import { useToast } from "@/components/ui/use-toast";

import { useAPI } from "../hooks/useAPI";
import { USER_ROLES, USER_STATUS } from "../constant";
import { LoadingSpinner } from "@/components/ui/loader";

export type Role = {
  id: number;
  name: `${USER_ROLES}`;
};

export type Authority = {
  authority: `${USER_ROLES}`;
};

export type UserDetails = {
  userId: string;
  name: string | null;
  email: string;
  mobile: string | null;
  status: `${USER_STATUS}`;
  roles: Role[];

  doj: string;
  profilePic?: string;
  location1: string | null;
  location2: string | null;
  location3: string | null;
  subscritionStartDate: string;
  subscritionEndDate: string | null;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

type AuthContextType = {
  user: UserDetails;
  isUserReady: boolean;
  refetchUser: Dispatch<SetStateAction<boolean>>;
};

const authContext = createContext<AuthContextType>({
  user: {} as AuthContextType["user"],
  isUserReady: false,
  refetchUser: () => {},
});

export const useUser = () => {
  const user = useContext(authContext);
  if (!user) {
    throw new Error("User must be used within a AuthProvider");
  }

  return user;
};

export const AuthProvider = ({
  children,
  allowedRoles,
}: PropsWithChildren<{
  allowedRoles?: string[];
}>) => {
  const router = useRouter();
  const { toast } = useToast();

  const [refresh, refetchUser] = useState(false);
  const params = useMemo(() => ({ refresh }), [refresh]);

  const { data, isLoading } = useAPI<
    AuthContextType["user"],
    typeof getUserDetails
  >({
    requestHandler: getUserDetails,
    params: params as any,
    returnData: (data) => data.data,
  });

  useLayoutEffect(() => {
    if (data?.status === "N") {
      toast({
        title: "Account is disabled",
        description: "Please contact the support team",
        variant: "destructive",
      });

      logout().finally(() => {
        removeToken();
        router.replace("/login");
      });
    }
  }, [data]);

  if (isLoading) {
    return null;
  }

  // Check if the user has the required roles
  if (allowedRoles?.length && data.authorities?.length) {
    const hasRole = data.authorities.some(({ authority }) =>
      allowedRoles.includes(authority)
    );

    if (!hasRole) {
      return notFound();
    }
  }

  return (
    <authContext.Provider
      value={{ user: data, isUserReady: isLoading, refetchUser }}
    >
      {children}
    </authContext.Provider>
  );
};
