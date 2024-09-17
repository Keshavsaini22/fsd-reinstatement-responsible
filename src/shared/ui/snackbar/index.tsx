"use client";
import { SnackbarKey, SnackbarProvider as SnackBarProvider, VariantType, closeSnackbar } from "notistack";
import { Close } from "@mui/icons-material";

export interface configOptions {
  /**Used to easily display default variant of snackbars in case no variant is provided to callSnack function.
   */
  defaultVariant?: VariantType;
  /**Hides iconVariant if set to true.
   * @default false
   */
  hideIconVariant?: boolean | undefined;
  /** The number of milliseconds to wait before automatically calling the onClose function.
   *  By default snackbars get closed after 5000 milliseconds.
   *  Set autoHideDuration to 'null' if you don't want snackbars to automatically close.
   *  Alternatively pass persist: true in the options parameter of enqueueSnackbar.
   * @default 5000
   */
  autoHideDuration?: number | null | undefined;
  /**Callback used for getting action(s).
   * actions are mostly buttons displayed in Snackbar.
   * @param key — key of a snackbar
   */
  action?: React.ReactNode;
  /** Maximum snackbars that can be stacked on top of one another.
   * @default 3
   */
  maxSnack?: number | undefined;
  /** To show delete icon or not */
  showDeleteAction?: boolean | undefined;
}
export const SnackbarProvider = ({
  children,
  configOptions,
}: {
  children: React.ReactNode;
  configOptions: configOptions;
}) => {
  const { defaultVariant, showDeleteAction, action, ...others } = configOptions;
  const deleteAction = (key: SnackbarKey) => (
    <Close
      data-test-id="btn-close-snackbar"
      fontSize="small"
      sx={{ alignSelf: "center", height: "100%" }}
      onClick={() => closeSnackbar(key)}
    />
  );
  return (
    <SnackBarProvider
      variant={defaultVariant}
      {...others}
      action={key => (
        <>
          {action}
          {showDeleteAction && deleteAction(key)}
        </>
      )}
    >
      {children}
    </SnackBarProvider>
  );
};
