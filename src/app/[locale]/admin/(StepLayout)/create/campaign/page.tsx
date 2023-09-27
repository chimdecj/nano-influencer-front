'use client';

import { ReactNode } from 'react';

import Image from 'next/image';

import { Button, Form, Table } from 'antd';

import Icons from '@/components/common/Icons';

import SelectButton from './components/selectCard';

const AdminCreateCampaignPage = () => {
  const form = Form.useForm()[0];

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const socialMedias = [
    {
      title: 'Facebook',
      icon: <Icons.Facebook />,
    },
    {
      title: 'Instagram',
      icon: <Icons.Instagram />,
    },
    {
      title: 'Tiktok',
      icon: <Icons.VideoIcon />,
    },
  ];

  const plans = [
    {
      title: 'Easy Awareness',
      desc: 'Best for product launch, Event Wom Facebook, Instagram',
      icon: <Icons.VideoIcon />,
    },
    {
      title: 'Product Seed',
      desc: 'Best for product launch, Event Wom Facebook, Instagram',
      icon: <Icons.VideoIcon />,
    },
    {
      title: 'Mass story, launch event or product',
      desc: 'Best for product launch, Event Wom Facebook, Instagram',
      icon: <Icons.VideoIcon />,
    },
    {
      title: 'Mass story, launch event or product',
      desc: 'Best for product launch, Event Wom Facebook, Instagram',
      icon: <Icons.VideoIcon />,
    },
  ];

  return (
    <div>
      <h2 className="mt-0">Create new campaign</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Choose your social media" name="platform">
          <div className="grid grid-cols-3 gap-6">
            {socialMedias.map((item, index) => (
              <SelectButton
                key={index}
                onChange={() => form.setFieldValue('platform', item.title)}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        </Form.Item>
        <Form.Item label="Choose your plan" name="description">
          <div className="grid grid-cols-2 gap-6">
            {plans.map((item, index) => (
              <SelectButton
                key={index}
                onChange={() => form.setFieldValue('platform', item.title)}
                title={item.title}
                icon={item.icon}
                desc={item.desc}
              />
            ))}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCreateCampaignPage;
