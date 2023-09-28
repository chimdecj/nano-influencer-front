"use client";

import Icons from "@/components/common/Icons";
import { Avatar, Button, Form, Input } from "antd";

const CreateCampaignPick = () => {
  const [form] = Form.useForm();
  const platform = Form.useWatch("platform", form);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const users = [
    {
      image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      name: "John Doe",
      followerCount: "1.2k",
    },
    {
      image: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      name: "Jenny",
      followerCount: "13k",
    },
    {
      image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
      name: "Andy",
      followerCount: "2k",
    },
    {
      image: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png",
      name: "John",
      followerCount: "11.2k",
    },
    {
      image: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
      name: "Kenny",
      followerCount: "8.2k",
    },
  ];
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Input.Search placeholder="input search text" onSearch={() => {}} enterButton />
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user.name} className="dark:bg-gray-900 px-6 py-4 rounded-3xl flex items-center gap-4">
              <Avatar src={user.image} size={64} />
              <div>
                <div className="text-base text-gray-500">{user.name}</div>
                <div className="text-sm text-gray-500">Followers {user.followerCount}</div>
                <div className="grid gap-2">
                  <Button type="primary" shape="round">
                    View page
                  </Button>
                  <Button type="primary" shape="round">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="dark:bg-gray-900 dark:text-white px-6 py-4 rounded-3xl items-center gap-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base m-0">Selected influencers</h2>
            <Button type="text" size="small">
              Clear all
            </Button>
          </div>
          <div>
            <ul>
              {users.map((u) => (
                <li key={u.name} className="flex items-center justify-between">
                  {u.name}
                  <Icons.X size={18} color="#FF7875" className="cursor-pointer" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large">
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignPick;
