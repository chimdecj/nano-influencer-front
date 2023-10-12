"use client";

import { fbLogin, getFacebookLoginStatus, initFacebookSdk } from "@/utils/FacebookSDK";
import { Button } from "antd";
import React, { useEffect } from "react";

function SSO() {
  useEffect(() => {
    console.log("Started use effect");
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response) => {
        if (response == null) {
          console.log("No login status for the person");
        } else {
          console.log(response);
        }
      });
    });
  }, []);

  const handleAuth = () => {
    console.log("reached log in button");
    fbLogin().then((response: any) => {
      console.log(response);
      if (response.status === "connected") {
        console.log("Person is connected");
      } else {
        // something
      }
    });
  };

  return (
    <div>
      SSO success
      <Button shape="round" onClick={handleAuth}>
        FB authorize
      </Button>
      AA
    </div>
  );
}

export default SSO;
