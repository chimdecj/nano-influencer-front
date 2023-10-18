"use client";

import { getCampaignById } from "@/api";
import { Campaign } from "@/libs/types";
import { DatePicker, Image, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const dateFormat = "YYYY-MM-DD";

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
          <DatePicker.RangePicker disabled defaultValue={[dayjs(data?.start_date_time, dateFormat), dayjs(data?.end_date_time, dateFormat)]} />
        </h2>
        <h2>Duration: {renderDuration([data?.start_date_time, data?.end_date_time])}</h2>
      </div>
    );
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Campaign detail",
      children: renderDetail(),
    },
    {
      key: "2",
      label: "Goal purpose",
      children: <div className="bg-[#333] py-5 px-4 text-gray-700 rounded-3xl">{data?.purpose}</div>,
    },
    {
      key: "3",
      label: "Wordings",
      children: <div className="bg-[#333] py-5 px-4 text-gray-700 rounded-3xl">{data?.wording}</div>,
    },
    {
      key: "4",
      label: "Photos",
      children: (
        <div className="flex gap-3 items-center">
          {data?.campaign_images.map((img, index) => {
            return <Image key={index} src={img.url} alt="" width={200} />;
          })}
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    getCampaignById({ campaign_id: id })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data: Campaign) => {
        setData(data);
      });
  }, [id]);

  return (
    <div>
      Campaign detail
      <Tabs items={items} />
    </div>
  );
}

export default CampaignDetail;
