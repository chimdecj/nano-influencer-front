"use client";

import Icons from "@/components/common/Icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const AdminCreateCampaignSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="h-full p-16 flex flex-col justify-center">
      <div className="flex flex-col items-center space-y-5 text-center">
        <Icons.CheckCircle2Icon color="#B5D43B" size={70} />
        <h2 className="dark:text-gray-100 text-2xl">Success!</h2>
        <div className="max-w-xl">
          <span className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </span>
        </div>
        <div className="w-[100px]">
          <Button
            type="primary"
            shape="round"
            size="large"
            block
            onClick={() => {
              router.push("/admin/company/campaign/list");
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCampaignSuccessPage;
