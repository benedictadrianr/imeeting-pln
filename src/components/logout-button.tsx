"use client";

import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/auth/actions";

const LogoutButton = () => {
  return (
    <Button
      onClick={async () => await logOut()}
      variant={"destructive"}
      type="button">
      Logout
    </Button>
  );
};

export default LogoutButton;
