import React from "react";
import { Link } from "@inertiajs/react";

export default function AppNavItem({ item, collapsed }) {
    const isActive = item.activeWhen ? route().current(item.activeWhen) : false;

    const baseClasses = `group flex items-center p-2 text-sm rounded-md transition-colors w-full`;

    const activeClasses =
        "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white";
    const inactiveClasses =
        "text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800";

    const iconClasses = isActive
        ? "flex-shrink-0 text-zinc-900 dark:text-white transition-all duration-300"
        : "flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all duration-300";

    const Icon = item.iconComponent;

    return (
        <li className="mx-2">
            <Link
                method={item.method ?? "get"}
                href={item.href ?? "#"}
                className={`${baseClasses} ${
                    isActive ? activeClasses : inactiveClasses
                }`}
            >
                <div
                    className={iconClasses}
                    style={{
                        transform: collapsed ? "translateX(0)" : "translateX(0)",
                    }}
                >
                    {Icon ? <Icon className="w-5 h-5" /> : null}
                </div>
                <span
                    className={`ml-3 overflow-hidden transition-all duration-300 ${
                        collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
                    }`}
                >
                    {item.name}
                </span>
            </Link>
        </li>
    );
}

