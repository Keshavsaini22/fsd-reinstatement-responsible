import { createReinstatementResponsibleAction } from "@/features/reinstatement-responsible/create-reinstatement-responsible/model/create-reinstatement-responsible.action";
import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/reinstatement-responsible";

export const createReinstatementResponsibleReducers = (builder: any) => {
  builder
    .addCase(createReinstatementResponsibleAction.fulfilled, (state: InitialState, action: any) => {
      callSnackbar("reinstatementResponsiblesForm.success.create", "success");
      state.responsibles.unshift(action.payload);
      state.loading = { ...state.loading, create: false };
    })
    .addCase(createReinstatementResponsibleAction.rejected, (state: InitialState, action: any) => {
      state.loading = { ...state.loading, create: false };
      callSnackbar(
        action.error.message?.endsWith("409")
          ? `reinstatementResponsiblesForm.error.${action.error.message}`
          : `reinstatementResponsiblesForm.error.create`,
        "error"
      );
    })
    .addCase(createReinstatementResponsibleAction.pending, (state: InitialState) => {
      state.loading = { ...state.loading, create: true };
    });
};
