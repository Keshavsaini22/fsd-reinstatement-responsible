import { getRequestConfig } from "next-intl/server";
import { getLanguage } from "./localization.action";

export default getRequestConfig(async () => {
  const locale = (await getLanguage()) || "es_ES";

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});

export const availableLanguages = [
  {
    lang: "en_US",
    name: "English (EE.UU.)",
  },
  {
    lang: "es_ES",
    name: "Español (España)",
  },
  {
    lang: "it_IT",
    name: "Italiano (Italia)",
  },
  {
    lang: "pt_BR",
    name: "Português (Portugal)",
  },
];
