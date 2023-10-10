import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import PageClientProvider from "./PageClientProvider";

export const metadata: Metadata = {
  title: "Daftar Master Masa Garansi",
  description: "Master mata masa garansi",
};

const PageUserAsset = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }
  return <>
    <div className="flex justify-center items-center py-4">
      <span className="text-lg font-bold">Master Data Masa Garansi</span>
    </div>
    <PageClientProvider session={session}/>
  </>;
};

export default PageUserAsset;
