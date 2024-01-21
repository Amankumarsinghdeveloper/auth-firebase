import Cookies from "js-cookie";
import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);

    console.log(result.user.accessToken);

    Cookies.set("auth_token", result.user.accessToken, {
      expires: 1 / 24,
    });
  } catch (e) {
    alert(e.message);
    error = e;
  }

  return { result, error };
}
