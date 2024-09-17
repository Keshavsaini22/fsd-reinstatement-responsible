import React, { ReactNode, useEffect } from "react";
import { Box, Drawer, List, Stack, StackProps, styled, Typography } from "@mui/material";
import Image from "next/image";
import "./sidebar-styles.scss";
import { SidebarVariant, useSidebarContext } from "@/shared/context";
import { Navlink } from "../navlink";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface ISidebarWrapper {
  children: ReactNode;
  Sidebar: any;
  variant?: SidebarVariant;
}

const SidebarWrapper = ({ Sidebar, children, variant = "persist" }: ISidebarWrapper) => {
  const { sidebarToggle, sidebarVariant, setSidebarVariant } = useSidebarContext();

  useEffect(() => {
    if (variant !== sidebarVariant) {
      setSidebarVariant(variant);
    }
  }, [variant, sidebarVariant]);

  return (
    <>
      {Sidebar}
      {
        <Stack
          className={`contentContainer ${sidebarToggle ? "opened" : "closed"}`}
          data-test-id="layout-sidebar-wrapper"
        >
          {children}
        </Stack>
      }
    </>
  );
};

interface ISidebar {
  children: ReactNode;
}

const Sidebar = ({ children }: ISidebar) => {
  const { sidebarToggle, closeSidebar } = useSidebarContext();
  return (
    <>
      <Box
        className={`sidebar ${sidebarToggle ? "opened" : "closed"}`}
        bgcolor={"white"}
        data-test-id="layout-sidebar-container"
      >
        {children}
      </Box>

      <Drawer
        variant="temporary"
        data-test-id="layout-sidebar-drawer"
        open={sidebarToggle}
        onClose={closeSidebar}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          zIndex: "5 !important",
        }}
        PaperProps={{
          sx: {
            width: "256px",
          },
        }}
      >
        <DrawerHeader />
        {children}
      </Drawer>
    </>
  );
};

interface ISidebarHeading extends StackProps {
  imageURL?: string;
  title?: string;
  identifier: string;
}

const SidebarHeading = ({ imageURL, title, identifier, ...restProps }: ISidebarHeading) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      padding="12px 16px"
      data-test-id={`stack-${identifier}`}
      sx={{ display: { xs: "flex", sm: "none" } }}
      {...restProps}
    >
      {imageURL && (
        <Box className="logo-box" data-test-id={`logo-${identifier}`}>
          <Image src={imageURL} alt="logo" width={20} height={20} />
        </Box>
      )}
      {title && (
        <Typography variant="titleSm" fontWeight="fontWeightMedium" data-test-id={`title-${identifier}`}>
          {title}
        </Typography>
      )}
    </Stack>
  );
};

Sidebar.link = Navlink;
Sidebar.heading = SidebarHeading;
Sidebar.list = List;
Sidebar.SidebarWrapper = SidebarWrapper;

export default Sidebar;
