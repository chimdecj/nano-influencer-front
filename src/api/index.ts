import { CampaignInput } from "@/libs/types";
import { getCookie } from "cookies-next";

export const API_URL = process.env.NEXT_PUBLIC_REST_API_URL;

// const token = getCookie("token");

export const signIn = async ({ username, password }: { username: string; password: string }) => {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch(API_URL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  return res.json();
};

export const getMeData = async () => {
  const res = await fetch(API_URL + `/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getInfluencerList = async ({ limit, skip }: { limit: number; skip: number }) => {
  const res = await fetch(API_URL + `/influencer/list?limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getCampaignList = async ({ org_id, limit, skip }: { org_id: number; limit: number; skip: number }) => {
  const res = await fetch(API_URL + `/campaigns?org_id=${org_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getActiveCampaignList = async ({ org_id, limit, skip }: { org_id: number; limit: number; skip: number }) => {
  const res = await fetch(API_URL + `/campaigns/active_sumbitted?org_id=${org_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getCampaignListByStatus = async ({ status, org_id, limit, skip }: { status: string; org_id: number; limit: number; skip: number }) => {
  const res = await fetch(API_URL + `/campaigns/status?status=${status}&org_id=${org_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
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
  const res = await fetch(API_URL + `/campaign/create?org_id=${org_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ status, type, platform_type, title, owner_id, created_date, start_date_time, end_date_time, purpose, wording, guidance }),
  });
  return res.json();
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
  const res = await fetch(API_URL + `/campaign/update?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ status, type, platform_type, title, owner_id, created_date, start_date_time, end_date_time, purpose, wording, guidance }),
  });
  return res.json();
};

export const updateCampaignInfluencer = async ({ campaign_id, influencer_ids }: { campaign_id: string; influencer_ids: (string | number)[] }) => {
  const res = await fetch(API_URL + `/campaign/update_influencer?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify(influencer_ids),
  });
  return res.json();
};

export const uploadImage = async ({ file }: { file: any }) => {
  const res = await fetch(API_URL + `/upload`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ file }),
  });
  return res.json();
};

export const uploadCampaignImage = async ({ campaign_id, file }: { campaign_id: string; file: any }) => {
  const res = await fetch(API_URL + `/campaign/upload_image?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ file }),
  });
  return res.json();
};

export const getCampaignById = async ({ campaign_id }: { campaign_id: string }) => {
  const res = await fetch(API_URL + `/campaign?campaign_id=${campaign_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const submitCampaign = async ({ campaign_id }: { campaign_id: string }) => {
  const res = await fetch(API_URL + `/campaign/submit?campaign_id=${campaign_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const influencerCampaigns = async ({ influencer_id }: { influencer_id: number }) => {
  const res = await fetch(API_URL + `/influencer/campaigns?influencer_id=${influencer_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const updateCompanyInfo = async ({
  org_id,
  name,
  industry,
  sub_industry,
  instagram_profile,
  facebook_profile,
  tiktok_profile,
  preffered_category,
  offce_address,
  phonenumber,
  email,
  image_url,
}: {
  org_id: string | number;
  name: string;
  industry: string;
  sub_industry: string;
  instagram_profile: string;
  facebook_profile: string;
  tiktok_profile: string;
  preffered_category: string;
  offce_address: string;
  phonenumber: string;
  email: string;
  image_url: string;
}) => {
  const res = await fetch(API_URL + `/organization?org_id=${org_id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ name, industry, sub_industry, instagram_profile, facebook_profile, tiktok_profile, preffered_category, offce_address, phonenumber, email, image_url }),
  });
  return res.json();
};

export const updateInfluencerInfo = async ({
  influencer_id,
  image_url,
  phonenumber,
  email,
  first_name,
  last_name,
  dateofbirth,
  gender,
  category,
  profession,
  work_position,
  work_name,
  work_address,
  family_count,
  home_address,
  bank,
  bankaccount,
}: {
  influencer_id: string | number;
  image_url: string;
  phonenumber: string;
  email: string;
  first_name: string;
  last_name: string;
  dateofbirth: string;
  gender: number;
  category: string;
  profession: string;
  work_position: string;
  work_name: string;
  work_address: string;
  family_count: string;
  home_address: string;
  bank: string;
  bankaccount: string;
}) => {
  const res = await fetch(API_URL + `/influencer?influencer_id=${influencer_id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      phonenumber,
      image_url,
      email,
      first_name,
      last_name,
      dateofbirth,
      gender,
      category,
      profession,
      work_position,
      work_name,
      work_address,
      family_count,
      home_address,
      bank,
      bankaccount,
    }),
  });
  return res.json();
};

export const getInfluencerById = async ({ influencer_id }: { influencer_id: string | number }) => {
  const res = await fetch(API_URL + `/influencer?inf_id=${influencer_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getUserById = async ({ id }: { id: string | number }) => {
  const res = await fetch(API_URL + `/user?id=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getCompanyById = async ({ id }: { id: string | number }) => {
  const res = await fetch(API_URL + `/organization?org_id=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const getCampaignStory = async ({ campaign_id, limit, skip }: { campaign_id: string; limit: number; skip: number }) => {
  const res = await fetch(API_URL + `/campaigns/stories?campaign_id=${campaign_id}&limit=${limit}&skip=${skip}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};

export const createCampaignStory = async ({
  campaign_id,
  inf_id,
  original_link,
  thumb_path,
  story_path,
}: {
  campaign_id: string;
  inf_id: number;
  original_link: string;
  thumb_path: string;
  story_path: string;
}) => {
  const res = await fetch(API_URL + `/story/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      campaign_id,
      inf_id,
      original_link,
      thumb_path,
      story_path,
    }),
  });
  return res.json();
};

export const createSocialAccounts = async ({
  inf_id,
  account_type,
  total_followers,
  account_profile,
  account_image,
  last_updated,
}: {
  inf_id: number;
  account_type: number;
  total_followers: number;
  account_profile: string;
  account_image: string;
  last_updated: string;
}) => {
  const res = await fetch(API_URL + `/social_accounts?inf_id=${inf_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      account_type,
      total_followers,
      account_profile,
      account_image,
      last_updated,
    }),
  });
  return res.json();
};

export const updateSocialAccount = async ({
  account_id,
  account_type,
  total_followers,
  account_profile,
  account_image,
  last_updated,
}: {
  account_id: number;
  account_type: number;
  total_followers: number;
  account_profile: string;
  account_image: string;
  last_updated: string;
}) => {
  const res = await fetch(API_URL + `/social_accounts?account_id=${account_id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      account_type,
      total_followers,
      account_profile,
      account_image,
      last_updated,
    }),
  });
  return res.json();
};

export const getInfluencerSocialAccounts = async ({ inf_id }: { inf_id: number }) => {
  const res = await fetch(API_URL + `/social_accounts?inf_id=${inf_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};
