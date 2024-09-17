import { enqueueSnackbar, VariantType } from "notistack";
import Message from "./message";

const getSnackbarColorList = (variant: VariantType) => {
  switch (variant) {
    case "success":
      return "#43A047";
    case "info":
      return "#E8F0FE";
    case "error":
      return "#E53935";
    case "warning":
      return "#F9A825";
    default:
      return `${variant}`;
  }
};

export const callSnackbar = (message: string, variant: VariantType, staticMessage?: string) => {
  enqueueSnackbar(<Message message={message} staticMessage={staticMessage} />, {
    style: { backgroundColor: getSnackbarColorList(variant) },
  });
};
