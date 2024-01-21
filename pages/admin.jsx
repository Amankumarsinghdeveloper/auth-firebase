"use client";
import React from "react";
import { useAuthContext } from "../AuthContext";
import { useRouter } from "next/navigation";

import { getAuth, signOut } from "firebase/auth";

function Page() {
  const auth = getAuth();
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <h1>Only logged in users can view this page</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default Page;
