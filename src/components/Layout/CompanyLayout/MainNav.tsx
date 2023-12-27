"use client";

import Link from "next/link";
import * as React from "react";

export interface NavItem {
  title: React.ReactNode;
  href: string;
}

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/admin/company/dashboard">
        <div className="hidden items-center space-x-2 md:flex">
          <span className="hidden text-2xl font-bold sm:inline-block">nano influencer</span>
        </div>
      </Link>
    </div>
  );
}
