"use client";

import { getInfluencerList } from "@/api";
import Icons from "@/components/common/Icons";
import { User } from "@/libs/types";
import { Avatar, Button, Spin, notification } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [influencerList, setInfluencerList] = useState<User[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      getInfluencerList({
        limit: 100,
        skip: 0,
      }).then((data) => {
        setLoading(false);
        setInfluencerList(data);
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Data fetch error",
      });
    }
  }, []);

  const items = [
    {
      title: "Total influencers",
      content: 10,
    },
    {
      title: "Link traffic",
      content: "50,000",
    },
    {
      title: "Total stories",
      content: "50,000",
    },
    {
      title: "Duration",
      content: "3 days",
    },
    {
      title: "Story viewed",
      content: "100,000,000",
    },
    {
      title: "Completion",
      content: "80%",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-medium">Active campaigns</h2>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div className="grid gap-6 rounded-2xl bg-slate-200 p-6 dark:bg-gray-900" key={index}>
              <span className="text-xl">{item.title}</span>
              <span className="text-4xl font-medium text-primary-600">{item.content}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium">Influencers</h2>
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        <div className="grid grid-cols-3 gap-6">
          {influencerList.map((item, index) => (
            <div className="flex gap-6 rounded-2xl bg-slate-200 p-6 dark:bg-gray-900" key={index}>
              <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" size={68} />
              <div className="grid gap-2">
                <span>{`${item.first_name} ${item.last_name}`}</span>
                <Link href="/admin/company/user/1" className="no-underline">
                  View details
                </Link>
                <Button ghost icon={<Icons.FileSearch2 size={12} />} shape="round">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
