"use client";

import { API_URL, createCampaign, getCampaignById, updateCampaign } from "@/api";
import ImageUpload from "@/components/common/ImageUpload";
import { Campaign } from "@/libs/types";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCampaignForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const date = Form.useWatch("date", form);
  const [submitLoading, setSubmitLoading] = useState(false);
  const campaign_images = Form.useWatch("campaign_images", form);

  const onFinish = (values: any) => {
    setSubmitLoading(true);
    let params = {
      owner_id: 2,
      status: 0,
      type: 0,
      platform_type: 0,
      title: values.title,
      created_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      start_date_time: values.date[0],
      end_date_time: values.date[1],
      purpose: values.purpose,
      wording: values.wording,
      guidance: values.guidance,
    };
    if (id) {
      updateCampaign({
        campaign_id: id,
        ...params,
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          setSubmitLoading(false);
          router.push(id ? `/admin/company/create/campaign/pick?id=${id}` : "/admin/company/create/campaign/pick");
        });
    } else {
      createCampaign({
        org_id: 1,
        ...params,
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          setSubmitLoading(false);
          router.push(id ? `/admin/company/create/campaign/pick?id=${id}` : "/admin/company/create/campaign/pick");
        });
    }
  };

  const getData = () => {
    getCampaignById({
      campaign_id: id as string,
    })
      .then((res) => {
        return res.json();
      })
      .then((data: Campaign) => {
        form.setFieldsValue({
          title: data.title,
          date: [dayjs(data.start_date_time, "YYYY-MM-DD"), dayjs(data.end_date_time, "YYYY-MM-DD")],
          purpose: data.purpose,
          wording: data.wording,
          guidance: data.guidance,
          campaign_images: data.campaign_images.map((item, index) => ({
            uid: index,
            name: "image.png",
            status: "done",
            url: item.url,
          })),
        });
      });
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const renderDuration = () => {
    if (date?.length) {
      const Difference_In_Time = new Date(date[1]).getTime() - new Date(date[0]).getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return <span>{Difference_In_Days} days</span>;
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Name" name="title" rules={[{ required: true }]}>
        <Input placeholder="Write your campaign name" />
      </Form.Item>
      <Form.Item label="Campaign duration" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
        <Form.Item name="date" rules={[{ required: true }]} style={{ display: "inline-block", width: "calc(70% - 8px)" }}>
          <DatePicker.RangePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="duration" rules={[{ required: false }]} style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}>
          Duration: {renderDuration()}
        </Form.Item>
      </Form.Item>
      <Form.Item label="Goal, Purpose, Summary" name="purpose" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Describe what is your campaign about" />
      </Form.Item>
      <Form.Item label="Visuals" name="campaign_images" rules={[{ required: false }]}>
        <ImageUpload defaultImages={campaign_images} uploadUrl={`${API_URL}/campaign/upload_image?campaign_id=${id}`} />
      </Form.Item>
      <Form.Item label="Wording" name="wording" rules={[{ required: true }]}>
        <Input.TextArea placeholder="What is your wording" />
      </Form.Item>
      <Form.Item label="Guidance and explanation" name="guidance" rules={[{ required: true }]}>
        <Input.TextArea placeholder="What is your wording" />
      </Form.Item>
      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large" loading={submitLoading}>
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignForm;
