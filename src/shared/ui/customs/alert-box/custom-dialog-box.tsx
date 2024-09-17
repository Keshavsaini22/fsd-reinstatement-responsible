import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MoreVert } from "@mui/icons-material";
import theme from "@/shared/theme/theme";
type Props = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onCancel?: () => void;
  openDrawer?: () => void;
  identifier: string;
};

const CustomDialogBox = ({ children, title, onCancel, open, openDrawer, identifier }: Props) => {
  const t = useTranslations();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Dialog
        data-test-id={`customdialog-${identifier}`}
        open={open}
        fullScreen={isMobile}
        sx={{ "& .MuiPaper-root": { width: { sm: "450px" }, padding: 0 } }}
      >
        <DialogTitle data-test-id={`customdialogtitle-${identifier}`}>
          {isMobile ? (
            <Stack
              data-test-id={`customdialog-mobile-${identifier}`}
              sx={{ height: "56px", px: 1.5 }}
              bgcolor={"var(--primary)"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1.25}>
                <IconButton
                  data-test-id={`customdialog-mobile-canclebtn-${identifier}`}
                  aria-label="close"
                  onClick={() => onCancel && onCancel()}
                  className="p-1"
                >
                  <CloseIcon
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "var(--white)",
                    }}
                  />
                </IconButton>
                <Typography
                  data-test-id={`customdialog-mobile-title-${identifier}`}
                  variant="titleSm"
                  sx={{ color: "var(--white)" }}
                  fontWeight={"medium"}
                >
                  {t(title)}
                </Typography>
              </Stack>
              {openDrawer && (
                <IconButton
                  data-test-id={`customdialog-mobile-moreoption-${identifier}`}
                  aria-label="close"
                  onClick={() => openDrawer()}
                  className="p-1"
                >
                  <MoreVert
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "var(--white)",
                    }}
                  />
                </IconButton>
              )}
            </Stack>
          ) : (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ px: 3, pt: 3 }}>
              <Typography data-test-id={`customdialog-title-${identifier}`} variant="titleMd" fontWeight={"medium"}>
                {t(title)}
              </Typography>
              <IconButton
                data-test-id={`customdialog-canclebtn-${identifier}`}
                aria-label="close"
                sx={{ p: 0 }}
                onClick={() => onCancel && onCancel()}
              >
                <CloseIcon sx={{ width: "20px", height: "20px" }} color="secondary" />
              </IconButton>
            </Stack>
          )}
        </DialogTitle>

        <DialogContent
          data-test-id={`customdialog-children-${identifier}`}
          sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialogBox;
