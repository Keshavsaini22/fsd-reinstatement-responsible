import { Box, CircularProgress, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./index.css";
import { useTranslations } from "next-intl";
import { colors } from "@/shared/theme/theme";
export const LogoutButton = ({ loading }: { loading: boolean }) => {
  const t = useTranslations();
  return (
    <Box
      className="logout-button"
      component="div"
      sx={{ color: colors.neutral[800], gap: "30px" }}
      data-test-id="button-sidebar-logout"
    >
      {loading ? (
        <CircularProgress size={20} color="primary" data-test-id="loading-sidebar-logout" />
      ) : (
        <ExitToAppIcon sx={{ color: loading ? "secondary.400" : "secondary.800" }} fontSize="small" />
      )}
      <Typography
        data-test-id="text-sidebar-logout"
        component="span"
        fontSize={15}
        color={loading ? "secondary.400" : "secondary.800"}
        sx={{ fontSize: 16 }}
      >
        {t("sidebar.logout")}
      </Typography>
    </Box>
  );
};
