import React from "react";

export default function AvatarProfile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10vw"
      height="10vw"
      viewBox="0 0 32 32"
      style={{
        margin: "0 auto 0 auto",
        backgroundColor: "white",
        borderRadius: "50%",
        boxShadow: "10px 10px 50px 10px black",
        padding: "0",
      }}
    >
      <path fill="#132f49" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5"></path>
      <path
        fill="#132f49"
        d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m7.993 22.926A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
      ></path>
    </svg>
  );
}
