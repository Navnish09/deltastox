"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAPI } from "../hooks/useAPI";
import { getUserDetails } from "@/services/authServices";

type AuthContextType = {
  user: {
    userId: string;
    name?: string;
    email: string;
    password: "$2a$10$mkC.NmL42KTnoPBhk7zOJOuaN4lmo1Spy3F7N0M0CgNqH6ddLgYLi";
    mobile?: string;
    doj: string;
    profilePic?: string;
    location1?: string;
    location2?: string;
    location3?: string;
    subscritionStartDate: string;
    subscritionEndDate?: string;
    enabled: boolean;
    username: string;
    authorities?: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
  };
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
    throw new Error("useUser must be used within a AuthProvider");
  }

  return user;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
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

  return (
    <authContext.Provider
      value={{ user: data, isUserReady: isLoading, refetchUser }}
    >
      {children}
    </authContext.Provider>
  );
};
