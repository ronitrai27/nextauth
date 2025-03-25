"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    // console.log("ID of logged User->", res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="">
        <h1 className="bg-blue-600 w-full text-white text-2xl p-2 mb-5">
          PROFILE PAGE
        </h1>

        {data === "nothing" ? (
          <p className="mb-5">No Data to Show</p>
        ) : (
          <div className="flex flex-col gap-1 items-center">
            <p className="italix font-light">Visit the below link</p>
            <Link href={`/profile/${data}`}>
              <p className="mb-5">{data}</p>
            </Link>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md cursor-pointer"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-green-500 text-white font-medium px-3 py-1 rounded-md cursor-pointer"
        >
          profile
        </button>
      </div>
    </div>
  );
}
{
  /* <p className="bg-gray-100 text-xl font-medium mb-5">
          {data === "nothing" ? (
            "No data to Show!!"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </p> */
}
