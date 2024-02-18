"use client";

import { getUserBasic } from "@/libs/common";
import { UserBasic } from "@/libs/types";
import { Image } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface NavItem {
  title: React.ReactNode;
  href: string;
}

export function MainNav() {
  const { theme: nowTheme } = useTheme();

  const [data, setData] = useState<UserBasic>();

  useEffect(() => {
    const userBasic = getUserBasic();
    setData(userBasic);
  }, []);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/admin/company/dashboard">
        <div className="hidden items-center space-x-2 md:flex">
          {/* <span className="hidden text-2xl font-bold sm:inline-block">nano influencer</span> */}
          <Image src={nowTheme === "light" ? "/logo-light.svg" : "/logo-dark.svg"} alt="logo" preview={false} />
        </div>
      </Link>
    </div>
  );
}
