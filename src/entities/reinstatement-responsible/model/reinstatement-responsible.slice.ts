import { createSlice } from "@reduxjs/toolkit";
import { activateReinstatementResponsibleReducers } from "../api/activate-reistatement-responsible.reducer";
import { deactivateReinstatementResponsibleReducers } from "../api/deactivate-reistatement-responsible.reducer";
import { listReinstatementResponsiblesReducers } from "../api/list-reinstatement-reponsible.reducer";
import { registerReinstatementResponsibleReducers } from "../api/register-reinstatement-responsible.reducer";
import { removeReinstatementResponsibleReducers } from "../api/remove-reinstatement-responsible.reducer";
import { updateReinstatementResponsibleReducers } from "../api/update-reinstatement-responsible.reducer";
import { InitialState } from "./reinstatement-responsible";

const initialState: InitialState = {
    total: 0,
    responsibles: [],
    current_page: 0,
    per_page: 0,
    loading: { create: false, fetch: false, switch: [], delete: [] },
  };

const reinstatementResponsibleSlice=createSlice({
    name: "reinstatementResponsibles",
    initialState,
    reducers: {
        clearReinstatementResponsible(state) {
            state.responsibles = [];
            state.total = 0;
          },
    },
    extraReducers: (builder)=>{
        registerReinstatementResponsibleReducers(builder);
        listReinstatementResponsiblesReducers(builder);
        updateReinstatementResponsibleReducers(builder);
        removeReinstatementResponsibleReducers(builder);
        deactivateReinstatementResponsibleReducers(builder);
        activateReinstatementResponsibleReducers(builder);
    },
})

export const { clearReinstatementResponsible } = reinstatementResponsibleSlice.actions;
export default reinstatementResponsibleSlice.reducer