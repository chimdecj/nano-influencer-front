"use client";

import { MainNav } from "./MainNav";
import Icons from "@/components/common/Icons";
import ThemeToggle from "@/components/settings/ThemeToggle";
import { Button } from "antd";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-gray-1000 dark:bg-gray-1000">
      <div className="flex h-16 items-center space-x-4 px-10 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href={"/admin/company/create/campaign"}>
              <Button type="primary" shape="round" size="large" className="!flex !items-center !gap-2">
                <Icons.Plus size={18} />
                Create new campaign
              </Button>
            </Link>
            {/* <LocaleSwitcher /> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
