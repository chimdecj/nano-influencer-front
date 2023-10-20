"use client";

import Icons from "@/components/common/Icons";
import { Dropdown } from "antd";
import Link from "next/link";
import * as React from "react";

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href: string;
  icon: React.ReactNode;
}

const InfluencerNavItems: NavItem[] = [
  {
    key: "campaigns",
    href: "/admin/influencer/campaign/list",
    label: "New campaigns",
    icon: <Icons.List size={18} />,
  },
  {
    key: "active-campaigns",
    label: "Active campaigns",
    href: "/admin/influencer/campaign/list?status=2",
    icon: <Icons.SquareStack size={18} />,
  },
  // {
  //   key: "influencer",
  //   href: "/admin/influencer/influencer/list",
  //   label: "Campaign history",
  //   icon: <Icons.History size={18} />,
  // },
  {
    key: "settings",
    label: "Settings",
    href: "#!",
    icon: <Icons.Settings size={18} />,
  },
  {
    key: "log-out",
    label: "Log out",
    href: "/",
    icon: <Icons.LogOut size={18} />,
  },
];

export function SideNav() {
  const NavItems = InfluencerNavItems;
  return (
    <div className="h-fit rounded-3xl bg-slate-200 px-3.5 py-3 dark:bg-gray-900">
      {NavItems?.map(
        (item, index) =>
          item.href && (
            <Link key={index} href={item.href} className="flex cursor-pointer select-auto items-center gap-4 px-2 py-3 text-sm hover:text-primary-600">
              {item.icon} {item.label}
            </Link>
          )
      )}
      <Dropdown
        menu={{
          items: NavItems?.map((item) => ({
            key: item.href,
            label: <Link href={item.href}>{item.label}</Link>,
          })),
        }}
      >
        <div className="btn md:hidden">
          <Icons.logo className="mr-2 h-4 w-4" /> <span className="font-bold">Menu</span>
        </div>
      </Dropdown>
    </div>
  );
}
