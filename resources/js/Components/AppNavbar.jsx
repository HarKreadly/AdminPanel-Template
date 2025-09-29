import React, { useState, useRef, useEffect } from "react";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function AppNavbar({ collapsed, toggleSidebar, header }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // initial check: if theme is stored, use it, otherwise check system preference
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme") === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const dropdownRef = useRef(null);

    // apply dark class to <html>
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="flex justify-between items-center px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-10 transition-all duration-300">
            <div className="flex items-center space-x-4">
                {/* Sidebar toggle button */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                    {collapsed ? (
                        <TbLayoutSidebarLeftExpandFilled className="w-6 h-6 text-zinc-600 dark:text-zinc-200" />
                    ) : (
                        <TbLayoutSidebarLeftCollapse className="w-6 h-6 text-zinc-600 dark:text-zinc-200" />
                    )}
                </button>

                <div className="text-xl font-semibold text-zinc-800 dark:text-white">
                    {header}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Dark Mode toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                    {darkMode ? (
                        <MdDarkMode className="w-5 h-5 text-yellow-200" />
                    ) : (
                        <MdLightMode className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                    )}
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800"
                    >
                        <img
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-zinc-800 rounded shadow-lg py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
