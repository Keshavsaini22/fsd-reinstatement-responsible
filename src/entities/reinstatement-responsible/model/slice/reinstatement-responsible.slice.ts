import { createSlice } from "@reduxjs/toolkit";

const reinstatementResponsibleSlice=createSlice({
    name: "reinstatement-responsible",
    initialState: {},
    reducers: {
        clearReinstatementResponsible(state) {
            // state.responsibles = [];
            // state.total = 0;
          },
    }
})

export const { clearReinstatementResponsible } = reinstatementResponsibleSlice.actions;
export default reinstatementResponsibleSlice.reducer