"use client";

import Icons from "../common/Icons";
import { Dropdown, MenuProps, Switch } from "antd";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("theme");

  const onClick = (value: string) => {
    setTheme(value);
  };

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <div className="flex items-center">
          <Icons.SunMedium className="mr-2 h-5 w-5 text-orange-500" />
          <span>{t("light")}</span>
        </div>
      ),
    },
    {
      key: "dark",
      label: (
        <div className="flex items-center">
          <Icons.Moon className="mr-2 h-5 w-5 text-gray-1000" />
          <span>{t("dark")}</span>
        </div>
      ),
    },
    {
      key: "system",
      label: (
        <div className="flex items-center">
          <Icons.Laptop className="stroke-1.5 mr-2 h-5 w-5" />
          <span>{t("system")}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {theme == "dark" ? (
        <div className="p-1 bg-slate-50 dark:bg-gray-800 border-2 border-bg-slate-200 dark:border-[#1f1f1f] rounded-3xl w-20 flex justify-start">
          <div className="cursor-pointer w-8 h-8 rounded-full bg-gray-950 flex items-center justify-center" onClick={() => onClick("light")}>
            <Icons.Moon className="rotate-0 scale-100 text-primary-600 transition-all" />
          </div>
        </div>
      ) : (
        <div className="p-1 bg-slate-50 dark:bg-gray-800 border-2 border-bg-slate-200 dark:border-[#1f1f1f] rounded-3xl w-20 flex justify-end">
          <div className="cursor-pointer w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-950 flex items-center justify-center" onClick={() => onClick("dark")}>
            <Icons.SunMedium className="rotate-0 scale-100 text-orange-500 transition-all" />
          </div>
        </div>
      )}
      {/* <Switch
        className="scale-125"
        checkedChildren={<Icons.SunMedium />}
        unCheckedChildren={<Icons.Moon />}
        defaultChecked={theme !== "dark"}
        onChange={(v) => {
          onClick({
            key: v ? "light" : "dark",
          });
        }}
      /> */}

      {/* <Dropdown
        menu={{
          items,
          selectable: true,
          selectedKeys: [theme ?? "dark"],
          onClick,
        }}
      >
        <button className="btn">
          {theme == "light" ? (
            <Icons.SunMedium className="rotate-0 scale-100 text-orange-500 transition-all dark:-rotate-90 dark:scale-0" />
          ) : (
            <Icons.Moon className="rotate-90 scale-0 text-primary-600 transition-all dark:rotate-0 dark:scale-100" />
          )}
        </button>
      </Dropdown> */}
    </div>
  );
}
