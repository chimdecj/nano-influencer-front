'use client';

import Image from 'next/image';
import Link from 'next/link';

import { FileSearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Table } from 'antd';

import Icons from '@/components/common/Icons';

const AdminHomePage = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="space-y-4">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AdminHomePage;
