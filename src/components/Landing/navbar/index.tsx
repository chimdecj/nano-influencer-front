'use client';

import React from 'react';

import Image from 'next/image';

import { Avatar, Dropdown } from 'antd';

import Icons from '@/components/common/Icons';
import ThemeToggle from '@/components/settings/ThemeToggle';

function Header() {
  const items = [
    {
      key: '1',
      label: <a rel="noopener noreferrer">My profile</a>,
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" className="flex items-center gap-3">
          <Icons.LogOutIcon size={16} />
          Log out
        </a>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div>
        <Image alt="logo" src="/logo.svg" width={163} height={32} />
      </div>
      <div className="flex items-center space-x-10">
        <a href="">about us</a>
        <a href="">service</a>
        <a href="">clients</a>
        <div className="flex items-center space-x-4">
          <Dropdown menu={{ items }}>
            <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black">
              <Avatar
                src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                size={20}
              />
              <span>Hello, Andy</span>
              <Icons.ChevronDown />
            </div>
          </Dropdown>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
