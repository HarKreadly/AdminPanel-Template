import React, { useEffect, useState } from "react";
import SidebarToggle from "./Navbar/SidebarToggle";
import ThemeToggle from "./Navbar/ThemeToggle";
import UserDropdown from "./Navbar/UserDropdown";
import NotificationsButton from "./Navbar/NotificationsButton";


export default function AppNavbar({ collapsed, toggleSidebar, header, notificationsCount = 0 }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === "undefined") return false;
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme") === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <nav className="flex justify-between items-center px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-10 transition-all duration-300">
            <div className="flex items-center space-x-4">
                {/* Sidebar toggle button */}
                <SidebarToggle collapsed={collapsed} onToggle={toggleSidebar} />

                <div className="text-xl font-semibold text-zinc-800 dark:text-white">
                    {header}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <NotificationsButton
                    count={notificationsCount}
                    open={showNotifications}
                    onToggle={() => setShowNotifications((v) => !v)}
                    onClose={() => setShowNotifications(false)}
                />

                {/* Dark Mode toggle */}
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

                {/* User Dropdown */}
                <UserDropdown darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </nav>
    );
}
