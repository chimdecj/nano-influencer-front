"use client";

import { getCampaignList } from "@/api";
import Icons from "@/components/common/Icons";
import { Avatar, Button, Table, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
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
            return <Tag color="green">Active</Tag>;
          case 1:
            return <Tag color="red">Ended</Tag>;
          default:
            return <div></div>;
        }
      },
    },
  ];

  const getData = () => {
    getCampaignList({
      org_id: 1,
      skip: 0,
      limit: 100,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data");
        console.log(data);
        setDataSource(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-4">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AdminHomePage;
