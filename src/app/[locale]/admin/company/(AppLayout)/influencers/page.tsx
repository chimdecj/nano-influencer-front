"use client";

import { getInfluencerList } from "@/api";
import Icons from "@/components/common/Icons";
import { User } from "@/libs/types";
import { Avatar, Button, Table, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<User[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (first_name: string, record: User) => {
        return (
          <div>
            {record.first_name} {record.last_name}
          </div>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (value: number) => {
        switch (value) {
          case 0:
            return "Male";
          case 0:
            return "Female";
          default:
            return "Unknown";
        }
      },
    },
    {
      title: "Address",
      dataIndex: "home_address",
      key: "home_address",
    },
  ];

  const getData = () => {
    try {
      setLoading(true);
      getInfluencerList({
        skip: 0,
        limit: 100,
      }).then((data: User[]) => {
        setLoading(false);
        setDataSource(data);
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Data fetch error",
      });
    }
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
