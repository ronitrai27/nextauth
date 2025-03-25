"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LuLogIn,
  LuUser,
  LuUserCheck,
  LuMail,
  LuMailCheck,
  LuCheck,
  LuLoaderCircle,
} from "react-icons/lu";
import Link from "next/link";
export default function signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup Failed", error);
      toast.error(
        error.response?.data?.error || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center h-screen justify-center bg-gray-100">
      <div className="border-[.6px] border-blue-600 py-2 px-4 rounded-md shadow-lg min-w-[32%] flex flex-col bg-white ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/globe-grid.png"
              alt="logo"
              width={35}
              height={35}
            ></Image>
            <h1 className="font-medium text-[18px] tracking-tight">
              VRSA infotech
            </h1>
          </div>
          <p className="capitalize text-[14px] font-light">
            already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-500 font-normal cursor-pointer hover:scale-105 transition-all duration-200 hover:text-blue-700">
                Login
              </span>
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 justify-center mt-3 mb-1">
          <h1 className="capitalize text-[22px] font-[400]">Register</h1>
          <div className="bg-gray-200 w-7 h-7 rounded-lg flex items-center justify-center">
            <LuLogIn className=" text-blue-600" />
          </div>
        </div>
        <p className=" capitalize font-light text-center text-[16px]">
          register and be a part of extraordinary family
        </p>
        <div className="flex items-center justify-center mt-5">
          <form action="" className="space-y-3">
            <div className="flex items-center justify-end border-b-[1px] border-gray-200 ">
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="p-2 w-full focus:outline-none"
              />
              <div className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center">
                {user.username.length > 0 ? (
                  <LuUserCheck className="text-green-500" />
                ) : (
                  <LuUser className="text-blue-500" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-end border-b-[1px] border-gray-200 ">
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 w-full focus:outline-none"
              />
              <div className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center">
                {user.email.length > 0 ? (
                  <LuMailCheck className="text-green-500" />
                ) : (
                  <LuMail className="text-blue-500" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-end border-b-[1px] border-gray-200 ">
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="p-2 w-full focus:outline-none"
              />
              <div className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center">
                {user.password.length > 0 ? (
                  <LuCheck className="text-green-500" />
                ) : (
                  <LuCheck className="text-blue-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition-colors duration-200 ease-in cursor-pointer ${
                buttonDisabled
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600 "
              }`}
            >
              {loading ? "Signing Up" : "Sign Up"}
              {loading && (
                <LuLoaderCircle className="animate-spin text-white w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
