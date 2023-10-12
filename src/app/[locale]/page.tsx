import Header from "@/components/Landing/navbar";
import Link from "next/link";

export default function Page() {
  return (
    <div className="stripe-container d-flex flex-column justify-content-center w-100 h-100 min-h-screen">
      <div className="container !min-h-screen py-6">
        <Header />
        <div className="m-auto flex !h-full max-w-2xl flex-col items-center justify-center gap-8 px-8 py-28 text-center">
          <h2 className="!mb-0 text-6xl text-black">Take control of your performance marketing</h2>
          <div>
            <span className="text-2xl text-white">Manage and track your influencer affiliate marketing programs with ease</span>
          </div>
          <Link href={"/admin/company/dashboard"}>
            <div className="select-none rounded-full bg-white px-7 py-4 drop-shadow-xl dark:bg-black">Create campaign</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
