import { Box } from "@mui/material";
import React from "react";
import { redirect } from "next/navigation";
import Nossr from "@/shared/ui/nossr";
import { auth } from "@/shared/auth/auth";
import { LayoutComponent } from "@/widgets/layout";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const logedInUser = await auth();
  if (!logedInUser) redirect("/");
  return (
    <Nossr>
      <LayoutComponent>
        <Box
          sx={{
            backgroundColor: "var(--background)",
            height: "100%",
            borderRadius: "4px",
          }}
        >
          {children}
        </Box>
      </LayoutComponent>
    </Nossr>
  );
};

export default ProtectedLayout;
