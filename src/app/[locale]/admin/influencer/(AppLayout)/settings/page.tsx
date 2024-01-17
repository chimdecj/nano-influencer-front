"use client";

import { API_URL, getInfluencerById, updateInfluencerInfo } from "@/api";
import ImageUpload from "@/components/common/ImageUpload";
import { getUserBasic } from "@/libs/common";
import { UserBasic } from "@/libs/types";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, notification } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import weekday from "dayjs/plugin/weekday";
import moment from "moment";
import React, { useEffect, useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

function UserSetting() {
  const [userBasic, setUserBasic] = useState<UserBasic>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const image_url = Form.useWatch("image_url", form);

  useEffect(() => {
    const userBasic = getUserBasic();
    setUserBasic(userBasic);
  }, []);

  useEffect(() => {
    if (userBasic) {
      getInfluencerById({
        influencer_id: userBasic.inf_id,
      }).then((data) => {
        const date = data.dateofbirth ? dayjs(data.dateofbirth, "YYYY-MM-DD") : null;
        form.setFieldsValue({
          ...data,
          dateofbirth: date,
        });
      });
    }
  }, [form, userBasic]);

  const onFinish = (values: any) => {
    if (userBasic) {
      setLoading(true);
      updateInfluencerInfo({
        ...values,
        dateofbirth: moment(values.dateofbirth).format("YYYY-MM-DD"),
        influencer_id: userBasic.inf_id,
      }).then((data) => {
        setLoading(false);
        notification.success({
          message: "Successfully saved",
        });
      });
    }
  };

  return (
    <div>
      <Form form={form} labelCol={{ span: 5 }} layout="vertical" requiredMark="optional" onFinish={onFinish}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item label="Profile Image" name="image_url" rules={[{ required: true }]}>
              <ImageUpload
                maxCount={1}
                multiple={false}
                defaultImages={
                  image_url
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: image_url,
                        },
                      ]
                    : []
                }
                uploadUrl={`${API_URL}/upload`}
                onUploadSuccess={(url) => form.setFieldValue("image_url", url)}
              />
            </Form.Item>
            <Form.Item name="first_name" label="First name" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your first name" />
            </Form.Item>
            <Form.Item name="last_name" label="Last name" rules={[{ required: true, message: "Please input your name" }]}>
              <Input placeholder="Input your last name" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email" }]}>
              <Input placeholder="Input your email" />
            </Form.Item>
            <Form.Item name="dateofbirth" label="Date of birth" rules={[{ required: true, message: "Please input your Date of birth" }]}>
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please input your gender" }]}>
              <Select placeholder="Select gender">
                <Select.Option value={1}>Male</Select.Option>
                <Select.Option value={0}>Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please input your category" }]}>
              <Select placeholder="Select category">
                <Select.Option value={1}>Cat 1</Select.Option>
                <Select.Option value={0}>Cat 2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="profession" label="Profession" rules={[{ required: true, message: "Please input your profession" }]}>
              <Input placeholder="Input your profession" />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <InputNumber className="w-full" placeholder="Input your family count" />
            </Form.Item>
            <Form.Item name="home_address" label="Home address" rules={[{ required: true, message: "Please input your address" }]}>
              <Input placeholder="Input your home address" />
            </Form.Item>
            <Form.Item name="bank" label="Bank" rules={[{ required: true, message: "Please input your address" }]}>
              <Select placeholder="Select bank">
                <Select.Option value={1}>Golomt Bank</Select.Option>
                <Select.Option value={2}>Khan Bank</Select.Option>
                <Select.Option value={3}>Xac Bank</Select.Option>
                <Select.Option value={4}>TDB Bank</Select.Option>
                <Select.Option value={5}>State Bank</Select.Option>
                <Select.Option value={6}>M Bank</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="bankaccount" label="Bank Account" rules={[{ required: true, message: "Please input your address" }]}>
              <InputNumber className="w-full" placeholder="Input your Bank account" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex items-center justify-end gap-4">
          {/* <Button shape="round" htmlType="reset">
            Reset
          </Button> */}
          <Button shape="round" type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserSetting;
