"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";
export default function VerifyEmailPage() {
  //   const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  //FUNCTION TO VERIFY---
  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //using nextjs----
    // const { query } = router;
    // const urlToken2 = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className="bg-slate-900 text-white flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-[18px] font-medium">VERIFY EMAIL</h1>
        <p className="my-5 bg-blue-600 px-3 py-1 rounded-md">
          {token ? `${token}` : "no-token"}
        </p>

        {verified && (
          <div className="">
            <p className="">VERIFIED</p>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error && <p className="">ERROR</p>}
      </div>
    </div>
  );
}
