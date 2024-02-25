import React from "react";

import { Login } from "@/app/_components/Login";

const LoginPage = () => {
  return (
    <div className={"flex justify-center relative w-full h-full items-center"}>
      <div
        className={
          "flex items-start md:basis-3/12 self-stretch relative flex-col justify-center"
        }
      >
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
