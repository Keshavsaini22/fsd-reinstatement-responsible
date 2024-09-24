import { axiosInstance } from "@/shared/configs/axios-config";

export const deactivateReinstatementResponsibleService = async ({
  id,
  data,
}: {
  id: string;
  data: { is_active: boolean };
}) => axiosInstance.patch(`/reinstatement-responsibles/${id}/activate`, data);
