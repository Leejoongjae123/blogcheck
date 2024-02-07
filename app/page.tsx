import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Link from "next/link";
import Table from "../components/Table";
import Table2 from "../components/Table2";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center ">
      <nav className="w-full flex justify-center h-16 bg-gray-100">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link href="/">
            <h1 className="font-bold text-2xl ">블로그 진단</h1>
          </Link>

          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-y-5 opacity-0 px-3 w-full md:w-2/3">
        <Header />
        <main className="w-full ">
          <h1 className="font-bold text-3xl text-center my-5">상세내역</h1>
          
            <Table></Table>
          

          {/* <Table2></Table2> */}
        </main>
      </div>

      <footer className="w-full border-t p-8 flex justify-center text-center text-xs">
        <p>
          copyright © 2024 | 공생마케팅 | All Right Reserved
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          ></a>
        </p>
      </footer>
    </div>
  );
}
