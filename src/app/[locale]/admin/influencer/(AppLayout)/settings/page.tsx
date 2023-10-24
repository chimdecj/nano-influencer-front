"use client";

import { updateCompanyInfo } from "@/api";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";

function CompanySetting() {
  const companyId = 1;
  const [loading, setLoading] = useState(false);

  const onFinish = (values: {
    phonenumber: string;
    email: string;
    first_name: string;
    last_name: string;
    dateofbirth: string;
    gender: number;
    category: string;
    profession: string;
    work_position: string;
    work_name: string;
    work_address: string;
    family_count: string;
    home_address: string;
    bank: string;
    bankaccount: string;
  }) => {
    setLoading(true);
    // api here
  };

  return (
    <div>
      <Form labelCol={{ span: 5 }} layout="horizontal" requiredMark="optional" onFinish={onFinish}>
        <Form.Item name="first_name" label="First name" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="Andy" />
        </Form.Item>
        <Form.Item name="last_name" label="Last name" rules={[{ required: true, message: "Please input your name" }]}>
          <Input placeholder="Doe" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email" }]}>
          <Input placeholder="andy@mail.com" />
        </Form.Item>
        <Form.Item name="dateofbirth" label="Date of birth" rules={[{ required: true, message: "Please input your Date of birth" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please input your gender" }]}>
          <Select placeholder="Select gender">
            <Select.Option value={1}>Male</Select.Option>
            <Select.Option value={0}>Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please input your category" }]}>
          <Select placeholder="Select gender">
            <Select.Option value={1}>Cat 1</Select.Option>
            <Select.Option value={0}>Cat 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="profession" label="Profession" rules={[{ required: true, message: "Please input your profession" }]}>
          <Input placeholder="Input your profession" />
        </Form.Item>
        <Form.Item name="work_position" label="Work position" rules={[{ required: true, message: "Please input your work position" }]}>
          <Input placeholder="Input your position" />
        </Form.Item>
        <Form.Item name="work_name" label="Work name" rules={[{ required: true, message: "Please input your work name" }]}>
          <Input placeholder="Input your work name" />
        </Form.Item>
        <Form.Item name="work_address" label="Work address" rules={[{ required: true, message: "Please input your work address" }]}>
          <Input placeholder="Input your work address" />
        </Form.Item>
        <Form.Item name="family_count" label="Family count" rules={[{ required: true, message: "Please input your family count" }]}>
          <InputNumber placeholder="Input your family count" />
        </Form.Item>
        <Form.Item name="home_address" label="Home address" rules={[{ required: true, message: "Please input your address" }]}>
          <Input placeholder="Input your home address" />
        </Form.Item>
        <Form.Item name="bank" label="Bank" rules={[{ required: true, message: "Please input your address" }]}>
          <Select placeholder="Select gender">
            <Select.Option value={1}>Golomt Bank</Select.Option>
            <Select.Option value={2}>Khan Bank</Select.Option>
            <Select.Option value={3}>Xac Bank</Select.Option>
            <Select.Option value={4}>TDB Bank</Select.Option>
            <Select.Option value={5}>State Bank</Select.Option>
            <Select.Option value={6}>M Bank</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="bankaccount" label="Bank Account" rules={[{ required: true, message: "Please input your address" }]}>
          <InputNumber placeholder="Input your Bank account" />
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
