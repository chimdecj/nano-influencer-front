import { SiteHeader } from "../AdminLayout/SiteHeader";
import StepCounter from "../BasicLayout/StepCounter";
import React from "react";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">
      <SiteHeader />
      <main>
        <div className="grid grid-cols-5 gap-6 p-5 md:p-10">
          <div className="space-y-4">
            <StepCounter />
          </div>
          <div className="col-span-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
