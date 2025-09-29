import React from "react";

export default function AppMain({ children, collapsed }) {
  return (
    <main
      className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}
    >
      <div>{children}</div>
    </main>
  );
}
