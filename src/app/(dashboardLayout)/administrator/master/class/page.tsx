import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PageClientProvider from "./PageClientProvider";

export const metadata: Metadata = {
  title: "Daftar Master Kelas",
  description: "Master data Kelas",
};

const MasterClassPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }
  return (
    <>
      <div className="flex justify-center items-center py-2">
        <span className="text-lg font-bold">Master Class Page</span>
      </div>
      <PageClientProvider session={session} />
    </>
  );
};

export default MasterClassPage;
