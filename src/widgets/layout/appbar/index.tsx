import { useState } from "react";
import { AccountCircle, Menu as MenuIcon, ExpandMore, ExpandLess } from "@mui/icons-material";
import { Toolbar, IconButton, Typography, Box, MenuListProps, Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import "./style.scss";
import { useSidebarContext } from "@/shared/context";
import { LogOutMenu } from "@/features/auth/logout/ui/logout-menu";

/**
 * Properties for the AppBarComponent.
 *
 * @typedef {Object} Props
 * @property {string} [username] - Username to display.
 * @property {string} [AppName] - Name of the application to display.
 * @property {Function} [handleLogout] - Function to handle logout.
 * @property {number|string} [ActionIconsGap] - Gap between action icons.
 * @property {SxProps<Theme>} [AppsIconProps.IconsProps] - Properties for the apps icon itself.
 * @property {boolean} [withoutHamburger] - Determines if the hamburger icon should be hidden.
 * @property {boolean} [withoutExpandIcon] - Determines if the expand icon should be hidden.
 * @property {Object} [ProfileMenuProps] - Properties for the profile menu.
 * @property {boolean} [ProfileMenuProps.withAvatar] - Determines if the avatar should be displayed in the profile menu.
 * @property {string} [ProfileMenuProps.userEmail] - User email to display in the profile menu.
 * @property {Array} [ProfileMenuProps.menuItemsList] - List of menu items in the profile menu.
 */

/**
 * Properties for the styled AppBar component.
 *
 * @typedef {Object} AppBarProps
 * @extends MuiAppBarProps
 * @property {boolean} [open] - Determines if the AppBar is open.
 */

interface Props {
  username?: string;
  AppName?: string;
  handleLogout?: () => void;
  ActionIconsGap?: number | string;
  ProfileMenuProps?: {
    withAvatar?: boolean;
    userEmail?: string;
    menuItemsList?: MenuListProps[];
  };
  withoutHamburger?: boolean;
  withoutExpandIcon?: boolean;
  logoutLoading: boolean;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const drawerWidth = 256;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AppbarComponent = ({
  withoutExpandIcon,
  withoutHamburger,
  username,
  AppName,
  handleLogout,
  ActionIconsGap,
  ProfileMenuProps,
  logoutLoading,
}: Props) => {
  const { toggleSidebar } = useSidebarContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogoutFunction = handleLogout || (() => {});
  const handleOnMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleOnMenuOpen = () => {
    setIsMenuOpen(true);
  };

  return (
    <AppBar className="app-bar" elevation={0} position="fixed" sx={{ height: { xs: "54px", sm: "64px" }, zIndex: 10 }}>
      <Toolbar className="tool-bar" data-test-id="toolbar-logout">
        {!withoutHamburger ? (
          <IconButton
            data-test-id="appbar-menu-btn"
            color="inherit"
            onClick={toggleSidebar}
            edge="start"
            className="menu-icon-btn"
            sx={{ marginRight: 2.5 }}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        ) : null}
        <Box className="title-container">
          <Typography
            data-test-id="appbar-app-title"
            className="title"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {AppName}
          </Typography>
          <Typography className="subtitle" noWrap component="div" flexGrow={1}></Typography>
          <Box className="appbar-icons-wrapper" sx={{ gap: ActionIconsGap }}>
            <IconButton
              data-test-id="appbar-account-btn"
              size="small"
              color="inherit"
              onClick={handleOnMenuOpen}
              className="profile-menu"
              sx={{ gap: "8px", display: "flex" }}
            >
              <AccountCircle />
              {withoutExpandIcon ? null : (
                <Stack direction={"row"}>
                  <Typography
                    component="p"
                    fontSize={15}
                    color="inherit"
                    className="username-tag-wrapper"
                    data-test-id="appbar-account-username"
                  >
                    {username}
                    <Typography component="span" data-test-id="appbar-expand-icon">
                      {!isMenuOpen ? <ExpandMore /> : <ExpandLess />}
                    </Typography>
                  </Typography>
                </Stack>
              )}
            </IconButton>
          </Box>
        </Box>
        <LogOutMenu
          isMenuOpen={isMenuOpen}
          userName={username as string}
          handleLogout={handleLogoutFunction}
          handleOnMenuClose={handleOnMenuClose}
          ProfileMenuProps={ProfileMenuProps}
          logoutLoading={logoutLoading}
        />
      </Toolbar>
    </AppBar>
  );
};
