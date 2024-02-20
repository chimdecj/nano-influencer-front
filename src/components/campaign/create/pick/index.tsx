"use client";

import { getCampaignById, getInfluencerList, updateCampaignInfluencer } from "@/api";
import Icons from "@/components/common/Icons";
import InfluencerProfile, { getSocialAccountIconByType } from "@/components/influencer/profile";
import { Campaign, User } from "@/libs/types";
import { Avatar, Button, Empty, Form, Input, Modal, Spin, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCampaignPick = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<boolean>();
  const [user, setUser] = useState<User>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const id = searchParams.get("id") as string;

  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const platform = Form.useWatch("platform", form);

  const getInfluencerData = () => {
    try {
      setLoading(true);
      getInfluencerList({
        skip: 0,
        limit: 100,
      }).then((data: User[]) => {
        setLoading(false);
        setUserData(data);
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Data fetch error",
      });
    }
  };

  const addUser = (user: User) => {
    if (selectedUsers.filter((u) => u.email === user.email).length === 0) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user: User) => {
    setSelectedUsers([...selectedUsers.filter((u) => u.email !== user.email)]);
  };

  const clearUser = () => {
    setSelectedUsers([]);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const onFinish = () => {
    setSubmitLoading(true);
    updateCampaignInfluencer({
      campaign_id: id,
      influencer_ids: selectedUsers.map((item) => item.id),
    }).then((data) => {
      setSubmitLoading(false);
      router.push(`/admin/company/create/campaign/submit?id=${id}`);
    });
  };

  useEffect(() => {
    getInfluencerData();
    if (id) {
      getCampaignById({
        campaign_id: id,
      }).then((data: Campaign) => {
        setSelectedUsers(data.associated_influencers);
      });
    }
  }, [id]);

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Input.Search placeholder="Search influencer name" onSearch={() => {}} enterButton />
        <div className="grid md:grid-cols-3 gap-4 my-4">
          {loading ? (
            <div className="col-span-2 text-center">
              <Spin />
            </div>
          ) : (
            <div className="col-span-2 grid md:grid-cols-2 gap-4">
              {userData.map((user, id) => (
                <div key={id} className="bg-white dark:bg-gray-900 px-6 py-4 rounded-3xl flex items-start gap-4 text-gray-950 dark:text-gray-500">
                  <div className="w-16 h-16">
                    <Avatar src={user.image_url} size={64} />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="text-base font-semibold">{user.first_name + " " + user.last_name}</div>
                    <div className="text-sm">
                      <div>Followers: </div>
                      <div>
                        {user.socialAccounts.map((s, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <span>{getSocialAccountIconByType(s.account_type)}</span> <span>{s.total_followers}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Button
                        type="primary"
                        shape="round"
                        size="small"
                        onClick={() => {
                          setUser(user);
                          handleModal();
                        }}
                      >
                        View profile
                      </Button>
                      <Button size="small" type="primary" shape="round" onClick={() => addUser(user)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="bg-white dark:bg-gray-900 dark:text-white px-6 py-4 rounded-3xl items-center gap-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base m-0">Selected influencers</h2>
              <Button type="text" size="small" onClick={clearUser}>
                Clear all
              </Button>
            </div>
            <div>
              <ul className="space-y-2">
                {selectedUsers.length === 0 ? (
                  <div>
                    <Empty description="No influencers selected" />
                  </div>
                ) : (
                  selectedUsers.map((user, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="w-8 h-8">
                          <Avatar src={user.image_url} size={32} />
                        </div>
                        {user.first_name + " " + user.last_name}
                      </div>
                      <Icons.X size={18} color="#FF7875" className="cursor-pointer" onClick={() => removeUser(user)} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-right">
          <Button type="primary" htmlType="submit" shape="round" size="large" loading={submitLoading} disabled={selectedUsers.length <= 0}>
            Continue
          </Button>
        </div>
      </Form>
      <Modal title="Influencer profile" open={modal} onCancel={handleModal} footer={null}>
        {user && <InfluencerProfile user={user} />}
      </Modal>
    </div>
  );
};

export default CreateCampaignPick;
