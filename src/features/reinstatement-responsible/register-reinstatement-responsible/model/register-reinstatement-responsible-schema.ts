import { useTranslations } from "next-intl";
import { z } from "zod";

export const useNewReinstatementResponsibleDetailsFormSchema = () => {
  const t = useTranslations();
  return z.object({
    name: z
      .string({
        required_error: t("reinstatementResponsiblesFormSchema.firstNameRequiredError"),
      })
      .min(3, { message: t("reinstatementResponsiblesFormSchema.firstNameMinError") })
      .max(250, { message: t("reinstatementResponsiblesFormSchema.firstNameMaxError") }),
    last_name: z
      .string({
        required_error: t("reinstatementResponsiblesFormSchema.lastNameRequiredError"),
      })
      .min(3, { message: t("reinstatementResponsiblesFormSchema.lastNameMinError") })
      .max(250, { message: t("reinstatementResponsiblesFormSchema.lastNameMaxError") }),
    email: z
      .string({ required_error: t("reinstatementResponsiblesFormSchema.emailRequiredError") })
      .min(1, { message: t("reinstatementResponsiblesFormSchema.emailRequiredError") })
      .max(320, { message: t("reinstatementResponsiblesFormSchema.emailRequiredMax") })
      .email(t("reinstatementResponsiblesFormSchema.emailInvalidError")),
    headquarter: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine(data => data.value !== "", {
        message: t("reinstatementResponsiblesFormSchema.headquarterError"),
      }),
    is_active: z.boolean().default(false),
  });
};

export type NewReinstatementResponsibleDetailsFormSchema = z.infer<
  ReturnType<typeof useNewReinstatementResponsibleDetailsFormSchema>
>;
