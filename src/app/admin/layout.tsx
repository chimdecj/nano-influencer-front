import { Layout, Image, Avatar, Button } from "antd";
import Link from "next/link";
import React from "react";

import { BlockOutlined, LogoutOutlined, PlusOutlined, SettingOutlined, TeamOutlined, UnorderedListOutlined } from "@ant-design/icons";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const items = [
    {
      key: "campaigns",
      href: "/admin/campaigns",
      label: "Campaign list",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "active-campaigns",
      label: "Active campaigns",
      href: "/admin/campaigns/active",
      icon: <BlockOutlined />,
    },
    {
      key: "influencers",
      href: "/admin/influencers",
      label: "Influencer list",
      icon: <TeamOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      href: "/admin/settings",
      icon: <SettingOutlined />,
    },
    {
      key: "log-out",
      label: "Log out",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="min-h-screen !sm:min-w-full px-3 md:px-6">
      <div className="py-5 flex items-center justify-between">
        <h2 className="">Influencer</h2>
        <Button type="primary" size="large" shape="round" icon={<PlusOutlined />}>
          Create new campaign
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="space-y-4">
          <div className="bg-[#333] px-3.5 py-6 rounded-3xl h-fit flex items-center gap-4">
            <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" size={48} />
            <div className="grid text-sm font-medium">
              <span>Hello, </span>
              <span>Enkhbay</span>
            </div>
          </div>
          <div className="bg-[#333] px-3.5 py-3 rounded-3xl h-fit">
            <ul className="list-none m-0 py-0 px-2">
              {items.map((item) => (
                <li key={item.key} className="flex items-center gap-4 py-3 hover:text-primary-600 cursor-pointer select-auto">
                  {item.icon} {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
