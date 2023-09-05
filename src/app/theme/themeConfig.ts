// theme/themeConfig.ts
import type { ThemeConfig } from "antd";
import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const themeConfig: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    // fontSize: 16,
    fontFamily: "__Quicksand_1b586d",
    colorPrimary: "#B5D43B",
    borderRadius: 16,
  },
};

export default themeConfig;
