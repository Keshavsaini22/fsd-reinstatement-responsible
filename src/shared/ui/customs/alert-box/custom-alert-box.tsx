import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import CustomButton from "../button";

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

const CustomAlertBox = ({
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
  return (
    <Dialog data-test-id={`dialogBox-${identifier}`} open={open} sx={{ "& .MuiPaper-root": { width: "416px" } }}>
      <DialogTitle data-test-id={`dialogBox-title-${identifier}`} variant="titleMd" fontWeight={"medium"}>
        {t(title)}
      </DialogTitle>
      <DialogContent
        data-test-id={`dialogBox-content-${identifier}`}
        className="dialog-content"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button
            data-test-id={`dialogBox-cancelaction-${identifier}`}
            sx={{
              p: "0px 8px",
              color: saveButtonLoading ? "secondary.400" : "secondary.800",
            }}
            onClick={onCancel}
          >
            {t(cancelButtonText ?? "dialogBox.cancel")}
          </Button>
        )}
        {onSave && (
          <CustomButton
            identifier={`dialogBox-submit-${identifier}`}
            loading={saveButtonLoading || false}
            sx={{ p: "0px 8px", ml: 0 }}
            color="primary"
            onClick={onSave}
          >
            {t(saveButtonText ?? "dialogBox.save")}
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlertBox;
