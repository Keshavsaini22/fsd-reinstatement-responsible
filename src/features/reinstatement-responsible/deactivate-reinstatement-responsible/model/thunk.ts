import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { deactivateReinstatementResponsibleType } from "./types";
import { deactivateReinstatementResponsibleService } from "../api/deactivate-reinstatement-responsible.service";

export const deactivateReinstatementResponsibleThunk = createAsyncThunk(
    deactivateReinstatementResponsibleType,
  async (body: { id: string; data: { is_active: boolean } }) => {
    try {
      const response = await deactivateReinstatementResponsibleService(body);
      return response.data as ReinstatementResponsible;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
