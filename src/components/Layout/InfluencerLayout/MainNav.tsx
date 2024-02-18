"use client";

import { Image } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";

export interface NavItem {
  title: React.ReactNode;
  href: string;
}

export function MainNav() {
  const { theme: nowTheme } = useTheme();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/admin/influencer/campaign/list">
        <div className="hidden items-center space-x-2 md:flex">
          {/* <span className="hidden text-2xl font-bold sm:inline-block">nano influencer</span> */}
          <Image src={nowTheme === "light" ? "/logo-light.svg" : "/logo-dark.svg"} alt="logo" preview={false} />
        </div>
      </Link>
    </div>
  );
}
