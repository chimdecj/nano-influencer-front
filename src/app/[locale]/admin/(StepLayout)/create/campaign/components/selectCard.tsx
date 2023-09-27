"use client";

import Icons from "@/components/common/Icons";
import { Button, Form, Table } from "antd";
import Image from "next/image";
import { ReactNode } from "react";

const SelectButton = ({ onChange, title, desc, icon, isSelected }: { onChange: () => void; title: string; desc?: string; icon: ReactNode; isSelected: boolean }) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-[26px] dark:bg-gray-900 p-6 ${isSelected ? "!bg-primary-600 text-black" : "text-white"}`}
      onClick={onChange}
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
        <div className="h-5 w-5 rounded-sm bg-gray-800"></div>
      )}
    </div>
  );
};

export default SelectButton;
