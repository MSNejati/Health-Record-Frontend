import React from "react";

export default function AccessDenied() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>شما به این صفحه دسترسی ندارید.</h1>
    </div>
  );
}
