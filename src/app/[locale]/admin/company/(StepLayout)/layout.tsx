import CampaignLayout from "@/components/Layout/CampaignLayout";
import AdminLayout from "@/components/Layout/CompanyLayout";
import { usePathname } from "next/navigation";

export default async function SubLayout(props: any) {
  const { children } = props;
  return <CampaignLayout>{children}</CampaignLayout>;
}
