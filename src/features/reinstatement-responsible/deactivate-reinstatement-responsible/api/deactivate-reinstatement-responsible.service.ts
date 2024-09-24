import { axiosInstance } from "@/shared/configs/axios-config";

export const deactivateReinstatementResponsible = async ({
  id,
  data,
}: {
  id: string;
  data: { is_active: boolean };
}) => axiosInstance.patch(`/reinstatement-responsibles/${id}/activate`, data);
