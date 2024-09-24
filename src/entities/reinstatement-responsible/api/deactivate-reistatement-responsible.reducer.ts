import { deactivateReinstatementResponsibleThunk } from "@/features/reinstatement-responsible/deactivate-reinstatement-responsible/model/thunk";
import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/reinstatement-responsible";

export const deactivateReinstatementResponsibleReducers = (builder: any) => {
    builder
        .addCase(deactivateReinstatementResponsibleThunk.rejected, (state: InitialState, action: any) => {
            callSnackbar(`reinstatementResponsiblesForm.error.changeStatus`, "error");
            state.loading = { ...state.loading, switch: state.loading.switch.filter(id => id !== action.meta.arg.id) };
        })
        .addCase(deactivateReinstatementResponsibleThunk.fulfilled, (state: InitialState, action: any) => {
            state.responsibles = state.responsibles.map(responsible => {
                if (responsible.uuid === action.payload.uuid) {
                    responsible.is_active = action.payload.is_active;
                }
                return responsible;
            });
            if (action.payload.is_active) callSnackbar("reinstatementResponsiblesForm.success.changeStatusActive", "success");
            else callSnackbar("reinstatementResponsiblesForm.success.changeStatusDeactive", "success");
            state.loading = { ...state.loading, switch: state.loading.switch.filter(id => id !== action.payload.uuid) };
        })
        .addCase(deactivateReinstatementResponsibleThunk.pending, (state: InitialState, action: any) => {
            state.loading = { ...state.loading, switch: [...state.loading.switch, action.meta.arg.id] };
        });
};
