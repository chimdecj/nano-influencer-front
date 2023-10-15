import CampaignLayout from "@/components/Layout/CampaignLayout";

export default async function SubLayout(props: any) {
  const { children } = props;
  return <CampaignLayout>{children}</CampaignLayout>;
}
