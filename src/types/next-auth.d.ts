import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: number;
    name: string;
    email: string;
    token: string;
  }

  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      token: string;
    };
  }
}
