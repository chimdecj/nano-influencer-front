"use client";

import { updateCompanyInfo } from "@/api";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

function CompanySetting() {
  const companyId = 1;
  const [loading, setLoading] = useState(false);

  const onFinish = (values: {
    user_id: number;
    name: string;
    industry: string;
    sub_industry: string;
    instagram_profile: string;
    facebook_profile: string;
    tiktok_profile: string;
    preffered_category: string;
    offce_address: string;
    phonenumber: string;
    email: string;
  }) => {
    setLoading(true);
    updateCompanyInfo({
      ...values,
      user_id: companyId,
    }).then((data) => {
      console.log(data);

      setLoading(false);
    });
  };

  return (
    <div>
      <Form labelCol={{ span: 5 }} layout="horizontal" requiredMark="optional" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="Neural link" />
        </Form.Item>
        <Form.Item name="industry" label="Industry" rules={[{ required: true, message: "Please input your industry" }]}>
          <Input placeholder="Tech company..." />
        </Form.Item>
        <Form.Item name="sub_industry" label="Industry" rules={[{ required: true, message: "Please input your industry" }]}>
          <Input placeholder="AI ML, Fintech..." />
        </Form.Item>
        <Form.Item name="preffered_category" label="Industry" rules={[{ required: true, message: "Please input your industry" }]}>
          <Input placeholder="Sports brand, Tech company..." />
        </Form.Item>
        <Form.Item name="instagram_profile" label="Instagram username" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="elonmusk" />
        </Form.Item>
        <Form.Item name="tiktok_profile" label="Instagram username" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="elonmusk" />
        </Form.Item>
        <Form.Item name="facebook_profile" label="Instagram username" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="elonmusk" />
        </Form.Item>
        <Form.Item name="offce_address" label="Office address">
          <Input placeholder="California, USA, Amberton 12-232" />
        </Form.Item>
        <Form.Item name="phonenumber" label="Phone number" rules={[{ required: true, message: "Please input your phone number" }]}>
          <Input placeholder="+976 72119191" />
        </Form.Item>
        <Form.Item name="email" label="Email address" rules={[{ required: true, message: "Please input your email address" }]}>
          <Input placeholder="neaural_link@x.com" />
        </Form.Item>
        <div className="flex items-center justify-end gap-4">
          <Button shape="round" htmlType="reset">
            Reset
          </Button>
          <Button shape="round" type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CompanySetting;
