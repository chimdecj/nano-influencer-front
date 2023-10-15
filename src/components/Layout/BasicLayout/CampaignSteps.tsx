"use client";

import Icons from "@/components/common/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function CampaignSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const items = [
    {
      label: "Select type",
      href: "/admin/company/create/campaign",
      key: "type",
      isChecked: true,
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

  const handleStep = (item: any) => {
    router.push(id ? `${item.href}?id=${id}` : item.href);
  };

  return (
    <div className="grid h-fit items-center gap-8 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
      {items.map((item) => (
        <div key={item.key}>
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => handleStep(item)}>
            {item.isChecked ? <Icons.CheckCircle2Icon color="#B5D43B" /> : <Icons.Check color="#8C8C8C" />}
            <span className="hidden md:block">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
