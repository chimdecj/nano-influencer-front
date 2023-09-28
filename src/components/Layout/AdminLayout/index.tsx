import { SideNav } from "../SideNav";
import UserSection from "../UserSection";
import { SiteHeader } from "./SiteHeader";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main>
        <div className="bg-white dark:bg-gray-1000 grid grid-cols-5 gap-6 p-5 md:p-10">
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
