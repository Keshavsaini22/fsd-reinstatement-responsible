import { axiosInstance } from "@/shared/configs/axios-config";

export const fetchReinstatementResponsibles = async (filterQuery: String) =>
  axiosInstance.get(`/reinstatement-responsibles?${filterQuery}`);
