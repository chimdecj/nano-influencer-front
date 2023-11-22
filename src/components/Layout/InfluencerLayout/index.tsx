import UserSection from "../UserSection";
import { SideNav } from "./SideNav";
import { SiteHeader } from "./SiteHeader";
// import cookieCutter from "cookie-cutter";
import React from "react";

export default async function InfluencerLayout({ children }: { children: React.ReactNode }) {
  console.log("InfluencerLayout");
  // console.log(cookieCutter.get("token"));

  return (
    <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">
      <SiteHeader />
      <main>
        <div className="grid grid-cols-5 gap-6 p-5 md:p-10">
          <div className="space-y-4">
            <UserSection />
            <SideNav />
          </div>
          <div className="col-span-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
