"use client";

import Icons from "@/components/common/Icons";
import { Dropdown, Grid } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const { useBreakpoint } = Grid;

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href: string;
  icon: React.ReactNode;
}

export const InfluencerNavItems: NavItem[] = [
  {
    key: "campaigns",
    href: "/admin/influencer/campaign/list",
    label: "All campaigns",
    icon: <Icons.List size={18} />,
  },
  {
    key: "active-campaigns",
    label: "Active campaigns",
    href: "/admin/influencer/campaign/active?status=2",
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
    href: "/admin/influencer/settings",
    icon: <Icons.Settings size={18} />,
  },
  {
    key: "log-out",
    label: "Log out",
    href: "/logout",
    icon: <Icons.LogOut size={18} />,
  },
];

export function SideNav() {
  const screens = useBreakpoint();
  const pathname = usePathname();

  const NavItems = InfluencerNavItems;

  if (screens.xs) return null;

  return (
    <div className="h-fit rounded-3xl bg-slate-200 px-3.5 py-3 dark:bg-gray-900 flex flex-col gap-2">
      {NavItems?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className={`flex cursor-pointer select-auto items-center gap-4 px-4 py-3 text-sm rounded-2xl hover:bg-gradient-to-r from-primary-600 hover:text-white ${
                (item.href.includes("?") ? item.href.startsWith(pathname) : pathname === item.href) ? "bg-gradient-to-r from-primary-600 text-white" : ""
              }`}
            >
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
