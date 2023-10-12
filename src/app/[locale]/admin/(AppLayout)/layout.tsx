import AdminLayout from "@/components/Layout/AdminLayout";
import InfluencerLayout from "@/components/Layout/InfluencerLayout";
import { usePathname } from "next/navigation";

export default async function SubLayout(props: any) {
  const { children } = props;

  // return <InfluencerLayout>{children}</InfluencerLayout>;
  return <AdminLayout>{children}</AdminLayout>;
}
