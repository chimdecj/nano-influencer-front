export interface User {
  id: string | number;
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
  socialAccounts: any[];
  work_address: string;
  work_name: string;
  work_position: string;
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
  status: number;
  type: number;
  platform_type: number;
  title: string;
  start_date_time: string;
  end_date_time: string;
  created_date?: string;
  updated_date?: string;
  purpose: string;
  wording: string;
  guidance: string;
  owner_id: number;
}
