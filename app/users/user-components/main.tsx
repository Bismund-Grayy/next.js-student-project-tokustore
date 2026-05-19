"use client";

import React from "react";
import Logout from "./logout";

export default function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>MatchAI User Hub</h1>

        <Logout />
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, padding: "1rem" }}></main>
      </div>
    </div>
  );
}