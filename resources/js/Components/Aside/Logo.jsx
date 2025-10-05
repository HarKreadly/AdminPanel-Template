import React from "react";

export default function Logo({ collapsed }) {
    return (
        <div className="flex items-center justify-start h-16 border-b border-zinc-200 dark:border-zinc-700 transition-all duration-300">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 ml-4 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                {!collapsed && (
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                )}
            </a>
        </div>
    );
}


