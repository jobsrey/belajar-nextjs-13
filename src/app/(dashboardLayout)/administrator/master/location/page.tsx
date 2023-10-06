import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ClientPageProvider from './ClientPageProvider';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Lokasi",
  description: "master data lokasi",
};


const CategoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    redirect("/user/login");
  }
  return (
    <>
      <ClientPageProvider session={session}/>
    </>
  )
}

export default CategoryPage
