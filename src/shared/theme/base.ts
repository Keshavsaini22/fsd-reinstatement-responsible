import React from "react";

import { Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    general: {
      borderColor: string;
      placeholderColor: string;
    };
    fontWeight: {
      bold: number;
      semiBold: number;
      regular: number;
    };
  }

  interface ThemeOptions {
    general: {
      borderColor: string;
      placeholderColor: string;
    };
    fontWeight: {
      bold: number;
      semiBold: number;
      regular: number;
    };
  }

  interface TypographyVariants {
    paragraphLg: React.CSSProperties;
    paragraphMd: React.CSSProperties;
    paragraphSm: React.CSSProperties;
    paragraphXs: React.CSSProperties;
    paragraphButton: React.CSSProperties;
    paragraphTable: React.CSSProperties;
    titleLg: React.CSSProperties;
    titleMd: React.CSSProperties;
    titleSm: React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    paragraphLg?: React.CSSProperties;
    paragraphMd?: React.CSSProperties;
    paragraphSm?: React.CSSProperties;
    paragraphXs?: React.CSSProperties;
    paragraphButton?: React.CSSProperties;
    paragraphTable?: React.CSSProperties;
    titleLg?: React.CSSProperties;
    titleMd?: React.CSSProperties;
    titleSm?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    paragraphLg: true;
    paragraphMd: true;
    paragraphSm: true;
    paragraphXs: true;
    paragraphButton: true;
    paragraphTable: true;
    titleLg: true;
    titleMd: true;
    titleSm: true;
  }
}
