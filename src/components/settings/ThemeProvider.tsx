"use client";

import { AntdProvider } from "./AntdProvider";
import { defaultLocale, languages } from "@/locale";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { Quicksand } from "next/font/google";
import { PropsWithChildren, useEffect, useState } from "react";

export type ProviderProps = PropsWithChildren<{
  locale?: string;
}>;
const quicksand = Quicksand({ subsets: ["latin"] });

export function AntdConfigProvider({ children, locale }: ProviderProps) {
  const { theme: nowTheme } = useTheme();
  return (
    <ConfigProvider
      locale={(languages as any)[(locale as any) ?? defaultLocale].antd}
      theme={{
        // algorithm: theme.darkAlgorithm,
        algorithm: nowTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: quicksand.style.fontFamily,
          colorPrimary: "#B5D43B",
          colorPrimaryBg: "#B5D43B",
          borderRadius: 14,
        },
      }}
    >
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  );
}

export default function ThemeProvider(props: ProviderProps) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // use your loading page
    return <div className="hidden">{props.children}</div>;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AntdConfigProvider {...props} />
    </NextThemeProvider>
  );
}
