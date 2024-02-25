import UserSection from "../UserSection";
import { SideNav } from "./SideNav";
import { SiteHeader } from "./SiteHeader";
import { Image } from "antd";
import React from "react";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-white dark:bg-gray-1000 overflow-auto">
      <div className="fixed bottom-16 left-16">
        <Image src="/vectors/vector-1.svg" alt="vector-1" preview={false} />
      </div>
      <div className="absolute top-16 right-16">
        <Image src="/vectors/vector-2.svg" alt="vector-1" preview={false} />
      </div>
      <SiteHeader />
      <main>
        <div className="grid md:grid-cols-5 gap-6 p-5 md:p-10 overflow-auto">
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
