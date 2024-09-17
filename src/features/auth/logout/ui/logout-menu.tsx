import { Menu, MenuItem, Avatar, Typography, Box, Divider, Tooltip } from "@mui/material";
import { LogoutButton } from "./logout-button";
import { useEffect, useState } from "react";
import { colors } from "@/shared/theme/theme";

interface IProps {
  isMenuOpen: boolean;
  userName: string;
  handleLogout: () => void;
  handleOnMenuClose: () => void;
  ProfileMenuProps?: any;
  logoutLoading: boolean;
}
export const LogOutMenu = ({
  isMenuOpen,
  userName,
  handleLogout,
  handleOnMenuClose,
  ProfileMenuProps,
  logoutLoading,
}: IProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  useEffect(() => {
    setAnchorEl(document.getElementsByClassName("profile-menu")[0]);
  }, []);
  const shouldShowTooltip = (text: string) => {
    if (typeof document === "undefined") return false;
    const element = document.createElement("div");
    element.style.overflow = "hidden";
    element.style.whiteSpace = "nowrap";
    element.style.textOverflow = "ellipsis";
    element.style.width = "175px";
    element.innerHTML = text;
    document.body.appendChild(element);
    const isOverflowing = element.scrollWidth > element.clientWidth;
    document.body.removeChild(element);
    return isOverflowing;
  };
  return (
    <Menu
      MenuListProps={{
        sx: {
          paddingBottom: "0px",
        },
      }}
      data-test-id="menu-logout-profile"
      slotProps={{
        paper: {
          sx: {
            minWidth: "200px",
          },
        },
      }}
      sx={{ width: "240px" }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleOnMenuClose}
    >
      {!ProfileMenuProps?.withAvatar ? (
        <MenuItem data-test-id="menu-item-logout-without-avatar" className="profile-menu-items-without-avatar">
          <Box className="profile-menu-items-text">
            {shouldShowTooltip(userName) ? (
              <Tooltip title={userName} data-test-id="tooltip-logout-name">
                <Typography
                  component="p"
                  data-test-id="text-logout-name-tooltip"
                  className="text-nowrap"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "175px",
                  }}
                >
                  {userName}
                </Typography>
              </Tooltip>
            ) : (
              <Typography
                component="p"
                data-test-id="text-logout-name"
                className="text-nowrap"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "175px",
                }}
              >
                {userName}
              </Typography>
            )}
            {shouldShowTooltip(ProfileMenuProps?.userEmail) ? (
              <Tooltip title={ProfileMenuProps?.userEmail} data-test-id="tooltip-logout-email">
                <Typography
                  component="p"
                  data-test-id="text-logout-email-tooltip"
                  className="text-nowrap"
                  sx={{
                    color: colors.neutral[600],
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "175px",
                  }}
                >
                  {ProfileMenuProps?.userEmail}
                </Typography>
              </Tooltip>
            ) : (
              <Typography
                component="p"
                data-test-id="text-logout-email"
                className="text-nowrap"
                sx={{
                  color: colors.neutral[600],
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "175px",
                }}
              >
                {ProfileMenuProps?.userEmail}
              </Typography>
            )}
          </Box>
        </MenuItem>
      ) : (
        <MenuItem className="profile-menu-items" data-test-id="menu-item-logout-with-avatar">
          <Avatar sx={{ width: "32px", height: "32px" }} data-test-id="avatar-logout" />
          <Typography
            component="p"
            data-test-id="text-logout-avatar-name"
            className="text-nowrap"
            sx={{
              fontSize: ProfileMenuProps?.withAvatar ? "normal" : "14px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "175px",
            }}
          >
            {userName}
          </Typography>
        </MenuItem>
      )}
      {ProfileMenuProps?.menuItemsList ? (
        <>
          <Divider sx={{ marginTop: "0px" }} />
          {ProfileMenuProps?.menuItemsList.map((item: any) => (
            <MenuItem
              onClick={item.action}
              sx={{ gap: "30px" }}
              className="profile-menu-lists"
              data-test-id={`menu-item-logout`}
            >
              {item.Icon}
              <Typography
                component="p"
                sx={{ fontSize: "16px", color: colors.neutral[800] }}
                data-test-id={`text-logout-${item.label}`}
              >
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </>
      ) : null}
      <Divider className="divider" />
      <MenuItem
        disabled={logoutLoading}
        onClick={handleLogout}
        className="logout-menu-item"
        data-test-id="menu-item-logout-btn"
      >
        <LogoutButton loading={logoutLoading} />
      </MenuItem>
    </Menu>
  );
};
