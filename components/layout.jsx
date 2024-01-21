"use client";

import { AuthContextProvider } from "../AuthContext";

export default function RootLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
