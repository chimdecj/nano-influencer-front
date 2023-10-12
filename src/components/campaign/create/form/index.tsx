"use client";

import { crateCampaign } from "@/api";
import { Button, DatePicker, Form, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";

const CreateCampaignForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const platform = Form.useWatch("platform", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    crateCampaign({
      org_id: 1,
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
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        router.push("/admin/company/create/campaign/pick");
      });
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
        <Form.Item name="duration" rules={[{ required: true }]} style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}>
          <Input placeholder="Duration" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Goal, Purpose, Summary" name="purpose" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Describe what is your campaign about" />
      </Form.Item>
      <Form.Item label="Visuals" name="photos" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Describe what is your campaign about" />
      </Form.Item>
      <Form.Item label="Wording" name="wording" rules={[{ required: true }]}>
        <Input.TextArea placeholder="What is your wording" />
      </Form.Item>
      <Form.Item label="Guidance and explanation" name="guidance" rules={[{ required: true }]}>
        <Input.TextArea placeholder="What is your wording" />
      </Form.Item>
      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large">
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignForm;
