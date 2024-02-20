"use client";

import { influencerCampaigns } from "@/api";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Button, Table, Tag, notification } from "antd";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

function InfluencerAssignedCampaignList() {
  const [userBasic, setUserBasic] = useState<UserBasic>();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setUserBasic(getUserBasic());
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: Campaign) => {
        return (
          <Link href={`/admin/influencer/campaign/${record.id}`}>
            <div>{title}</div>
          </Link>
        );
      },
    },
    {
      title: "Platform",
      dataIndex: "platform_type",
      key: "platform_type",
      render: (platform_type: number) => {
        switch (platform_type) {
          case 0:
            return (
              <div>
                <span>Instagram</span>
              </div>
            );
          case 1:
            return (
              <div>
                <span>Facebook</span>
              </div>
            );
          default:
            return <div>Unknown</div>;
        }
      },
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "created_date",
      render: (created_date: string) => {
        return moment(created_date).format("YYYY-MM-DD HH:mm:ss");
      },
      sorter: (a: any, b: any) => {
        return moment(a.created_date).unix() - moment(b.created_date).unix();
      },
    },
    {
      title: "Start date",
      dataIndex: "start_date_time",
      key: "start_date_time",
      render: (created_date: string) => {
        return moment(created_date).format("YYYY-MM-DD");
      },
      sorter: (a: any, b: any) => {
        return moment(a.created_date).unix() - moment(b.created_date).unix();
      },
    },
    {
      title: "End date",
      dataIndex: "end_date_time",
      key: "end_date_time",
      render: (date: string) => {
        return moment(date).format("YYYY-MM-DD");
      },
      sorter: (a: any, b: any) => {
        return moment(a.created_date).unix() - moment(b.created_date).unix();
      },
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (platform_type: number, record: Campaign) => {
        return (
          <Link href={`/admin/influencer/campaign/${record.id}`}>
            <Button type="link" shape="round">
              View detail
            </Button>
          </Link>
        );
      },
    },
  ];

  const getData = useCallback(async () => {
    if (userBasic) {
      try {
        setLoading(true);
        influencerCampaigns({
          influencer_id: userBasic.inf_id,
        }).then((data: any) => {
          setLoading(false);
          Array.isArray(data) ? setDataSource(data as any) : setDataSource([]);
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Data fetch error",
        });
      }
    }
  }, [userBasic]);

  useEffect(() => {
    if (userBasic) {
      getData();
    }
  }, [getData, userBasic]);

  return (
    <div className="space-y-4">
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}

export default InfluencerAssignedCampaignList;
