"use client";

import { getInfluencerList } from "@/api";
import Icons from "@/components/common/Icons";
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

  const getGender = (value: number) => {
    switch (value) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      default:
        return "Unknown";
    }
  };
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
        <div className="grid grid-cols-3 gap-6">
          {dataSource.map((item, index) => (
            <div className="flex gap-6 rounded-2xl bg-slate-200 p-6 dark:bg-gray-900" key={index}>
              <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" size={68} />
              <div className="grid gap-2">
                <span>{`${item.first_name} ${item.last_name}`}</span>
                <Link href="/admin/company/user/1" className="no-underline">
                  View details
                </Link>
                <Button
                  ghost
                  icon={<Icons.FileSearch2 size={12} />}
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
      <Modal title="Influencer" open={modal} onCancel={handleModal} footer={null}>
        <dl className="grid grid-cols-3">
          <div className="col-span-1">
            <Image src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" alt="" className="w-12 h-12" />
          </div>
          <div className="col-span-2">
            <div className="py-2 gap-4">
              <dt className="text-sm font-semibold text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{`${user?.first_name} ${user?.last_name}`}</dd>
            </div>
            <div className="py-2 gap-4">
              <dt className="text-sm font-semibold text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{user?.email}</dd>
            </div>
            <div className="py-2 gap-4">
              <dt className="text-sm font-semibold text-gray-500">Phone number</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{user?.phonenumber}</dd>
            </div>
            <div className="py-2 gap-4">
              <dt className="text-sm font-semibold text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{getGender(user?.gender as number)}</dd>
            </div>
          </div>
        </dl>
      </Modal>
    </div>
  );
};

export default AdminHomePage;
