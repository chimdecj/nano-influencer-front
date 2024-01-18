"use client";

import { API_URL, createSocialAccounts, getInfluencerById, getInfluencerSocialAccounts, updateInfluencerInfo } from "@/api";
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
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
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
      getInfluencerSocialAccounts({
        inf_id: userBasic.inf_id,
      }).then((data) => {
        form2.setFieldsValue({
          ...data,
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

  const handleFinishSocial = (values: any) => {
    if (userBasic) {
      setLoadingSocial(true);
      createSocialAccounts({
        ...values,
        inf_id: userBasic.inf_id,
        last_updated: moment(new Date()).format("YYYY-MM-DDTh:mm:ssZ"),
      }).then((data) => {
        setLoadingSocial(false);
        if (data?.detail) {
          notification.error({
            message: data?.detail,
          });
        } else {
          notification.success({
            message: "Successfully saved",
          });
        }
      });
    }
  };

  return (
    <div>
      <Form form={form} labelCol={{ span: 5 }} layout="vertical" requiredMark="optional" onFinish={onFinish}>
        <Row gutter={[20, 5]}>
          <Col span={24}>
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
          </Col>
          <Col span={12}>
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
          <Button shape="round" type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
      <div>
        <Form form={form2} layout="vertical" requiredMark="optional" onFinish={handleFinishSocial}>
          <Col span={12}>
            <h2 className="font-semibold">Social accounts: </h2>
            <div className="p-10 rounded-xl bg-slate-100 dark:bg-gray-900">
              <Form.Item name="account_type" label="Platform" rules={[{ required: true, message: "Please select platform" }]}>
                <Select
                  placeholder="Select platform"
                  options={[
                    { value: 0, label: "Instagram" },
                    { value: 1, label: "Facebook", disabled: true },
                    { value: 2, label: "Tiktok", disabled: true },
                  ]}
                />
              </Form.Item>
              <Form.Item name="account_profile" label="Username" rules={[{ required: true, message: "Please input username" }]}>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item name="total_followers" label="Total followers" rules={[{ required: true, message: "Please input follower count" }]}>
                <InputNumber placeholder="Followers count" className="w-full" />
              </Form.Item>
              <Form.Item name="account_image" label="Image" rules={[{ required: true, message: "Please input image" }]}>
                <ImageUpload
                  defaultImages={[]}
                  maxCount={1}
                  multiple={false}
                  uploadUrl={`${API_URL}/upload`}
                  onUploadSuccess={(url) => form2.setFieldValue("account_image", url)}
                />
              </Form.Item>
              <div className="flex justify-end">
                <Button type="primary" shape="default" htmlType="submit" loading={loadingSocial}>
                  Save
                </Button>
              </div>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}

export default UserSetting;
