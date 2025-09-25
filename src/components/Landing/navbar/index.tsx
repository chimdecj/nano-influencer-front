"use client";

import Icons from "@/components/common/Icons";
import ThemeToggle from "@/components/settings/ThemeToggle";
import { Avatar, Dropdown } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const items = [
    {
      key: "about",
      label: <a rel="noopener noreferrer">about us</a>,
    },
    {
      key: "service",
      label: <a rel="noopener noreferrer">service</a>,
    },
    {
      key: "clients",
      label: <a rel="noopener noreferrer">clients</a>,
    },
    {
      key: "login",
      label: (
        <Link href={"/login"} className="flex items-center gap-3">
          <Icons.LogIn size={16} />
          Login
        </Link>
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
            <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-white py-3 dark:bg-black px-8 hover:bg-black/40" onClick={() => router.push("/login")}>
              Login
            </div>
          )}
          {/* <ThemeToggle /> */}
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
