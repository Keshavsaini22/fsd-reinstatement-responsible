import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/resinstatement-responsibles";
import { deleteReinstatementResponsibleAction } from "@/features/reinstatement-responsible/delete-reinstatement-responsible/model/delete-reinstatement-responsible.action";

export const deleteReinstatementResponsibleReducers = (builder: any) => {
  builder
    .addCase(deleteReinstatementResponsibleAction.pending, (state: InitialState, action: any) => {
      state.loading.delete = [...state.loading.delete, action.meta.arg];
    })
    .addCase(deleteReinstatementResponsibleAction.rejected, (state: InitialState, action: any) => {
      callSnackbar(`reinstatementResponsiblesForm.error.delete`, "error");
      state.loading.delete = state.loading.delete.filter((id) => id !== action.meta.arg);
    })
    .addCase(deleteReinstatementResponsibleAction.fulfilled, (state: InitialState, action: any) => {
      const data = state.responsibles.find((responsible) => responsible.uuid === action.payload);
      state.responsibles = state.responsibles.filter((responsible) => responsible.uuid !== action.payload);
      callSnackbar("reinstatementResponsiblesForm.success.delete", "success", `${data?.name} ${data?.last_name}`);
      state.loading.delete = state.loading.delete.filter((id) => id !== action.payload);
    });
};
