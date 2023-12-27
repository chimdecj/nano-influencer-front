"use client";

// import { cookies } from "next/headers";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Login() {
  const router = useRouter();
  useEffect(() => {
    // cookies().delete("token");
    setCookie("token", null);
    window.localStorage.clear();
    router.push("/login");
  }, []);

  return <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen"></div>;
}

export default Login;
