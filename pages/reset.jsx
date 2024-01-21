"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

import { auth } from "../firebase/config";

const Reset = () => {
  const [email, setEmail] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email Sent");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Forgot Password</h1>
        <form onSubmit={(event) => handleForm(event)} className="form">
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
          <button type="submit">Reset Button</button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
