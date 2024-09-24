import { axiosInstance } from "@/shared/configs/axios-config";

export const removeReinstatementResponsibleSchema = async (id: string) =>
  axiosInstance.delete(`/reinstatement-responsibles/${id}`);
