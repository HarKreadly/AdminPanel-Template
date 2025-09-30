import React from "react";
import { InboxIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { PiPackageFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import AppNavItem from "./AppNavItem";
import { IoExit } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";



const iconClass = "w-5 h-5";

export default function AppAside({ collapsed }) {
    const menuItems = [
        { name: "Dashboard", icon: <MdSpaceDashboard className={iconClass} />, href: route("dashboard"), activeWhen: "dashboard" },
        { name: "Inbox", icon: <InboxIcon className={iconClass} />, href: "#", activeWhen: "inbox.*" },
        { name: "Users", icon: <HiUsers className={iconClass} />, href: "#", activeWhen: "users.*" },
        { name: "Products", icon: <PiPackageFill className={iconClass} />, href: "#", activeWhen: "products.*" },
    ];
    
    const footerItems = [
        { name: "Profile", icon: <BiSolidUser className={iconClass} />, href: route("profile.index"), activeWhen: "profile.index", method: "get" },
        { name: "Settings", icon: <IoMdSettings className={iconClass} />, href: route("profile.edit"), activeWhen: "profile.edit", method: "get" },
        { name: "Sign Out", icon: <IoExit className={iconClass} />, href: route("logout"), activeWhen: "logout", method: "post" },
    ];
    

    const asideClasses = `fixed top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
    } flex flex-col`;

    const logoClasses = "flex items-center justify-start h-16 border-b border-zinc-200 dark:border-zinc-700 transition-all duration-300";
    const menuClasses = "flex-1 px-1 mt-4 space-y-2 overflow-y-auto font-medium";
    const footerClasses = "px-1 mt-6 mb-4 space-y-2 font-medium";

    return (
        <aside className={asideClasses}>
            <hr className="opacity-0  transition-all duration-300" />

            {/* Logo / Branding */}
            <div className={logoClasses}>
                <a href="https://flowbite.com/" className="flex items-center space-x-3 ml-4 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    {!collapsed && (
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    )}
                </a>
            </div>

            {/* Menu */}
            <ul className={menuClasses}>
                {menuItems.map((item) => (
                    <AppNavItem key={item.name} item={item} collapsed={collapsed} />
                ))}
            </ul>

            <hr className="opacity-30" />

            {/* Footer Items */}
            <ul className={footerClasses}>
                {footerItems.map((item) => (
                    <AppNavItem key={item.name} item={item} collapsed={collapsed} />
                ))}
            </ul>
        </aside>
    );
}
