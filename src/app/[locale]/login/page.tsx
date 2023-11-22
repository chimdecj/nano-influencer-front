"use client";

import { signIn } from "@/api";
import Icons from "@/components/common/Icons";
import { Button, Divider, Form, Input, notification } from "antd";
import cookieCutter from "cookie-cutter";
import { signIn as nextAuthSignIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleAuthFacebook = () => {
    nextAuthSignIn("facebook", { callbackUrl });
  };

  const handleAuth = (values: any) => {
    try {
      setLoading(true);
      signIn({
        username: values.username,
        password: values.password,
      }).then((data: any) => {
        setLoading(false);
        if (data?.access_token) {
          cookieCutter.set("token", data.access_token);
          router.push("/admin/company/dashboard");
        }

        if (data?.detail) {
          notification.error({
            message: "Error",
            description: data?.detail,
          });
        }
      });
    } catch (error) {}
  };

  return (
    <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen">
      <div className="container !min-h-screen py-6 flex flex-col justify-center items-center">
        <div className="bg-slate-50 bg-opacity-20 rounded-2xl py-20 px-28">
          <div className="mb-10 flex justify-center">
            <Image alt="logo" src="/logo.svg" width={163} height={32} />
          </div>
          <div className="max-w-xl">
            <Form layout="vertical" requiredMark="optional" onFinish={handleAuth}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username" }]}>
                <Input placeholder="" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button block htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Divider>or</Divider>
            <div className="flex flex-col space-y-4">
              <div className="justify-center flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={handleAuthFacebook}>
                <Icons.Facebook />
                <span>Continue with Facebook</span>
              </div>
              {/* <div className="justify-center flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={handleAuth}>
            <Icons.AtSign />
            <span>Continue with Google</span>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
