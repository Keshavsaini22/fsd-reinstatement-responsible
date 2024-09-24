import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { registerReinstatementResponsibleType } from "./types";
import { NewReinstatementResponsibleDetailsFormSchema } from "./register-reinstatement-responsible-schema";
import { registerReinstatementResponsibleService } from "../api/register-reinstatement-responsible.service";


export const registerReinstatementResponsibleAction = createAsyncThunk(
  registerReinstatementResponsibleType,
  async (data: NewReinstatementResponsibleDetailsFormSchema) => {
    try {
      const response = await registerReinstatementResponsibleService(data);
      return response.data as ReinstatementResponsible;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
