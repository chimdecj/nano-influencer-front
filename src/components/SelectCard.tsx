"use client";

import Icons from "@/components/common/Icons";
import { ReactNode } from "react";

const SelectCard = ({
  onChange,
  title,
  desc,
  icon,
  isSelected,
  disabled,
}: {
  onChange: () => void;
  title: string;
  desc?: string;
  icon: ReactNode;
  isSelected: boolean;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between rounded-[26px] bg-white dark:bg-gray-900 p-6 ${isSelected ? "!bg-primary-600 text-black" : "text-gray-950 dark:text-white"} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      onClick={() => !disabled && onChange()}
    >
      <div className="flex items-center gap-6">
        <div className="text-2xl">{icon}</div>
        <div className="items-center">
          <h3 className="text-lg font-semibold !mb-0">{title}</h3>
          {desc && <p className={`text-sm ${isSelected ? "text-gray-950" : "text-gray-500"}`}>{desc}</p>}
        </div>
      </div>
      {isSelected ? (
        <div className="h-5 w-5 rounded-sm ">
          <Icons.Check color="white" />
        </div>
      ) : (
        <div className="h-5 w-5 min-w-[20px] rounded-sm bg-slate-300 dark:bg-gray-800"></div>
      )}
    </div>
  );
};

export default SelectCard;
