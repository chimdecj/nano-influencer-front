"use client";

import { getMeData } from "@/api";
import { User } from "@/libs/types";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";

const UserSection = () => {
  const [data, setData] = useState<User>();
  const getData = () => {
    getMeData().then((res) => {
      console.log("res");
      console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
      <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" size={48} />
      <div className="grid text-sm font-medium">
        <span>Hello, </span>
        <span>{data?.username}</span>
      </div>
    </div>
  );
};

export default UserSection;
