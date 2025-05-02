"use client";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      No deberias de estar aqui!
      <button
        style={{
          cursor: "pointer",
          padding: "5px",
          backgroundColor: "red",
          margin: "5px",
          borderRadius: "20px",
        }}
        onClick={() => {
          redirect("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
}
