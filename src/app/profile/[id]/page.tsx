import React from "react";

export default function UserIdPage({ params }: any) {
  return (
    <div>
      <h1 className="text-2xl font-medium mb-5">User Profile Page</h1>
      <p>{params.id}</p>
    </div>
  );
}
