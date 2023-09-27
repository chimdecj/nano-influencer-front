'use client';

import * as React from 'react';

import Link from 'next/link';

import { Dropdown } from 'antd';
import { useTranslations } from 'next-intl';

import Icons from '@/components/common/Icons';

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href: string;
  icon: React.ReactNode;
}

export function SideNav() {
  const t = useTranslations();

  const NavItems: NavItem[] = [
    {
      key: 'campaigns',
      href: '/admin/campaign/list',
      label: 'Campaign list',
      icon: <Icons.List size={18} />,
    },
    {
      key: 'active-campaigns',
      label: 'Active campaigns',
      href: '/admin/dashboard',
      icon: <Icons.SquareStack size={18} />,
    },
    {
      key: 'influencer',
      href: '/admin/influencer/list',
      label: 'Influencer list',
      icon: <Icons.Users size={18} />,
    },
    {
      key: 'settings',
      label: 'Settings',
      href: '/admin/settings',
      icon: <Icons.Settings size={18} />,
    },
    {
      key: 'log-out',
      label: 'Log out',
      href: '/admin/settings',
      icon: <Icons.LogOut size={18} />,
    },
  ];

  return (
    <div className="h-fit rounded-3xl bg-slate-200 px-3.5 py-3 dark:bg-gray-900">
      {NavItems?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className="flex cursor-pointer select-auto items-center gap-4 px-2 py-3 text-sm hover:text-primary-600"
            >
              {item.icon} {item.label}
            </Link>
          ),
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
          <Icons.logo className="mr-2 h-4 w-4" />{' '}
          <span className="font-bold">Menu</span>
        </div>
      </Dropdown>
    </div>
  );
}
