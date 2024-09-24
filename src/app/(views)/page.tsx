import LoginPage from "@/pages/login/ui";
import { auth } from "@/shared/auth/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/reinstatement-responsibles");
  return <LoginPage />;
};

export default page;
