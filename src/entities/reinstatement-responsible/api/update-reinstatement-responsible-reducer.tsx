import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/resinstatement-responsibles";
import { updateReinstatementResponsibleAction } from "@/features/reinstatement-responsible/update-reinstatement-responsible/model/update-reinstatement-responsible.action";

export const updateReinstatementResponsibleReducers = (builder: any) => {
  builder
    .addCase(updateReinstatementResponsibleAction.rejected, (state: InitialState) => {
      callSnackbar(`reinstatementResponsiblesForm.error.update`, "error");
      state.loading.create = false;
    })
    .addCase(updateReinstatementResponsibleAction.fulfilled, (state: InitialState, action: any) => {
      callSnackbar("reinstatementResponsiblesForm.success.update", "success");
      state.responsibles = state.responsibles.map((responsible) => {
        if (responsible.uuid === action.payload.uuid) {
          responsible = action.payload;
        }
        return responsible;
      });
      state.loading.create = false;
    })
    .addCase(updateReinstatementResponsibleAction.pending, (state: InitialState) => {
      state.loading.create = true;
    });
};
