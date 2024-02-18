"use client";

import { getCompanyById, getInfluencerById, getMeData, getUserById } from "@/api";
import Icons from "@/components/common/Icons";
import { setUserBasic } from "@/libs/common";
import { Company, User, UserBasic } from "@/libs/types";
import { Avatar, Grid, Tag } from "antd";
import React, { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const UserSection = () => {
  const screens = useBreakpoint();
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

  if (screens.xs) return null;

  if (type == 0) {
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <div className="w-12 h-12">
          <Avatar size={48} shape="square" src={company?.image_url} />
        </div>
        <div className="w-full grid text-sm font-medium gap-1">
          <div className="flex justify-between items-center">
            <div>Welcome</div>
            <div className="px-2.5 py-1 rounded-2xl bg-slate-300 dark:bg-primary-1000 border border-slate-400 dark:border-primary-600 text-xs">Company</div>
          </div>
          <span className="text-base">{company?.name}</span>
        </div>
      </div>
    );
  }

  if (type == 1)
    return (
      <div className="flex h-fit items-center gap-4 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
        <div className="w-12 h-12">
          <Avatar src={user?.image_url} size={48} />
        </div>
        <div className="w-full grid text-sm font-medium gap-1">
          <div className="flex justify-between items-center">
            <span>Hello, </span>
            <div className="px-2.5 py-1 rounded-2xl bg-slate-300 dark:bg-primary-1000 border border-slate-400 dark:border-primary-600 text-xs">Influencer</div>
            {/* <Tag>Influencer</Tag> */}
          </div>
          <span className="text-base">{user?.first_name + " " + user?.last_name}</span>
        </div>
      </div>
    );

  return <></>;
};

export default UserSection;
