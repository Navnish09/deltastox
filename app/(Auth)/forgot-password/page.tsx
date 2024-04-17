import React from "react";

import { Login } from "@/app/_components/Login";
import { ForgotPassword } from "@/app/_components/ForgotPassword";

const LoginPage = () => {
  return (
    <div className={"flex justify-center relative w-full h-full items-center"}>
      <div
        className={
          "flex items-start md:basis-3/12 self-stretch relative flex-col justify-center"
        }
      >
        <ForgotPassword />
      </div>
    </div>
  );
};

export default LoginPage;
