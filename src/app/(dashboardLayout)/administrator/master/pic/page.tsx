import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PageClientProvider from "./PageClientProvider";

export const metadata: Metadata = {
  title: "Daftar PIC",
  description: "master data person in charge",
};

const PicPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }

  return (
    <>
      <PageClientProvider session={session} />
    </>
  );
};

export default PicPage;
