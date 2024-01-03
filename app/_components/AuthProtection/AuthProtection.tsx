"use client";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useLayoutEffect } from "react";

type Props = {
  type: "public" | "protected";
};

export const AuthProtection = ({
  children,
  type,
}: PropsWithChildren<Props>) => {
  const router = useRouter();

  const [allow, setAllow] = React.useState<boolean>(false);

  useLayoutEffect(() => {
    // Check if user is logged in.
    const token = localStorage.getItem("token");

    switch (type) {
      case "public":
        if (token) {
          router.push("/");
        } else {
          setAllow(true);
        }

        break;
      case "protected":
        if (!token) {
          router.push("/login");
        } else {
          setAllow(true);
        }

        break;
    }
  }, []);

  if (!allow) return null;

  return children;
};

export default AuthProtection;
