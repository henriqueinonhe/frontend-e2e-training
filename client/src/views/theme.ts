import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      tertiary: string;
      text: string;
      brand: string;
      brandSecondary: string;
    };
    spacing: {
      xl: string;
      l: string;
      m: string;
      s: string;
    };
    borderRadius: {
      l: string;
      m: string;
    };
    fonts: {
      weight: {
        bold: number;
      };
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    background: "black",
    primary: "#DDDCDA",
    secondary: "#1C1C1E",
    tertiary: "#2F2F2F",
    text: "#9B9A9D",
    brand: "#E2AE0F",
    brandSecondary: "#B58B0D",
  },
  spacing: {
    xl: "24px",
    l: "12px",
    m: "8px",
    s: "4px",
  },
  borderRadius: {
    l: "8px",
    m: "4px",
  },
  fonts: {
    weight: {
      bold: 700,
    },
  },
  breakpoints: {
    desktop: "768px",
  },
};
