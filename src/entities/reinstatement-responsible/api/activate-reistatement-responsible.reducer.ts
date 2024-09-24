import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/reinstatement-responsible";
import { activateReinstatementResponsibleThunk } from "@/features/reinstatement-responsible/activate-reinstatement-responsible/model/thunk";

export const activateReinstatementResponsibleReducers = (builder: any) => {
    builder
        .addCase(activateReinstatementResponsibleThunk.rejected, (state: InitialState, action: any) => {
            callSnackbar(`reinstatementResponsiblesForm.error.changeStatus`, "error");
            state.loading = { ...state.loading, switch: state.loading.switch.filter(id => id !== action.meta.arg.id) };
        })
        .addCase(activateReinstatementResponsibleThunk.fulfilled, (state: InitialState, action: any) => {
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
        .addCase(activateReinstatementResponsibleThunk.pending, (state: InitialState, action: any) => {
            state.loading = { ...state.loading, switch: [...state.loading.switch, action.meta.arg.id] };
        });
};
