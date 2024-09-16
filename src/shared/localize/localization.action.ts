"use server";
import { cookies } from "next/headers";

export const getLanguage = async () => {
  return cookies().get("Reinstatement-Delegation-app-language")?.value;
};

export const setLanguage = async (language: string) => {
  cookies().set("Reinstatement-Delegation-app-language", language);
};
