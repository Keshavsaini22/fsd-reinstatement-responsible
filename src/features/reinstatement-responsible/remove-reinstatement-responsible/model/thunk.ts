import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { removeReinstatementResponsibleType } from "./types";
import { removeReinstatementResponsibleSchema } from "../api/remove-reinstatement-responsible.service";

export const removeReinstatementResponsibleAction = createAsyncThunk(
  removeReinstatementResponsibleType,
  async (id: string) => {
    try {
      await removeReinstatementResponsibleSchema(id);
      return id;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
