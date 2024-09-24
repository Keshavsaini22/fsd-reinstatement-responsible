import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { activateReinstatementResponsibleService } from "../api/activate-reinstatement-responsible.service";
import { activateReinstatementResponsibleType } from "./types";

export const activateReinstatementResponsibleThunk = createAsyncThunk(
    activateReinstatementResponsibleType,
  async (body: { id: string; data: { is_active: boolean } }) => {
    try {
      const response = await activateReinstatementResponsibleService(body);
      return response.data as ReinstatementResponsible;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
