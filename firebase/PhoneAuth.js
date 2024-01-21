"use client";

import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebase_app = "./config.js";

const auth = getAuth(firebase_app);

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const handleSendCode = () => {
    // const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   "send-code-button",
    //   {
    //     size: "invisible",
    //   }
    // );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((verificationId) => {
        setVerificationId(verificationId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        // User signed in successfully
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button id="send-code-button" onClick={handleSendCode}>
        Send Code
      </button>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </>
  );
};

export default PhoneAuth;
