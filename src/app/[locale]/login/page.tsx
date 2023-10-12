"use client";

import Icons from "@/components/common/Icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleAuth = () => {
    signIn("facebook", { callbackUrl });
  };

  return (
    <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen">
      <div className="container !min-h-screen py-6 flex justify-center items-center">
        {/* <Button ghost shape="round" onClick={handleAuth}>
          Continue with Facebook
        </Button> */}
        <div className="flex flex-col space-y-4">
          <div className="justify-center flex cursor-pointer items-center space-x-2 rounded-full bg-white p-[14px] dark:bg-black" onClick={handleAuth}>
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
