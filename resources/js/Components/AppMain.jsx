import React from "react";

export default function AppMain({ children, collapsed }) {
  return (
    <main
      className={`flex-1 min-h-screen bg-zinc-100 dark:bg-zinc-800 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}
    >
      {children}
    </main>
  );
}
