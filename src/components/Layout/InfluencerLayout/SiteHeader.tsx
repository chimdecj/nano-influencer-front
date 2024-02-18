"use client";

import { MainNav } from "./MainNav";
import { InfluencerNavItems } from "./SideNav";
import Icons from "@/components/common/Icons";
import ThemeToggle from "@/components/settings/ThemeToggle";
import { Dropdown, Grid } from "antd";
import Link from "next/link";

const { useBreakpoint } = Grid;

export function SiteHeader() {
  const screens = useBreakpoint();
  return (
    <header className="top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-gray-1000 dark:bg-gray-1000">
      <div className="flex h-16 items-center space-x-4 px-5 md:px-10 sm:justify-between sm:space-x-0">
        <div className="rounded-xl bg-slate-200 p-1 dark:bg-gray-900">
          <Dropdown
            menu={{
              items: InfluencerNavItems?.map((item) => ({
                key: item.href,
                label: <Link href={item.href}>{item.label}</Link>,
              })),
            }}
          >
            <div className="btn md:hidden">
              <Icons.Menu size={16} />
            </div>
          </Dropdown>
        </div>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* <Link href={"/admin/company/create/campaign"}>
              <Button type="primary" shape="round" size="large" className="!flex !items-center !gap-2">
                <Icons.Plus size={18} />
                Create new campaign
              </Button>
            </Link> */}
            {/* <LocaleSwitcher /> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
