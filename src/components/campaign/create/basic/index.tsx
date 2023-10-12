"use client";

import SelectCard from "@/components/SelectCard";
import Icons from "@/components/common/Icons";
import { Button, Form } from "antd";
import { useRouter } from "next/navigation";

const CreateCampaignBasic = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const platform = Form.useWatch("platform", form);
  const plan = Form.useWatch("plan", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    window.localStorage.setItem("campaign_basics", JSON.stringify(values));
    router.push("/admin/company/create/campaign/form");
  };

  const socialMedias = [
    {
      id: "facebook",
      title: "Facebook",
      icon: <Icons.Facebook />,
      disabled: true,
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
      disabled: true,
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
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Choose your social media" name="platform">
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
      <Form.Item label="Choose your plan" name="plan">
        <div className="grid grid-cols-2 gap-6">
          {plans.map((item, index) => (
            <SelectCard key={index} onChange={() => form.setFieldValue("plan", item.id)} title={item.title} icon={item.icon} desc={item.desc} isSelected={plan === item.id} />
          ))}
        </div>
      </Form.Item>
      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large">
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignBasic;
