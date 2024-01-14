"use client";

import { API_URL, createCampaignStory, getCampaignById } from "@/api";
import ImageUpload from "@/components/common/ImageUpload";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Button, DatePicker, Empty, Form, Image, Input, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import weekday from "dayjs/plugin/weekday";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const getPlatformName = (type: any) => {
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
  const [loading, setLoading] = useState(false);
  const [userBasic, setUserBasic] = useState<UserBasic>();
  const [form] = Form.useForm();

  const dateFormat = "YYYY-MM-DD";

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
    return (
      <div className="space-y-4">
        <h2>
          <b>Campaign name:</b>
          <br />
          {data?.title}
        </h2>
        <h2>
          <b>Platform:</b>
          <br />
          {getPlatformName(data?.platform_type)}
        </h2>
        <h2>
          <b>Start end date:</b> <br />
          {data?.start_date_time && data?.end_date_time && (
            <DatePicker.RangePicker disabled defaultValue={[dayjs(data?.start_date_time, dateFormat), dayjs(data?.end_date_time, dateFormat)]} />
          )}
        </h2>
        <h2>Duration: {renderDuration([data?.start_date_time, data?.end_date_time])}</h2>
        <h2>
          Goal purpose: <br />
          {data?.purpose}
        </h2>
        {/* <div className="bg-[#333] py-5 px-4 text-gray-700 rounded-3xl">{data?.purpose}</div> */}
      </div>
    );
  };

  const onFinish = (values: any) => {
    console.log("values");
    console.log(values);
    // if (userBasic) {
    //   createCampaignStory({
    //     campaign_id: id,
    //     inf_id: userBasic.inf_id,
    //     original_link: values.original_link,
    //     story_path: values.story_path,
    //     thumb_path: values.thumb_path,
    //   });
    // }
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
        <div>
          <h2>
            <b>Wording:</b>
          </h2>
          <div className="bg-[#333] py-5 px-4 text-gray-700 rounded-3xl">{data?.wording}</div>
          <h2>
            <b>Photos:</b>
          </h2>
          <div className="flex gap-3 items-center">
            {data?.campaign_images.map((img, index) => {
              return <Image key={index} src={img.url} alt="" width={200} />;
            })}
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Submit",
      children: (
        <div className="grid md:grid-cols-2 gap-2">
          <div className="space-y-2">
            Submit story
            <div className="">
              <span className="text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              </span>
            </div>
            <Form layout="vertical" requiredMark="optional" onFinish={onFinish} form={form}>
              <Form.Item name="original_link" label="Story link" rules={[{ required: true, message: "Please input your name" }]}>
                <Input placeholder="Input story link" />
              </Form.Item>
              <div className="grid grid-cols-2">
                <Form.Item label="Story screen shot" name="thumb_path" rules={[{ required: false }]}>
                  <ImageUpload
                    defaultImages={[]}
                    uploadUrl={`${API_URL}/upload`}
                    onUploadSuccess={(url) => {
                      console.log("url");
                      console.log(url);
                      form.setFieldValue("thumb_path", url);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Story video" name="story_path" rules={[{ required: false }]}>
                  <ImageUpload defaultImages={[]} uploadUrl={`${API_URL}/video_upload`} onUploadSuccess={(url) => form.setFieldValue("story_path", url)} />
                </Form.Item>
              </div>
              <div>
                <Button shape="round" type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <div>
            Submitted story
            <div></div>
            <Empty />
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
    }
  }, [id]);

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <h2>Campaign detail</h2>
        <div>
          <Button type="primary">Add story</Button>
        </div>
      </div>
      <Tabs items={items} />
    </div>
  );
}

export default CampaignDetail;
