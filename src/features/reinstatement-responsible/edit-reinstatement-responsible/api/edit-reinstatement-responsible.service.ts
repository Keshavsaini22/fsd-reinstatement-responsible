import { axiosInstance } from "@/shared/configs/axios-config";
import { EditReinstatementResponsibleDetailsFormSchema } from "../model/edit-reinstatement-responsible-schema";

export const updateReinstatementResponsibleService = async ({
  data,
  id,
}: {
  data: EditReinstatementResponsibleDetailsFormSchema;
  id: string;
}) =>
  axiosInstance.put(`/reinstatement-responsibles/${id}`, {
    ...data,
    headquarter: data.headquarter.value,
  });
