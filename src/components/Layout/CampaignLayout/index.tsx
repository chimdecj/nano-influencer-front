"use client";

import CampaignSteps from "../BasicLayout/CampaignSteps";
import { SiteHeader } from "../CompanyLayout/SiteHeader";
import { Progress } from "antd";
import React from "react";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">
      <SiteHeader />
      <main>
        <div className="grid grid-cols-5 gap-6 p-5 md:p-10">
          <div className="space-y-4">
            <CampaignSteps />
          </div>
          <div className="col-span-4">
            <div className="max-w-4xl m-auto">
              <h1>Create new campaign</h1>
              <Progress percent={30} strokeColor="#B5D43B" />
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
