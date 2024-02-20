"use client";

import { getCampaignStatusTag } from "../list";
import SmallCard from "./small-card";
import { API_URL, createCampaignStory, getCampaignById, getCampaignStory } from "@/api";
import Icons from "@/components/common/Icons";
import ImageUpload from "@/components/common/ImageUpload";
import { getUserBasic } from "@/libs/common";
import { Campaign, Story, UserBasic } from "@/libs/types";
import { Avatar, Button, Empty, Form, Image, Input, List, Modal, Spin, Tabs, TabsProps, notification } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import weekday from "dayjs/plugin/weekday";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export const getPlatformName = (type: any) => {
  switch (type) {
    case 0:
      return "Instagram";
    case 1:
      return "Facebook";
    default:
      break;
  }
};

function CampaignDetail({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Campaign>();
  const [modal, setModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story>();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userBasic, setUserBasic] = useState<UserBasic>();
  const [form] = Form.useForm();
  const [storyList, setStoryList] = useState<Story[]>([]);

  useEffect(() => {
    const userBasic = getUserBasic();
    setUserBasic(userBasic);
  }, []);

  const renderDuration = (date: any[]) => {
    if (date?.length) {
      const Difference_In_Time = new Date(date[1]).getTime() - new Date(date[0]).getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return <span>{Difference_In_Days} days</span>;
    }
  };

  const renderDetail = () => {
    if (loading)
      return (
        <div className="text-center">
          <Spin />
        </div>
      );

    return (
      <div className="space-y-3">
        <SmallCard title="Campaign name" label={data?.title} />
        <SmallCard title="Platform" label={getPlatformName(data?.platform_type)} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <SmallCard title="Start date" label={data?.start_date_time} />
          <SmallCard title="End date" label={data?.end_date_time} />
          <SmallCard title="Duration" label={renderDuration([data?.start_date_time, data?.end_date_time])} />
        </div>
        <SmallCard title="Goal purpose" label={<span className="text-base">{data?.purpose}</span>} />
      </div>
    );
  };

  const getStories = () => {
    getCampaignStory({
      campaign_id: id,
      limit: 1000,
      skip: 0,
    }).then((res) => {
      setStoryList(res);
    });
  };

  const onFinish = (values: any) => {
    if (userBasic) {
      setSubmitLoading(true);
      createCampaignStory({
        campaign_id: id,
        inf_id: userBasic.inf_id,
        ...values,
      })
        .then((res) => {
          setSubmitLoading(false);
          getStories();
          if (res.detail) {
            notification.info({
              message: res.detail,
            });
          }
        })
        .catch((err) => {
          console.log("err");
          console.log(err);
          notification.error({
            message: "Error",
          });
        });
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Campaign detail",
      children: renderDetail(),
    },
    {
      key: "3",
      label: "Visuals",
      children: (
        <div className="space-y-2">
          <SmallCard title="Wording" label={data?.wording} />
          <div>
            <div className="text-xl font-medium text-gray-950 dark:text-gray-500 mb-2">Photos</div>
            <div className="flex gap-3 items-center">
              {data?.campaign_images.map((img, index) => {
                return <Image key={index} src={img.url} alt="" width={200} className="rounded-2xl" />;
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Submit story",
      // disabled: data?.status !== 2,
      children: (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            Submit story
            <div className="">
              <span className="text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s
              </span>
            </div>
            <Form layout="vertical" requiredMark="optional" onFinish={onFinish} form={form}>
              <Form.Item name="original_link" label="Story link" rules={[{ required: true, message: "Please input your name" }]}>
                <Input placeholder="https://www.instagram.com/stories/intelliums/3280838621061878587?utm_source=ig_story_item_share&igsh=MTlnZmR6aTNpMGMyNQ==" />
              </Form.Item>
              <div className="grid grid-cols-2">
                <Form.Item label="Story screen shot" name="thumb_path" rules={[{ required: true }]}>
                  <ImageUpload
                    aspect={1 / 2}
                    maxCount={1}
                    multiple={false}
                    defaultImages={[]}
                    uploadUrl={`${API_URL}/upload`}
                    onUploadSuccess={(url) => form.setFieldValue("thumb_path", url)}
                  />
                </Form.Item>
                <Form.Item label="Story video" name="story_path" rules={[{ required: false }]}>
                  <ImageUpload maxCount={1} defaultImages={[]} uploadUrl={`${API_URL}/video_upload`} onUploadSuccess={(url) => form.setFieldValue("story_path", url)} />
                </Form.Item>
              </div>
              <div>
                <Button shape="round" type="primary" htmlType="submit" loading={submitLoading}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <div>
            <h2>Submitted story</h2>
            <div>
              {loading ? (
                <div className="text-center">
                  <Spin />
                </div>
              ) : storyList.length > 0 ? (
                <div className="space-y-4">
                  <List
                    itemLayout="horizontal"
                    dataSource={storyList}
                    renderItem={(story, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={story.thumb_path} />}
                          title={
                            <div
                              onClick={() => {
                                setSelectedStory(story);
                                handleModal();
                              }}
                              className="cursor-pointer hover:text-primary-600"
                            >
                              Story {index + 1}
                            </div>
                          }
                          description={
                            <div>
                              Url:{" "}
                              <Link target="_blank" href={story.original_link}>
                                {story.original_link}
                              </Link>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCampaignById({ campaign_id: id }).then((res: Campaign) => {
        setLoading(false);
        setData(res);
      });
      getStories();
    }
  }, [id]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="font-semibold text-2xl">Campaign</div>
        <div>{getCampaignStatusTag(data?.status as number)}</div>
      </div>
      <Tabs items={items} />
      <Modal title="Submitted story" width={650} open={modal} onCancel={handleModal}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {selectedStory?.original_link && (
              <div>
                <div className="font-semibold">Story link:</div>
                <Link target="_blank" href={selectedStory?.original_link} className="flex gap-2 line-clamp-1">
                  <span className="flex items-center">
                    <Icons.Link size={12} />
                  </span>
                  {selectedStory?.original_link}
                </Link>
              </div>
            )}

            <div>
              <div className="font-semibold">Story image:</div>
              <Image src={selectedStory?.thumb_path} alt="thumb" className="w-full" />
              {}
            </div>
          </div>
          <div className="space-y-2">
            {/* <div>
              <div className="font-semibold">Created date:</div>
              {selectedStory?.created_date}
            </div> */}
            {selectedStory?.story_path && (
              <div>
                <div className="font-semibold">Story video:</div>
                <video width="400" controls>
                  <source src={selectedStory?.story_path} />
                </video>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CampaignDetail;
