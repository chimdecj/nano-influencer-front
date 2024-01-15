"use client";

import { getActiveCampaignList, getCampaignList, getCampaignListByStatus } from "@/api";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Button, Table, Tag } from "antd";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const getCampaignStatusTag = (status: number) => {
  switch (status) {
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
};

function CampaignList() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);
  const [userBasic, setUserBasic] = useState<UserBasic>();

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: Campaign) => {
        return (
          <Link href={`/admin/company/campaign/${record.id}`}>
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
        console.log(a);
        return moment(a.created_date).unix() - moment(b.created_date).unix();
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => getCampaignStatusTag(status),
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (platform_type: number, record: Campaign) => {
        switch (platform_type) {
          case 0:
            return (
              <Link href={`/admin/company/create/campaign/form?id=${record.id}`}>
                <Button type="link" shape="round" danger>
                  Edit
                </Button>
              </Link>
            );
          default:
            return (
              <Link href={`/admin/company/campaign/${record.id}`}>
                <Button type="link" shape="round">
                  View detail
                </Button>
              </Link>
            );
        }
      },
    },
  ];

  const getData = () => {
    setLoading(true);
    if (status) {
      getActiveCampaignList({
        org_id: userBasic?.org_id as number,
        skip: 0,
        limit: 100,
      }).then((data) => {
        setLoading(false);
        Array.isArray(data) ? setDataSource(data as any) : setDataSource([]);
      });
    } else {
      getCampaignList({
        org_id: userBasic?.org_id as number,
        skip: 0,
        limit: 100,
      }).then((data) => {
        setLoading(false);
        Array.isArray(data) ? setDataSource(data as any) : setDataSource([]);
      });
    }
  };

  useEffect(() => {
    setUserBasic(getUserBasic());
  }, []);

  useEffect(() => {
    if (userBasic) {
      getData();
    }
  }, [status, userBasic]);

  return (
    <div className="space-y-4">
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}

export default CampaignList;
