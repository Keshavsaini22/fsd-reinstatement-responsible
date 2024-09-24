import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/reinstatement-responsible";
import { registerReinstatementResponsibleAction } from "@/features/reinstatement-responsible/register-reinstatement-responsible/model/thunk";

export const registerReinstatementResponsibleReducers = (builder: any) => {
  builder
    .addCase(registerReinstatementResponsibleAction.fulfilled, (state: InitialState, action: any) => {
      callSnackbar("reinstatementResponsiblesForm.success.create", "success");
      state.responsibles.unshift(action.payload);
      state.loading = { ...state.loading, create: false };
    })
    .addCase(registerReinstatementResponsibleAction.rejected, (state: InitialState, action: any) => {
      state.loading = { ...state.loading, create: false };
      callSnackbar(
        action.error.message?.endsWith("409")
          ? `reinstatementResponsiblesForm.error.${action.error.message}`
          : `reinstatementResponsiblesForm.error.create`,
        "error"
      );
    })
    .addCase(registerReinstatementResponsibleAction.pending, (state: InitialState) => {
      state.loading = { ...state.loading, create: true };
    });
};
