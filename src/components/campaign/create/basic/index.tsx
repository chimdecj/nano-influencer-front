"use client";

import { createCampaign, getCampaignById, updateCampaign } from "@/api";
import SelectCard from "@/components/SelectCard";
import Icons from "@/components/common/Icons";
import { Button, Form } from "antd";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCampaignBasic = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const platform = Form.useWatch("platform", form);
  const type = Form.useWatch("type", form);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = (values: any) => {
    setSubmitLoading(true);
    let r = (Math.random() + 1).toString(36).substring(7);
    if (id) {
      updateCampaign({
        platform_type: 0,
        type: 0,
        campaign_id: id,
      })
        .then((res) => {
          setSubmitLoading(false);
          return res.json();
        })
        .then((data) => {
          router.push(`/admin/company/create/campaign/form?id=${data?.id}`);
        });
    } else {
      createCampaign({
        org_id: 1,
        type: values.type,
        platform_type: values.platform,
        title: r,
        owner_id: 1,
        created_date: moment(new Date()).format("YYYY-MM-DDTh:mm:ssZ"),
        status: 0,
      })
        .then((res) => {
          setSubmitLoading(false);
          return res.json();
        })
        .then((data) => {
          router.push(`/admin/company/create/campaign/form?id=${data?.id}`);
        });
    }
  };

  const socialMedias = [
    {
      id: 1,
      title: "Facebook",
      icon: <Icons.Facebook />,
      disabled: true,
    },
    {
      id: 0,
      title: "Instagram",
      icon: <Icons.Instagram />,
    },
    {
      id: 3,
      title: "Tiktok",
      icon: <Icons.VideoIcon />,
      disabled: true,
    },
  ];

  const plans = [
    {
      id: 1,
      title: "Easy Awareness",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: 2,
      title: "Product Seed",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: 3,
      title: "Mass story, launch event or product",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
    {
      id: 4,
      title: "Mass story, launch event or product",
      desc: "Best for product launch, Event Wom Facebook, Instagram",
      icon: <Icons.VideoIcon />,
    },
  ];

  useEffect(() => {
    if (id) {
      getCampaignById({
        campaign_id: id,
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          form.setFieldsValue({
            platform: data.platform_type,
            type: data.type,
          });
        });
    }
  }, [form, id]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Choose your social media" name="platform" rules={[{ required: true }]}>
        <div className="grid grid-cols-3 gap-6">
          {socialMedias.map((item, index) => (
            <SelectCard
              key={index}
              onChange={() => form.setFieldValue("platform", item.id)}
              title={item.title}
              icon={item.icon}
              isSelected={platform === item.id}
              disabled={item.disabled}
            />
          ))}
        </div>
      </Form.Item>
      <Form.Item label="Choose your plan" name="type" rules={[{ required: true }]}>
        <div className="grid grid-cols-2 gap-6">
          {plans.map((item, index) => (
            <SelectCard key={index} onChange={() => form.setFieldValue("type", item.id)} title={item.title} icon={item.icon} desc={item.desc} isSelected={type === item.id} />
          ))}
        </div>
      </Form.Item>
      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large" loading={submitLoading}>
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignBasic;
