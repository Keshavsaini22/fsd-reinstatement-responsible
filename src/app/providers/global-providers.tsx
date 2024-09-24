"use client";

import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import ThemeProviderWrapper from "../providers/theme-provider";
import { store } from "@/app/store/store";
import { SnackbarProvider } from "@/shared/ui/snackbar";
import { SidebarProvider } from "@/shared/context";


const GlobalProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProviderWrapper>
      <SnackbarProvider
        configOptions={{
          autoHideDuration: 3000,
          maxSnack: 3,
          hideIconVariant: true,
          showDeleteAction: true,
        }}
      >
        <Provider store={store}>
          <SidebarProvider>{children}</SidebarProvider>
        </Provider>
      </SnackbarProvider>
    </ThemeProviderWrapper>
  );
};

export default GlobalProviders;
