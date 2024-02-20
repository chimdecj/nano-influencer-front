"use client";

import CampaignSteps, { campaignSteps } from "../BasicLayout/CampaignSteps";
import { SiteHeader } from "../CompanyLayout/SiteHeader";
import { getCampaignById } from "@/api";
import { Campaign } from "@/libs/types";
import { Progress } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const [items, setItems] = useState(campaignSteps);

  useEffect(() => {
    if (id) {
      getCampaignById({
        campaign_id: id,
      }).then((data: Campaign) => {
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
  }, [id, pathname]);

  return (
    <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">
      <SiteHeader />
      <main>
        <div className="grid md:grid-cols-5 gap-6 p-5 md:p-10 overflow-auto">
          <div className="space-y-4">
            <CampaignSteps />
          </div>
          <div className="col-span-4 rounded-3xl p-4 bg-slate-200 dark:bg-transparent">
            <div className="max-w-4xl m-auto">
              <h1>Create new campaign</h1>
              <Progress percent={(items.filter((i) => i.isChecked == true).length / items.length) * 100} strokeColor="#B5D43B" />
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
