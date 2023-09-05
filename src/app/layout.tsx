import { ConfigProvider, theme } from "antd";
import { Quicksand } from "next/font/google";
import React from "react";

import StyledComponentsRegistry from "./lib/AntdRegistry";
import themeConfig from "./theme/themeConfig";

import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Influencer",
  description: "desc here ...",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={quicksand.className}>
      <ConfigProvider theme={{ ...themeConfig, algorithm: theme.darkAlgorithm }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ConfigProvider>
    </body>
  </html>
);

export default RootLayout;
