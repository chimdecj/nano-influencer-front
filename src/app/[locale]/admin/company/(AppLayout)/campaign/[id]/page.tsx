"use client";

import { getCampaignById, getCampaignStory, getInfluencerById } from "@/api";
import { getPlatformName } from "@/components/campaign/detail";
import SmallCard from "@/components/campaign/detail/small-card";
import Icons from "@/components/common/Icons";
import { getUserBasic } from "@/libs/common";
import { Campaign, Story, User, UserBasic } from "@/libs/types";
import { Tabs, Image, DatePicker, Modal, Avatar, Button } from "antd";
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
          <SmallCard title="Campaign name" label={data?.title} />
          {/* <div>
            <div className="font-semibold">Plan type </div>
            <div>{getPlanType(data?.type)}</div>
            <div>{data?.type}</div>
          </div> */}
          <div className="grid md:grid-cols-2 gap-3 items-start">
            <div className="grid gap-3 items-start">
              <SmallCard title="Platform" label={getPlatformName(data?.platform_type)} />
              <div className="grid grid-cols-2 gap-3">
                <SmallCard title="Start date" label={data?.start_date_time} />
                <SmallCard title="End date" label={data?.end_date_time} />
              </div>
            </div>
            <div>
              <SmallCard title="Goal purpose" label={<span className="">{data?.purpose}</span>} />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Visuals",
      key: "2",
      children: (
        <div className="space-y-3">
          <SmallCard title="Guidance and explanation" label={data?.guidance} />
          <SmallCard title="Wordings" label={data?.wording} />
          <div>
            <div className="text-xl font-medium text-gray-950 dark:text-gray-500 mb-2">Photos</div>
            <div className="grid md:grid-cols-5">
              {data?.campaign_images.map((img, key) => (
                <div key={key} className="w-52 !rounded-xl overflow-hidden">
                  <Image src={img.url} alt="" className="!w-full !h-full" />
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
            <div className="text-xl font-medium text-gray-950 dark:text-gray-500 mb-2">Posted Stories</div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {storyData?.map((story, index) => (
                <div
                  key={index}
                  className="group cursor-pointer group-hover:text-primary-600 relative overflow-hidden bg-cover bg-no-repeat rounded-2xl"
                  onClick={() => {
                    setSelectedStory(story);
                    handleModal();
                  }}
                >
                  {/* <div className="text-sm">Story {index + 1}</div> */}
                  <div className="">
                    <Image
                      src={story.thumb_path}
                      alt={story.original_link}
                      className="!h-full group-hover:opacity-100 transition duration-300 ease-in-out group-hover:scale-110"
                      preview={false}
                    />
                    <div className="absolute top-2/4 left-1/3 z-10 invisible group-hover:visible">
                      <Button shape="round" type="primary">
                        Detail
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gray-950 bg-fixed opacity-0 transition duration-300 ease-in-out group-hover:opacity-50"></div>
                  </div>
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
      <div className="text-2xl font-semibold text-gray-950 dark:text-white">Campaign</div>
      <div>
        <Tabs items={items} />
      </div>
      <Modal title="Submitted story" width={700} open={modal} onCancel={handleModal} footer={null}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <div className="font-semibold">Story image:</div>
              <div className="rounded-2xl overflow-hidden h-96">
                <Image src={selectedStory?.thumb_path} alt="thumb" className="w-full" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="font-semibold">Posted Influencer:</div>
              <div className="flex gap-2 items-center">
                <Avatar src={selectedStoryInfluencer?.image_url} size={32} />
                <span className="font-medium">{selectedStoryInfluencer?.first_name + " " + selectedStoryInfluencer?.last_name}</span>
              </div>
            </div>
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
