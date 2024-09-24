import { axiosInstance } from "@/shared/configs/axios-config";

export const listReinstatementResponsiblesService = async (filterQuery: String) =>
  axiosInstance.get(`/reinstatement-responsibles?${filterQuery}`);
