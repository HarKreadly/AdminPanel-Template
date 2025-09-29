import React from "react";
import {
    InboxIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { MdSpaceDashboard } from "react-icons/md";
    import { HiUsers } from "react-icons/hi2";
import { PiPackageFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

export default function AppSidebar({ collapsed }) {
    const menuItems = [
        { name: "Dashboard", icon: <MdSpaceDashboard className="w-5 h-5" /> },
        { name: "Inbox", icon: <InboxIcon className="w-5 h-5" /> },
        { name: "Users", icon: <HiUsers className="w-5 h-5" /> },
        { name: "Products", icon: <PiPackageFill className="w-5 h-5" /> },
    ];
    const footerItems = [
        { name: "Settings", icon: <IoMdSettings className="w-5 h-5" /> },
        {
            name: "Sign Out",
            icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
        },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300
            ${collapsed ? "w-16" : "w-64"} flex flex-col`}
        >
            <hr className="opacity-0" />

            {/* Logo / Branding */}
            <div className="flex items-center justify-start h-16 border-b border-zinc-200 dark:border-zinc-700">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 ml-4 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    {!collapsed && (
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    )}
                </a>
            </div>

            {/* Menu */}
            <ul className="flex-1 px-1 mt-4 space-y-2 overflow-y-auto font-medium">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href="#"
                            className={`flex items-center p-2 mx-2 text-sm text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors
              ${collapsed ? "justify-start" : "justify-start"}`}
                        >
                            <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white">
                                {item.icon}
                            </div>
                            {!collapsed && (
                                <span className="ml-3">{item.name}</span>
                            )}
                        </a>
                    </li>
                ))}
            </ul>

            <hr className="opacity-30"/>

            {/* Footer Items */}
            <ul className="px-1 mt-6 mb-4 space-y-2 font-medium">
                {footerItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href="#"
                            className={`flex items-center p-2 mx-2 mb-2 text-sm text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors
              ${collapsed ? "justify-start" : "justify-start"}`}
                        >
                            <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white">
                                {item.icon}
                            </div>
                            {!collapsed && (
                                <span className="ml-3">{item.name}</span>
                            )}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
