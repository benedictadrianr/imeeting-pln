"use server";

import { getCurrentUser } from "@/auth/currentUser";
import LogoutButton from "@/components/logout-button";
import React from "react";

const Dashboard = async () => {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  return (
    <div>
      {currentUser.name} | {currentUser.role}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
