"use client";
import { ElementType } from "react";
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styles from "./navlinkStyles.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSidebarContext } from "@/shared/context";

interface NavlinkPops extends ListItemButtonProps {
  to: string;
  Icon?: ElementType;
  googleFontIcon?: string;
  text: string;
  level?: number;
  identifier: string;
}

export const Navlink = (props: NavlinkPops) => {
  const { to, Icon, text, level = 0, googleFontIcon, ...restProps } = props;
  const pathname = usePathname();
  const isActive = (pathname.split("/")[1] || "/") === to;
  const { sidebarToggle, closeSidebar, sidebarVariant } = useSidebarContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavClick = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
    <Link
      data-test-id={`link-${props.identifier}`}
      className={clsx(
        styles.navlink,
        isActive && styles.active,
        sidebarToggle || sidebarVariant === "close" ? styles.opened : styles.closed
      )}
      href={to}
      onClick={handleNavClick}
    >
      <ListItemButton
        data-test-id={`linkbtn-${props.identifier}`}
        selected={isActive}
        className={styles.button}
        sx={{ paddingLeft: `${level * 20 + 16}px !important` }}
        {...restProps}
      >
        {Icon && (
          <ListItemIcon data-test-id={`link-icon-${props.identifier}`} className={styles.navlinkitem}>
            <Icon color="secondary" className={styles["navlink-icon"]} />
          </ListItemIcon>
        )}
        {googleFontIcon ? (
          <span
            data-test-id={`link-googleicon-${props.identifier}`}
            style={{ fontWeight: 600 }}
            className={`material-symbols-outlined ${styles["navlink-icon"]}`}
          >
            {googleFontIcon}
          </span>
        ) : null}
        <ListItemText
          data-test-id={`linktxt-${props.identifier}`}
          primary={text}
          disableTypography
          sx={{ fontSize: "16px", overflow: "hidden", maxHeight: "48px" }}
          className={styles.text}
        />
      </ListItemButton>
    </Link>
  );
};
