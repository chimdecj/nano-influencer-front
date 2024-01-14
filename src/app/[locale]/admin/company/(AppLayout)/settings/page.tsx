"use client";

import { getUserById, updateCompanyInfo } from "@/api";
import { getUserBasic } from "@/libs/common";
import { UserBasic } from "@/libs/types";
import { Button, Col, Form, Input, Row, notification } from "antd";
import React, { useEffect, useState } from "react";

function CompanySetting() {
  const companyId = 1;
  const [loading, setLoading] = useState(false);
  const [userBasic, setUserBasic] = useState<UserBasic>();

  const getData = () => {
    getUserById({
      id: userBasic?.org_id as number,
    }).then((res) => {
      console.log("res");
      console.log(res);
    });
  };

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
      org_id: companyId,
    }).then((data) => {
      setLoading(false);
      notification.success({
        message: "Successfully saved",
      });
    });
  };

  useEffect(() => {
    setUserBasic(getUserBasic());
  }, []);

  useEffect(() => {
    getData();
  }, [userBasic]);

  return (
    <div>
      <Form layout="vertical" requiredMark="optional" onFinish={onFinish}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your name" />
            </Form.Item>
            <Form.Item name="industry" label="Industry" rules={[{ required: true, message: "Please input your industry" }]}>
              <Input placeholder="Input your industry" />
            </Form.Item>
            <Form.Item name="sub_industry" label="Sub industry" rules={[{ required: true, message: "Please input your industry" }]}>
              <Input placeholder="Input your sub industry" />
            </Form.Item>
            <Form.Item name="preffered_category" label="Preferred category" rules={[{ required: true, message: "Please input your industry" }]}>
              <Input placeholder="Input your preferred category" />
            </Form.Item>
            <Form.Item name="email" label="Email address" rules={[{ required: true, message: "Please input your email address" }]}>
              <Input placeholder="Input your email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="instagram_profile" label="Instagram username" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your Instagram" />
            </Form.Item>
            <Form.Item name="tiktok_profile" label="Tiktok username" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your Tiktok" />
            </Form.Item>
            <Form.Item name="facebook_profile" label="Facebook username" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your Facebook" />
            </Form.Item>
            <Form.Item name="offce_address" label="Office address">
              <Input placeholder="Input your office address" />
            </Form.Item>
            <Form.Item name="phonenumber" label="Phone number" rules={[{ required: true, message: "Please input your phone number" }]}>
              <Input placeholder="Input your phone number" />
            </Form.Item>
          </Col>
        </Row>
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
