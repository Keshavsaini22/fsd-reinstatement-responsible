import { axiosInstance } from "@/shared/configs/axios-config";

export const removeReinstatementResponsible = async (id: string) =>
  axiosInstance.delete(`/reinstatement-responsibles/${id}`);
