import { CampaignInput } from "@/libs/types";

const API_URL = process.env.NEXT_PUBLIC_REST_API_URL;

export const getInfluencerList = async ({ limit, skip }: { limit: number; skip: number }) => {
  return await fetch(API_URL + `/influencer/list?limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const getCampaignList = async ({ org_id, limit, skip }: { org_id: number; limit: number; skip: number }) => {
  return await fetch(API_URL + `/campaigns?org_id=${org_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const crateCampaign = async ({
  org_id,
  status,
  type,
  platform_type,
  title,
  owner_id,
  created_date,
  start_date_time,
  end_date_time,
  purpose,
  wording,
  guidance,
}: CampaignInput) => {
  return await fetch(API_URL + `/campaign/create?org_id=${org_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status, type, platform_type, title, owner_id, created_date, start_date_time, end_date_time, purpose, wording, guidance }),
  });
};
