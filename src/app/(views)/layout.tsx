import "./globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { PublicEnvProvider } from "next-runtime-env";
import { Metadata } from "next";
import GlobalProviders from "../providers/global-providers";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" sizes="16x16" />
        <title>{messages?.appTitle as string}</title>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <GlobalProviders>
            <PublicEnvProvider>{children}</PublicEnvProvider>
          </GlobalProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
