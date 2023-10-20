"use client";

import { getCampaignList, getCampaignListByStatus } from "@/api";
import { Campaign } from "@/libs/types";
import { Button, Table, Tag } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CampaignList() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);

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
        switch (platform_type) {
          case 0:
            return (
              <Link href={`/admin/company/create/campaign/form?id=${record.id}`}>
                <Button type="link" shape="round">
                  Edit
                </Button>
              </Link>
            );
          default:
            return <div></div>;
        }
      },
    },
  ];

  const getData = () => {
    setLoading(true);
    if (status) {
      getCampaignListByStatus({
        status: status as string,
        org_id: 1,
        skip: 0,
        limit: 100,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setDataSource(data);
        });
    } else {
      getCampaignList({
        org_id: 1,
        skip: 0,
        limit: 100,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setDataSource(data);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <div className="space-y-4">
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}

export default CampaignList;
