import { Box, Button, Dialog, IconButton, Modal, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import "./style.css";
import { Close } from "@mui/icons-material";
import theme from "@/shared/theme/theme";
import CustomButton from "../customs/button";

type Props = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  saveButtonLoading?: boolean;
  identifier: string;
};

const CustomModal = ({
  children,
  title,
  onCancel,
  onSave,
  cancelButtonText,
  saveButtonText,
  open,
  saveButtonLoading,
  identifier,
}: Props) => {
  const t = useTranslations();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return !isMobile ? (
    <Modal data-test-id={`modal-${identifier}`} open={open}>
      <Box className="main" data-test-id={`modal-main-${identifier}`} maxHeight={"92% !important"}>
        <Box sx={{ px: 3, pb: 1, pt: 2 }} data-test-id={`modal-titlebox-${identifier}`}>
          <Typography variant="titleMd" fontWeight={"medium"} data-test-id={`modal-title-${identifier}`}>
            {t(title)}
          </Typography>
        </Box>
        <Box sx={{ px: 3, py: 0 }} data-test-id={`modal-title-${identifier}`}>
          {children}
        </Box>
        <Stack
          sx={{ px: 3, py: 2 }}
          justifyContent={"right"}
          direction={"row"}
          data-test-id={`modal-actions-${identifier}`}
        >
          {onCancel && (
            <Button
              data-test-id={`modal-cancelaction-${identifier}`}
              sx={{
                color: saveButtonLoading ? "secondary.400" : "secondary.800",
              }}
              onClick={onCancel}
            >
              {t(cancelButtonText ?? "dialogBox.cancel")}
            </Button>
          )}
          {onSave && (
            <CustomButton
              identifier={`modal-${identifier}-submit`}
              loading={saveButtonLoading}
              color="primary"
              onClick={onSave}
            >
              {t(saveButtonText ?? "dialogBox.save")}
            </CustomButton>
          )}
        </Stack>
      </Box>
    </Modal>
  ) : (
    <Dialog
      data-test-id={`dialog-mobile-${identifier}`}
      sx={{ "& .MuiDialog-paper": { p: 0 } }}
      open={open}
      fullScreen
      fullWidth
    >
      <Stack
        data-test-id={`dialog-mobile-nav-${identifier}`}
        height={56}
        bgcolor={"var(--primary)"}
        direction={"row"}
        sx={{ px: "12px" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          data-test-id={`dialog-mobile-navcontent-${identifier}`}
          height={56}
          direction={"row"}
          alignItems={"center"}
        >
          {onCancel && (
            <IconButton
              data-test-id={`dialog--mobile-cancelbtn-${identifier}`}
              sx={{ height: "100%", p: 1.5, mr: 1.25 }}
              onClick={onCancel}
            >
              <Close className="c-white" />
            </IconButton>
          )}
          <Typography
            data-test-id={`dialog-mobile-title-${identifier}`}
            variant="titleSm"
            fontWeight={"medium"}
            color={"white"}
          >
            {t(title)}
          </Typography>
        </Stack>
        {onSave && (
          <CustomButton
            identifier={`dialog-mobile-savebtn-${identifier}`}
            loadingprops={{ sx: { color: "var(--white)" } }}
            className="c-white"
            loading={saveButtonLoading}
            variant="text"
            onClick={onSave}
          >
            {t(saveButtonText ?? "dialogBox.save")}
          </CustomButton>
        )}
      </Stack>
      <Box data-test-id={`dialog-mobile-children-${identifier}`} sx={{ px: { xs: 2, sm: 3 }, py: 0 }}>
        {children}
      </Box>
    </Dialog>
  );
};

export default CustomModal;
