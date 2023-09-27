import { usePathname } from 'next/navigation';

import AdminLayout from '@/components/Layout/AdminLayout';
import CampaignLayout from '@/components/Layout/CampaignLayout';

export default async function SubLayout(props: any) {
  const { children } = props;

  return <AdminLayout>{children}</AdminLayout>;
}
