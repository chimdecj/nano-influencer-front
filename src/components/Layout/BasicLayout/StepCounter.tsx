"use client";

import Icons from "@/components/common/Icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function StepCounter() {
  const items = [
    {
      label: "Select type",
      href: "/admin/company/create/campaign",
      key: "type",
      isChecked: false,
    },
    {
      label: "Campaign",
      href: "/admin/company/create/campaign/form",
      key: "campaign",
      isChecked: false,
    },
    {
      label: "Select influencers",
      href: "/admin/company/create/campaign/pick",
      key: "select",
      isChecked: false,
    },
    {
      label: "Agreement",
      href: "/admin/company/create/campaign/submit",
      key: "agreement",
      isChecked: false,
    },
  ];
  return (
    <div className="grid h-fit items-center gap-8 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
      {items.map((item) => (
        <div key={item.key}>
          <Link href={item.href} className="flex items-center gap-3 px-2">
            <Icons.Check />
            <span>{item.label}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
