"use client";

import { Button, DatePicker, Form, Input } from "antd";

const CreateCampaignForm = () => {
  const [form] = Form.useForm();
  const platform = Form.useWatch("platform", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
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
      <Form.Item label="Goal, Purpose, Summary" name="summary" rules={[{ required: true }]}>
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
