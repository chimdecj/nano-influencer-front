"use client";

import { getMeData } from "@/api";
import Icons from "@/components/common/Icons";
import { setUserBasic } from "@/libs/common";
import { User, UserBasic } from "@/libs/types";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";

const UserSection = () => {
  const [data, setData] = useState<UserBasic>();
  const getData = () => {
    getMeData().then((res: UserBasic) => {
      setData(res);
      setUserBasic(res);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (data?.user_type == 0) {
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <Avatar size={48}>{/* <Icons.Image /> */}</Avatar>
        <div className="grid text-sm font-medium">
          <span>Hello, </span>
          <span>{data?.username}</span>
        </div>
      </div>
    );
  }

  if (data?.user_type == 1)
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" size={48} />
        <div className="grid text-sm font-medium">
          <span>Hello, </span>
          <span>{data?.username}</span>
        </div>
      </div>
    );

  return <></>;
};

export default UserSection;
