"use client";

import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { UsersTable } from "./Users";

export default function ManageUsers() {
  return (
    <div className="flex px-4 py-5 flex-col md:gap-8 gap-6 relative h-full">
      <div className="flex item-center justify-between flex-wrap gap-2">
        <ThumbHeading heading="Users" color="success" />
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  );
}
