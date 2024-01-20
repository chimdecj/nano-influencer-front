"use client";

import { getCampaignById, getCampaignStory, getInfluencerById } from "@/api";
import { getPlatformName } from "@/components/campaign/detail";
import Icons from "@/components/common/Icons";
import { getUserBasic } from "@/libs/common";
import { Campaign, Story, User, UserBasic } from "@/libs/types";
import { Tabs, Image, DatePicker, Modal, Avatar } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
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
  const [modal, setModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story>();
  const [selectedStoryInfluencer, setSelectedStoryInfluencer] = useState<User>();

  const [userBasic, setUserBasic] = useState<UserBasic>();
  const [data, setData] = useState<Campaign>();
  const [storyData, setStoryData] = useState<Story[]>();

  const handleModal = () => {
    setModal(!modal);
  };

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

      getCampaignStory({
        campaign_id: id,
        limit: 100,
        skip: 0,
      }).then((res) => {
        setStoryData(res);
      });
    }
  }, [userBasic, id]);

  useEffect(() => {
    getInfluencerById({
      influencer_id: selectedStory?.inf_id as number,
    }).then((res) => {
      setSelectedStoryInfluencer(res);
    });
  }, [selectedStory]);

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
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {storyData?.map((story, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:text-primary-600 space-y-2"
                  onClick={() => {
                    setSelectedStory(story);
                    handleModal();
                  }}
                >
                  <div className="text-sm">Story {index + 1}</div>
                  <Image src={story.thumb_path} alt={story.original_link} className="!rounded-md" preview={false} />
                </div>
              ))}
            </div>
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
      <Modal title="Submitted story" width={700} open={modal} onCancel={handleModal} footer={null}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <div className="font-semibold">Posted Influencer:</div>
              <div className="flex gap-2 items-center">
                <Avatar src={selectedStoryInfluencer?.image_url} size={32} />
                <span className="font-medium">{selectedStoryInfluencer?.first_name + " " + selectedStoryInfluencer?.last_name}</span>
              </div>
            </div>

            <div>
              <div className="font-semibold">Story image:</div>
              <Image src={selectedStory?.thumb_path} alt="thumb" className="w-full" />
            </div>
          </div>
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
