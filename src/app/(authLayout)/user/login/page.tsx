import { Metadata } from 'next'
import PageLoginClientProvider from './PageClientProvider'


export const metadata: Metadata = {
  title: 'Selamat Datang di Aplikasi Asetkita | Login',
}

const LoginPage = () => {
  return (
    <>
      <PageLoginClientProvider/>
    </>
  )
}

export default LoginPage
