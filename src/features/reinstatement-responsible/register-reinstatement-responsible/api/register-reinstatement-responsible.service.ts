import { axiosInstance } from "@/shared/configs/axios-config";
import { NewReinstatementResponsibleDetailsFormSchema } from "../model/register-reinstatement-responsible-schema";


export const registerReinstatementResponsibleService = async (data: NewReinstatementResponsibleDetailsFormSchema) =>
  axiosInstance.post("/reinstatement-responsibles", {
    ...data,
    headquarter: data.headquarter.value,
  });
