"use client";

import { getCampaignById } from "@/api";
import { getPlatformName } from "@/components/campaign/detail";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Tabs, Image, DatePicker } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const dateFormat = "YYYY-MM-DD";

// export const getPlanType = (type: number) => {
//   switch (type) {
//     case 1:
//       return "Easy Awareness";
//     case 2:
//       return "Product Seed";
//     case 3:
//       return "Mass story, launch event or product";
//     case 4:
//       return "Mass story, launch event or product";

//     default:
//       break;
//   }
// };

function CampaignDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params["id"];

  const [userBasic, setUserBasic] = useState<UserBasic>();
  const [data, setData] = useState<Campaign>();
  useEffect(() => {
    const userBasic = getUserBasic();
    setUserBasic(userBasic);
  }, []);

  useEffect(() => {
    if (id) {
      getCampaignById({
        campaign_id: id,
      }).then((res) => {
        setData(res);
      });
    }
  }, [userBasic, id]);

  const items = [
    {
      label: "Campaign detail",
      key: "1",
      children: (
        <div className="space-y-3">
          <div>
            <div className="font-semibold">Campaign name</div>
            <div>{data?.title}</div>
          </div>
          {/* <div>
            <div className="font-semibold">Plan type </div>
            <div>{getPlanType(data?.type)}</div>
            <div>{data?.type}</div>
          </div> */}
          <div>
            <div className="font-semibold">Platform </div>
            <div>{getPlatformName(data?.platform_type)}</div>
          </div>
          <div>
            <div className="font-semibold">Start date </div>
            <div>
              {data?.start_date_time && data?.end_date_time && (
                <DatePicker.RangePicker disabled defaultValue={[dayjs(data?.start_date_time, dateFormat), dayjs(data?.end_date_time, dateFormat)]} />
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold">Goal purpose</div>
            <div>{data?.purpose}</div>
          </div>
        </div>
      ),
    },
    {
      label: "Visuals",
      key: "2",
      children: (
        <div className="space-y-2">
          <div>
            <div className="font-semibold">Wordings</div>
            <div>{data?.wording}</div>
          </div>
          <div>
            <div className="font-semibold">Photos</div>
            <div className="grid grid-cols-5">
              {data?.campaign_images.map((img, key) => (
                <div key={key} className="w-52">
                  <Image src={img.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Stories",
      key: "3",
      children: (
        <div className="space-y-2">
          <div>
            <div className="font-semibold">Posted Stories</div>
            <div>{data?.wording}</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>Campaign</div>
      <div>
        <Tabs items={items} />
      </div>
    </div>
  );
}
export default CampaignDetail;
