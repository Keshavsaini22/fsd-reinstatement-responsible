import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { listReinstatementResponsibleType } from "./types";
import { listReinstatementResponsiblesService } from "../api/list-reinstatement-responsibles.service";
import { buildQueryStringFilters } from "@/shared/common/build-query-string-filters";

type FetchResponseResponsibles = {
  data: ReinstatementResponsible[];
  total: number;
  current_page: number;
  per_page: number;
};

export const listReinstatementResponsiblesAction = createAsyncThunk(
  listReinstatementResponsibleType,
  async ({ data, isMobile }: { data: ReinstatementResponsibleFilterQuery; isMobile: boolean }) => {
    try {
      const query = buildQueryStringFilters({ ...data });
      const response = await listReinstatementResponsiblesService(query);
      return { resp: response.data as FetchResponseResponsibles, isMobile };
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
