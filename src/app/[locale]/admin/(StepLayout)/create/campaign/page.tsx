"use client";

import SelectButton from "./components/selectCard";
import Icons from "@/components/common/Icons";
import { Button, Form, Table } from "antd";
import Image from "next/image";
import { ReactNode } from "react";

const AdminCreateCampaignPage = () => {
  const [form] = Form.useForm();
  const platform = Form.useWatch("platform", form);
  const plan = Form.useWatch("plan", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const socialMedias = [
    {
      id: "facebook",
      title: "Facebook",
      icon: <Icons.Facebook />,
    },
    {
      id: "instagram",
      title: "Instagram",
      icon: <Icons.Instagram />,
    },
    {
      id: "tiktok",
      title: "Tiktok",
      icon: <Icons.VideoIcon />,
    },
  ];

  const plans = [
    {
      id: "easy",
      title: "Easy Awareness",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: "product",
      title: "Product Seed",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: "seed",
      title: "Mass story, launch event or product",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: "mass",
      title: "Mass story, launch event or product",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
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
              <SelectButton key={index} onChange={() => form.setFieldValue("platform", item.id)} title={item.title} icon={item.icon} isSelected={platform === item.id} />
            ))}
          </div>
        </Form.Item>
        <Form.Item label="Choose your plan" name="plan">
          <div className="grid grid-cols-2 gap-6">
            {plans.map((item, index) => (
              <SelectButton key={index} onChange={() => form.setFieldValue("plan", item.id)} title={item.title} icon={item.icon} desc={item.desc} isSelected={plan === item.id} />
            ))}
          </div>
        </Form.Item>
        <div className="text-right">
          <Button type="primary" htmlType="submit" shape="round" size="large">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminCreateCampaignPage;
