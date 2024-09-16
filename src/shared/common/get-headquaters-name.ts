import { HeadquarterInfo } from ".";

export const getHeadquaterName = ({ abvr, lang }: { abvr: string; lang: string }) => {
  let value: string;
  HeadquarterInfo.map(item => {
    if (item.abbreviation === abvr) {
      value = lang === "es_ES" ? item.name : item.translations[lang as keyof typeof item.translations];
    }
  });
  if (value!) return value;
};