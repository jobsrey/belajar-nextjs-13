import { Metadata } from 'next'
import PageLoginClientProvider from './PageClientProvider'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: 'Selamat Datang di Aplikasi Asetkita | Login',
}

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/administrator");
  }
  return (
    <>
      <PageLoginClientProvider/>
    </>
  )
}

export default LoginPage
