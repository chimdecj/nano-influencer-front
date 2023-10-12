"use client";

import { getFacebookLoginStatus, initFacebookSdk } from "@/utils/FacebookSDK";
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

  return <div>SSO success</div>;
}

export default SSO;
