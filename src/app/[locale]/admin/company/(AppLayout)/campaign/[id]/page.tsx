"use client";

import { getCampaignById } from "@/api";
import { getUserBasic } from "@/libs/common";
import { Campaign, UserBasic } from "@/libs/types";
import { Tabs, Image } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
        console.log("res");
        console.log(res);
        setData(res);
      });
    }
  }, [userBasic, id]);

  const items = [
    {
      label: "Campaign detail",
      key: "1",
      children: (
        <div className="space-y-2">
          <div>
            <div className="font-semibold">Campaign name</div>
            <div>{data?.title}</div>
          </div>
          <div>
            <div className="font-semibold">Campaign type </div>
            <div>{data?.type}</div>
          </div>
          <div>
            <div className="font-semibold">Start date </div>
            <div>{data?.start_date_time}</div>
          </div>
          <div>
            <div className="font-semibold">End date </div>
            <div>{data?.end_date_time}</div>
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
