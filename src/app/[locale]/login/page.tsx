"use client";

import { getMeData, signIn } from "@/api";
import { setUserBasic } from "@/libs/common";
import { Button, Form, Input, notification } from "antd";
import { setCookie } from "cookies-next";
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
      }).then(async (data: any) => {
        if (data?.access_token) {
          setCookie("token", data.access_token);
          await new Promise((resolve) => setTimeout(resolve, 500));
          getMeData().then((meData: any) => {
            notification.success({
              message: "Login successfully",
            });
            setLoading(false);
            setUserBasic(meData);
            switch (meData.user_type) {
              case 0:
                if (meData.user_status === 0) {
                  router.push("/admin/company/settings");
                } else {
                  router.push("/admin/company/dashboard");
                }
                break;
              case 1:
                if (meData.user_status === 0) {
                  router.push("/admin/influencer/settings");
                } else {
                  router.push("/admin/influencer/campaign/list");
                }
                break;
              default:
                break;
            }
          });
        }

        if (data?.detail) {
          setLoading(false);
          notification.error({
            message: "Error",
            description: data?.detail,
          });
        }
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Network error",
        description: "Please try again",
      });
    }
  };

  return (
    <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen">
      <div className="container !min-h-screen py-6 flex flex-col justify-center items-center">
        <div className="bg-slate-50 bg-opacity-20 rounded-2xl py-20 px-10 md:px-24 md:w-[490px]">
          <div className="mb-10 flex justify-center">
            <Image alt="logo" src="/logo.svg" width={163} height={32} />
          </div>
          <div className="w-full">
            <Form layout="vertical" requiredMark="optional" onFinish={handleAuth}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username" }]}>
                <Input placeholder="" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button block htmlType="submit" loading={loading} size="large">
                  Login
                </Button>
              </Form.Item>
            </Form>
            {/*<Divider>or</Divider>
             <div className="flex flex-col space-y-4">
              <div className="justify-center flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={handleAuthFacebook}>
                <Icons.Facebook />
                <span>Continue with Facebook</span>
              </div>
              <div className="justify-center flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={handleAuth}>
                <Icons.AtSign />
                <span>Continue with Google</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
