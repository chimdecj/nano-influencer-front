"use client";

import { influencerCampaigns } from "@/api";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Button, Table, Tag, notification } from "antd";
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (platform_type: number) => {
        switch (platform_type) {
          case 0:
            return <Tag color="volcano">Draft</Tag>;
          case 1:
            return <Tag color="blue">Submitted</Tag>;
          case 2:
            return <Tag color="green">Active</Tag>;
          case 3:
            return <Tag color="red">Finished</Tag>;
          default:
            return <div></div>;
        }
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
