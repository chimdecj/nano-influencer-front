"use client";

import { submitCampaign } from "@/api";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const agreementText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and";

function CreateCampaignSubmit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = () => {
    setSubmitLoading(true);
    submitCampaign({
      campaign_id: id,
    }).then((data) => {
      setSubmitLoading(false);
      router.push("/admin/company/create/campaign/success");
    });
  };

  return (
    <div>
      <h2 className="text-gray-700 text-base my-4">Agreement</h2>
      <div className="bg-gray-900 p-5 rounded-3xl max-h-[500px] overflow-auto">
        <span className="text-gray-700 text-base">{agreementText}</span>
      </div>
      <div className="flex justify-between py-5">
        <Button type="text" size="large" shape="round">
          Go back
        </Button>
        <Button type="primary" size="large" shape="round" onClick={onFinish} loading={submitLoading}>
          I agree
        </Button>
      </div>
    </div>
  );
}

export default CreateCampaignSubmit;
