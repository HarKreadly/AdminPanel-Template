import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";


export default function ThemeToggle({ darkMode, setDarkMode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-pressed={darkMode}
            aria-label={darkMode ? "Disable dark mode" : "Enable dark mode"}
        >
            {darkMode ? (
                <IoIosMoon className="w-5 h-5 text-yellow-200" />
            ) : (
                <MdLightMode className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
            )}
        </button>
    );
}


