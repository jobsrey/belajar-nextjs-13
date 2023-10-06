import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PageClientProvider from "./PageClientProvider";

export const metadata: Metadata = {
  title: "Daftar UOM",
  description: "master data uom",
};

const PageUom = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <span className="text-lg font-bold">Master Uom Page</span>
      </div>
      <PageClientProvider session={session} />
    </>
  );
};

export default PageUom;
