"use client";

import Icons from "@/components/common/Icons";
import ThemeToggle from "@/components/settings/ThemeToggle";
import { Avatar, Dropdown } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("session");
  console.log(session);
  console.log("status");
  console.log(status);

  const items = [
    {
      key: "1",
      label: <a rel="noopener noreferrer">My profile</a>,
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" className="flex items-center gap-3" onClick={() => signOut()}>
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
      <div className="items-center space-x-10 hidden md:flex">
        <a href="">about us</a>
        <a href="">service</a>
        <a href="">clients</a>
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <Dropdown menu={{ items }}>
              <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black">
                <Avatar src={session.user.image} size={20} />
                <span>Hello, {session.user.name}</span>
                <Icons.ChevronDown />
              </div>
            </Dropdown>
          ) : (
            <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={() => router.push("/login")}>
              Login
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
      <div className="md:hidden">
        <Dropdown menu={{ items }}>
          <div className="cursor-pointer">
            <Icons.Menu />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
