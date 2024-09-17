"use client";

import Login from "@/features/auth/login/ui";
import { authenticate } from "@/shared/auth/authenticate.action";
import { availableLanguages } from "@/shared/localize";
import { setLanguage } from "@/shared/localize/localization.action";
import { callSnackbar } from "@/shared/ui/customs/snackbar/call-snackbar";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoogleResponse } from "../model/firebase/get-google-response";

function LoginPage() {
  const t = useTranslations("login");
  const langOptions = availableLanguages.map((lang) => ({
    key: lang.name,
    value: lang.lang,
  }));
  const [loading, setLoading] = useState(false);
  const { getSignInWithPopup } = GoogleResponse();
  const [lang, setLang] = useState(useLocale());
  const router = useRouter();
  const logInWithGoogle = async () => {
    setLoading(true);
    try {
      const googleResponse = await getSignInWithPopup();
      await authenticate({
        email: googleResponse.email as string,
        name: googleResponse.name as string,
      });
      router.push("/reinstatement-responsibles");
    } catch (err) {
      callSnackbar("login.error", "error");
    }
    setLoading(false);
  };
  const setLocale = async (lang: string) => {
    setLang(lang);
    await setLanguage(lang);
  };
  return (
    <Login
      BackgroundImage={"images/LoginBG.svg"}
      DefaultSelectedLanguage={lang}
      SelectMenuProps={{ OptionsArray: langOptions }}
      onMenuSelect={(e: any) => {
        setLocale(e.target.value);
      }}
      onLogin={logInWithGoogle}
      isLoading={loading}
      Icon={<Image src={"icons/logo.svg"} width={29} height={32} alt="logo" />}
      Title={t("title")}
      ButtonText={t("button")}
      SignInText={t("login")}
      SignInSubText={t("accessWithGoogle")}
    />
  );
}

export default LoginPage;
