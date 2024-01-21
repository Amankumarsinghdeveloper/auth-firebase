import firebase_app from "./config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, phone, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, phone, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
