import React from "react";
import PageStatusProvider from "./PageStatusProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Daftar Status',
  description: 'master data status',
}

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }

  return (
    <>
      <PageStatusProvider session={session} />
    </>
  );
};

export default page;
