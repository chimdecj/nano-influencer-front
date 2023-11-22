import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  const token = cookies().get("token");

  if (!token || token?.value == "null") {
    redirect("/login");
  }

  return children;
}

export default layout;
