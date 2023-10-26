"use client";

import Icons from "@/components/common/Icons";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleAuthFacebook = () => {
    signIn("facebook", { callbackUrl });
  };

  const handleAuth = (values: any) => {
    signIn("credentials", {
      email: values.username,
      password: values.password,
    });
  };

  return (
    <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen">
      <div className="container !min-h-screen py-6 flex flex-col justify-center items-center">
        <Form layout="vertical" requiredMark="optional" onFinish={handleAuth}>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username" }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
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
  );
}

export default Login;
