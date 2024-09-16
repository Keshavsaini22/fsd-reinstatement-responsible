import { useLocale } from "next-intl";
import { HeadquarterInfo } from ".";

export const getHeadquatersList = (): SelectChipOption[] => {
  const currLang = useLocale();
  return HeadquarterInfo.map(item => ({
    label:
      currLang === "es_ES"
        ? `${item.abbreviation}-${item.name}`
        : `${item.abbreviation}-${item.translations[currLang as keyof typeof item.translations]}`,
    value: item.abbreviation,
  }));
};
