import { UserBasic } from "./types";

export const setUserBasic = (data: object) => {
  window.localStorage.setItem("userBasic", JSON.stringify(data));
};

export const getUserBasic = (): UserBasic => {
  const userBasic: UserBasic = JSON.parse(window.localStorage.getItem("userBasic") as string);
  return userBasic;
};
