import Cookies from "js-cookie";
import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      // Get the ID token of the current user
      var token = await auth.currentUser.getIdToken();

      Cookies.set("auth_token", result.user.accessToken, {
        expires: 1 / 24,
      });

      console.log("IDTOKEN", token);
    } else {
      console.log("No user found");
    }

    Cookies.set("auth_token", result.user.accessToken, {
      expires: 1 / 24,
    });
  } catch (e) {
    alert(e.message);
    error = e;
  }

  return { result, error };
}
