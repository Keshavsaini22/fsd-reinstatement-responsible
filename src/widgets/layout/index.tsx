"use client";
import { ReactNode, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { AppbarComponent } from "./appbar";
import "./style.scss";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { User } from "next-auth";
import { GoogleResponse } from "@/views/login/model/firebase/get-google-response";
import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { getSession } from "@/shared/auth/get-auth.action";
import Sidebar from "./sidebar/sidebar";
import { signOutUser } from "@/features/auth/logout/model/sign-out.action";


export const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const { logout } = GoogleResponse();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    if (!logoutLoading) {
      try {
        setLogoutLoading(true);
        await logout();
        await signOutUser();
      } catch (err) {
        console.log("error in handleLogout : ", err);
        callSnackbar(t("login.error"), "error");
      } finally {
        setLogoutLoading(false);
      }
    }
  };
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const setUser = async () => {
    const user = await getSession();
    setUserData(user?.user);
  };
  useEffect(() => {
    if (!userData) setUser();
  }, []);
  const SidebarComponent = (
    <Sidebar>
      <Sidebar.heading
        title={t("appTitle")}
        imageURL="/icons/logo.svg"
        identifier="sidebar-heading"
      />
      <Sidebar.list sx={{ pb: 0 }} data-test-id="sidebar-list">
        <Sidebar.link
          googleFontIcon={"user_attributes"}
          text={t("sidebar.reinstatementResponsibles")}
          to="reinstatement-responsibles"
          identifier="sidebar-reinstatement-responsibles"
        />
      </Sidebar.list>
    </Sidebar>
  );

  return (
    <Stack height={"100%"}>
      <AppbarComponent
        AppName={t("appTitle")}
        ProfileMenuProps={{
          userEmail: userData?.email || "",
        }}
        username={userData?.name || ""}
        withoutExpandIcon={isMobile}
        handleLogout={handleLogout}
        logoutLoading={logoutLoading}
      />
      <Box className="sidebarLayout" data-test-id="layout-sidebar">
        <Sidebar.SidebarWrapper Sidebar={SidebarComponent} variant="persist">
          {children}
        </Sidebar.SidebarWrapper>
      </Box>
    </Stack>
  );
};
