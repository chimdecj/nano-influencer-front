import { CampaignInput } from "@/libs/types";

export const API_URL = process.env.NEXT_PUBLIC_REST_API_URL;

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

export const getCampaignListByStatus = async ({ status, org_id, limit, skip }: { status: string; org_id: number; limit: number; skip: number }) => {
  return await fetch(API_URL + `/campaigns/status?status=${status}&org_id=${org_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const createCampaign = async ({
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

export const updateCampaign = async ({
  campaign_id,
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
  return await fetch(API_URL + `/campaign/update?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status, type, platform_type, title, owner_id, created_date, start_date_time, end_date_time, purpose, wording, guidance }),
  });
};

export const updateCampaignInfluencer = async ({ campaign_id, influencer_ids }: { campaign_id: string; influencer_ids: (string | number)[] }) => {
  return await fetch(API_URL + `/campaign/update_influencer?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(influencer_ids),
  });
};

export const uploadImage = async ({ file }: { file: any }) => {
  return await fetch(API_URL + `/upload`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ file }),
  });
};

export const uploadCampaignImage = async ({ campaign_id, file }: { campaign_id: string; file: any }) => {
  return await fetch(API_URL + `/campaign/upload_image?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ file }),
  });
};

export const getCampaignById = async ({ campaign_id }: { campaign_id: string }) => {
  const res = await fetch(API_URL + `/campaign?campaign_id=${campaign_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return res.json();
};

export const submitCampaign = async ({ campaign_id }: { campaign_id: string }) => {
  return await fetch(API_URL + `/campaign/submit?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const influencerCampaigns = async ({ influencer_id }: { influencer_id: number }) => {
  return await fetch(API_URL + `/influencer/campaigns?influencer_id=${influencer_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};
