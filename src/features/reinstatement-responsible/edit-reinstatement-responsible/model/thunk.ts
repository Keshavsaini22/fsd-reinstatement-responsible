import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { updateReinstatementResponsibleService } from "../api/edit-reinstatement-responsible.service";
import { EditReinstatementResponsibleDetailsFormSchema } from "./edit-reinstatement-responsible-schema";
import { updateReinstatementResponsibleType } from "./types";

export const updateReinstatementResponsibleAction = createAsyncThunk(
  updateReinstatementResponsibleType,
  async (body: {
    id: string;
    data: EditReinstatementResponsibleDetailsFormSchema;
  }) => {
    try {
      const response = await updateReinstatementResponsibleService(body);
      return response.data as ReinstatementResponsible;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
