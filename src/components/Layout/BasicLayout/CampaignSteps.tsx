"use client";

import { getCampaignById } from "@/api";
import Icons from "@/components/common/Icons";
import { Campaign } from "@/libs/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const campaignSteps = [
  {
    label: "Select type",
    href: "/admin/company/create/campaign",
    key: "type",
    isChecked: false,
  },
  {
    label: "Campaign",
    href: "/admin/company/create/campaign/form",
    key: "form",
    isChecked: false,
  },
  {
    label: "Select influencers",
    href: "/admin/company/create/campaign/pick",
    key: "pick",
    isChecked: false,
  },
  {
    label: "Agreement",
    href: "/admin/company/create/campaign/submit",
    key: "agreement",
    isChecked: false,
  },
];

export default function CampaignSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const [items, setItems] = useState(campaignSteps);

  const handleStep = (item: any) => {
    router.push(id ? `${item.href}?id=${id}` : item.href);
  };

  useEffect(() => {
    if (id) {
      getCampaignById({
        campaign_id: id,
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data: Campaign) => {
          setItems(
            items.map((item) => {
              if (item.key === "type" && data.type != null && data.platform_type != null) {
                return {
                  ...item,
                  isChecked: true,
                };
              } else if (item.key === "form" && data.start_date_time) {
                return {
                  ...item,
                  isChecked: true,
                };
              } else if (item.key === "pick" && data.associated_influencers.length) {
                return {
                  ...item,
                  isChecked: true,
                };
              } else if (item.key === "agreement" && data.status > 0) {
                return {
                  ...item,
                  isChecked: true,
                };
              } else {
                return item;
              }
            })
          );
        });
    }
  }, [id, items, pathname]);

  return (
    <div className="grid h-fit items-center gap-8 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
      {items.map((item) => (
        <div key={item.key}>
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => handleStep(item)}>
            {item.isChecked ? <Icons.CheckCircle2Icon color="#B5D43B" /> : <Icons.Check color="#8C8C8C" />}
            <span className="hidden md:block">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
