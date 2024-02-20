"use client";

import { getInfluencerList } from "@/api";
import SmallCard from "@/components/campaign/detail/small-card";
import Icons from "@/components/common/Icons";
import InfluencerProfile, { getGender } from "@/components/influencer/profile";
import { User } from "@/libs/types";
import { Image, Avatar, Button, Modal, Spin, Table, notification } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [modal, setModal] = useState<boolean>();
  const [user, setUser] = useState<User>();

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
        return getGender(value);
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

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-4">
      {/* <Table dataSource={dataSource} columns={columns} /> */}
      <div>
        <h2 className="text-2xl font-medium">Influencers</h2>
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {dataSource.map((item, index) => (
            <div className="flex gap-6 rounded-2xl bg-slate-200 p-6 dark:bg-gray-900" key={index}>
              <div className="w-16 h-16">
                <Avatar src={item.image_url} size={64} />
              </div>
              <div className="grid gap-2">
                <span>{`${item.first_name} ${item.last_name}`}</span>
                <Button
                  icon={<Icons.FileSearch2 size={12} />}
                  type="primary"
                  shape="round"
                  onClick={() => {
                    setUser(item);
                    handleModal();
                  }}
                >
                  See detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal title="Influencer profile" open={modal} onCancel={handleModal} footer={null}>
        {user && <InfluencerProfile user={user} />}
      </Modal>
    </div>
  );
};

export default AdminHomePage;
