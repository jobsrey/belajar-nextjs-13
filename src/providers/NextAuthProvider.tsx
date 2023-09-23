'use client'

import { SessionProvider } from "next-auth/react"

interface IProps {
  children: React.ReactNode
}

const NextAuthProvider = ({children}:IProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider
