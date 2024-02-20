export interface SocialAccount {
  account_image: string;
  account_profile: string;
  account_type: number;
  id: number;
  inf_id: number;
  last_updated: string;
  total_followers: number;
}

export interface User {
  id: string | number;
  username: string;
  bank: string;
  bankaccount: string;
  category: string;
  dateofbirth: string;
  email: string;
  family_count: string;
  first_name: string;
  gender: number;
  home_address: string;
  last_name: string;
  phonenumber: string;
  profession: string;
  socialAccounts: SocialAccount[];
  work_address: string;
  work_name: string;
  work_position: string;
  user_type: number;
  image_url: string;
}

export interface Company {
  name: string;
  industry: string;
  sub_industry: string;
  instagram_profile: string;
  facebook_profile: string;
  tiktok_profile: string;
  preffered_category: string;
  offce_address: string;
  phonenumber: number;
  email: string;
  id: number;
  image_url: string;
}

export interface UserBasic {
  id: number;
  inf_id: number;
  org_id: number;
  user_status: number; // 0 - uncompleted 1 - done
  user_type: number;
  username: string;
}

export interface Campaign {
  status: number;
  type: number;
  platform_type: number;
  title: string;
  start_date_time: string;
  end_date_time: string;
  created_date: string;
  updated_date: string;
  purpose: string;
  wording: string;
  guidance: string;
  owner_id: number;
  id: string | number;
  org_id: number;
  associated_influencers: User[];
  campaign_images: {
    id: number;
    url: string;
  }[];
}

export interface CampaignInput {
  campaign_id?: string | number;
  org_id?: number;
  status?: number;
  type?: number;
  platform_type?: number;
  title?: string;
  start_date_time?: string;
  end_date_time?: string;
  created_date?: string;
  updated_date?: string;
  purpose?: string;
  wording?: string;
  guidance?: string;
  owner_id?: number;
}

export interface Story {
  created_date: string;
  original_link: string;
  thumb_path: string;
  story_path: string;
  inf_id: number;
  campaign_id: number;
  id: number;
}
