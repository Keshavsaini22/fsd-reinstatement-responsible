import { removeReinstatementResponsibleAction } from "@/features/reinstatement-responsible/remove-reinstatement-responsible/model/thunk";
import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/reinstatement-responsible";

export const removeReinstatementResponsibleReducers = (builder: any) => {
  builder
    .addCase(removeReinstatementResponsibleAction.pending, (state: InitialState, action: any) => {
      state.loading.delete = [...state.loading.delete, action.meta.arg];
    })
    .addCase(removeReinstatementResponsibleAction.rejected, (state: InitialState, action: any) => {
      callSnackbar(`reinstatementResponsiblesForm.error.delete`, "error");
      state.loading.delete = state.loading.delete.filter((id) => id !== action.meta.arg);
    })
    .addCase(removeReinstatementResponsibleAction.fulfilled, (state: InitialState, action: any) => {
      const data = state.responsibles.find((responsible) => responsible.uuid === action.payload);
      state.responsibles = state.responsibles.filter((responsible) => responsible.uuid !== action.payload);
      callSnackbar("reinstatementResponsiblesForm.success.delete", "success", `${data?.name} ${data?.last_name}`);
      state.loading.delete = state.loading.delete.filter((id) => id !== action.payload);
    });
};
