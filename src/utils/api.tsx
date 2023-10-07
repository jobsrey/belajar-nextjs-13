import axios, { AxiosError, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         signOut();
//       }

//       throw error;
//     }
//   }
// );

export default api;
