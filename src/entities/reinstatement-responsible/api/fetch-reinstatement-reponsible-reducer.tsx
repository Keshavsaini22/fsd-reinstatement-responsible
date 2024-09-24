import { callSnackbar } from "@/shared/ui/snackbar/call-snackbar";
import { InitialState } from "../model/resinstatement-responsibles";
import { fetchReinstatementResponsiblesAction } from "@/features/reinstatement-responsible/search-and-filter-reinstatement-responsible/api/get-reinstatement-responsibles.action";

export const fetchReinstatementResponsiblesReducers = (builder: any) => {
  builder
    .addCase(fetchReinstatementResponsiblesAction.fulfilled, (state: InitialState, action: any) => {
      state.loading = { ...state.loading, fetch: false };
      if (action.payload.resp) {
        if (action.payload.isMobile) {
          state.responsibles = [...state.responsibles, ...action.payload.resp.data];
          state.total = action.payload.resp.total;
          state.current_page = 1;
          state.per_page = 10;
          return;
        }
        state.responsibles = action.payload.resp.data;
        state.total = action.payload.resp.total;
        state.current_page = action.payload.resp.current_page;
        state.per_page = action.payload.resp.per_page;
      } else {
        state.responsibles = [];
        state.total = 0;
        state.current_page = 0;
        state.per_page = 0;
      }
    })
    .addCase(fetchReinstatementResponsiblesAction.rejected, (state: InitialState) => {
      state.loading = { ...state.loading, fetch: false };
      callSnackbar("reinstatementResponsiblesForm.error.fetch", "error");
    })
    .addCase(fetchReinstatementResponsiblesAction.pending, (state: InitialState) => {
      state.loading = { ...state.loading, fetch: true };
    });
};
