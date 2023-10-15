"use client";

import { getCampaignById, getInfluencerList, updateCampaignInfluencer } from "@/api";
import Icons from "@/components/common/Icons";
import { Campaign, User } from "@/libs/types";
import { Avatar, Button, Empty, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCampaignPick = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const id = searchParams.get("id") as string;

  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const platform = Form.useWatch("platform", form);

  const getInfluencerData = () => {
    getInfluencerList({
      skip: 0,
      limit: 100,
    })
      .then((res) => {
        return res.json();
      })
      .then((data: User[]) => {
        setUserData(data);
      });
  };

  const addUser = (user: User) => {
    if (selectedUsers.filter((u) => u.email === user.email).length === 0) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user: User) => {
    setSelectedUsers([...selectedUsers.filter((u) => u.email !== user.email)]);
  };

  const onFinish = () => {
    setSubmitLoading(true);
    updateCampaignInfluencer({
      campaign_id: id,
      influencer_ids: selectedUsers.map((item) => item.id),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSubmitLoading(false);
        router.push(`/admin/company/create/campaign/submit?id=${id}`);
      });
  };

  useEffect(() => {
    getInfluencerData();
    if (id) {
      getCampaignById({
        campaign_id: id,
      })
        .then((res) => {
          return res.json();
        })
        .then((data: Campaign) => {
          setSelectedUsers(data.associated_influencers);
        });
    }
  }, [id]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Input.Search placeholder="input search text" onSearch={() => {}} enterButton />
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {userData.map((user, id) => (
            <div key={id} className="dark:bg-gray-900 px-6 py-4 rounded-3xl flex items-center gap-4">
              <Avatar src={"https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png"} size={64} />
              <div>
                <div className="text-base text-gray-500">{user.first_name + " " + user.last_name}</div>
                <div className="text-sm text-gray-500">Followers 10</div>
                <div className="grid gap-2">
                  <Button type="primary" shape="round">
                    View page
                  </Button>
                  <Button type="primary" shape="round" onClick={() => addUser(user)}>
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
              {selectedUsers.length === 0 ? (
                <div>
                  <Empty description="No influencers selected" />
                </div>
              ) : (
                selectedUsers.map((user, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {user.first_name + " " + user.last_name}
                    <Icons.X size={18} color="#FF7875" className="cursor-pointer" onClick={() => removeUser(user)} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large" loading={submitLoading}>
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateCampaignPick;
