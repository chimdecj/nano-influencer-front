import Icons from "../common/Icons";
import { User } from "@/libs/types";
import { Image } from "antd";

export const getGender = (value: number) => {
  switch (value) {
    case 0:
      return "Male";
    case 1:
      return "Female";
    default:
      return "Unknown";
  }
};

export const getSocialAccountIconByType = (key: number) => {
  switch (key) {
    case 0:
      return <Icons.InstagramIcon />;
    case 1:
      return <Icons.FacebookIcon />;
    // case 2:
    //   return <Icons.Tik />;
    default:
      break;
  }
};

function InfluencerProfile({ user }: { user: User }) {
  return (
    <dl className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <Image src={user?.image_url} alt="" className="w-12 h-12" />
      </div>
      <div className="col-span-2">
        <div className="py-2 gap-4">
          <dt className="text-sm font-semibold text-gray-500">Full name</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{`${user?.first_name} ${user?.last_name}`}</dd>
        </div>
        <div className="py-2 gap-4">
          <dt className="text-sm font-semibold text-gray-500">Email address</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{user?.email}</dd>
        </div>
        <div className="py-2 gap-4">
          <dt className="text-sm font-semibold text-gray-500">Phone number</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{user?.phonenumber}</dd>
        </div>
        <div className="py-2 gap-4">
          <dt className="text-sm font-semibold text-gray-500">Gender</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">{getGender(user?.gender as number)}</dd>
        </div>
        <div className="py-2 gap-4">
          <dt className="text-sm font-semibold text-gray-500">Social Accounts</dt>
          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-500 sm:mt-0 sm:col-span-2">
            {user?.socialAccounts.map((account, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span>{getSocialAccountIconByType(account.account_type)}</span> <span>{account.account_profile}</span>{" "}
                <div className="space-x-2">
                  <span>Followers:</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-600 text-primary-1000">{account.total_followers}</span>
                </div>
              </div>
            ))}
          </dd>
        </div>
      </div>
    </dl>
  );
}

export default InfluencerProfile;
