"use client";

import { getCompanyById, getInfluencerById, getMeData, getUserById } from "@/api";
import Icons from "@/components/common/Icons";
import { setUserBasic } from "@/libs/common";
import { Company, User, UserBasic } from "@/libs/types";
import { Avatar, Tag } from "antd";
import React, { useEffect, useState } from "react";

const UserSection = () => {
  const [type, setType] = useState<number>();
  const [data, setData] = useState<UserBasic>();
  const [company, setCompany] = useState<Company>();
  const [user, setUser] = useState<User>();
  const getData = () => {
    getMeData().then((res: UserBasic) => {
      setData(res);
      setUserBasic(res);
      setType(res.user_type);
      // if (res.inf_id) {
      //   setType(1);
      // } else if (res.org_id) {
      //   setType(0);
      // }
    });
  };

  useEffect(() => {
    switch (type) {
      case 0:
        getCompanyById({
          id: data?.org_id as number,
        }).then((res) => {
          setCompany(res);
        });
        break;
      case 1:
        getInfluencerById({
          influencer_id: data?.inf_id as number,
        }).then((res) => {
          setUser(res);
        });
        break;

      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    getData();
  }, []);

  if (type == 0) {
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <Avatar size={48} shape="square" src={company?.image_url} />
        <div className="grid text-sm font-medium">
          <div className="space-x-2">
            <span>Welcome</span>
            <Tag>Company</Tag>
          </div>
          <span className="text-base">{company?.name}</span>
        </div>
      </div>
    );
  }

  if (type == 1)
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <Avatar src={user?.image_url} size={48} />
        <div className="grid text-sm font-medium">
          <div className="space-x-2">
            <span>Hello, </span>
            <Tag>Influencer</Tag>
          </div>
          <span className="text-base">{user?.first_name + " " + user?.last_name}</span>
        </div>
      </div>
    );

  return <></>;
};

export default UserSection;
