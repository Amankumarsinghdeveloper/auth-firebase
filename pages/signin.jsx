"use client";
import React from "react";
import signIn from "../firebase/signin";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../AuthContext";
import Cookies from "js-cookie";

import { auth } from "../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const googleAuth = new GoogleAuthProvider();

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      // let token = result.credential.accessToken;
      // let user = result.user;

      console.log(result);

      let isNewUser = result._tokenResponse.isNewUser;
      console.log(isNewUser);

      if (isNewUser) {
        await result.user.delete();
        alert("Account not Registred");
      } else {
        Cookies.set("auth_token", result.user.accessToken, {
          expires: 1 / 24,
        });
      }
    } catch (error) {
      alert("Account not Registred");
    }
  };

  React.useEffect(() => {
    if (user) router.push("/admin");
  }, [user]);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  const handlereset = () => {
    router.push("/reset");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign In</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>

        <button
          onClick={() => {
            handleGoogle();
          }}
        >
          Login with Google
        </button>
      </div>
      <p onClick={handlereset}>Forgot Password</p>
    </div>
  );
}

export default Page;
