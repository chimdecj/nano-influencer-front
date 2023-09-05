import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h2 className="left-0 top-0 flex w-full">Influencer</h2>
      </div>

      <div className="place-items-center before:absolute before:h-[200px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ">
        <h2>Take control of your performance marketing</h2>
        <p>Manage and track your influencer affiliate marketing programs with ease</p>
        <Link href={"/admin"}>
          <Button>Go to admin panel</Button>
        </Link>
      </div>

      <div className="flex gap-3">
        <Button type="primary" shape="round">
          Login
        </Button>
        <Button ghost shape="round">
          Sign up
        </Button>
      </div>
    </main>
  );
}
