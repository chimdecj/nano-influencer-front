'use client';

import { ReactNode } from 'react';

import Image from 'next/image';

import { Button, Form, Table } from 'antd';

const SelectButton = ({
  onChange,
  title,
  desc,
  icon,
}: {
  onChange: () => void;
  title: string;
  desc?: string;
  icon: ReactNode;
}) => {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-[26px] bg-gray-900 p-6 text-white">
      <div className="flex items-center gap-2">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
      <div className="h-5 w-5 rounded-sm bg-gray-800"></div>
    </div>
  );
};

export default SelectButton;
