import React from "react";

import { redirect } from "next/navigation";
import { auth } from "@/shared/auth/auth";
import LoginPage from "@/views/login/ui";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/reinstatement-responsibles");
  return <LoginPage />;
};

export default page;
