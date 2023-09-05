"use client";

import { Button, Table } from "antd";
import Image from "next/image";
import { ReactNode } from "react";

import { PlayCircleOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin";

const AdminHomePage = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AdminHomePage;
