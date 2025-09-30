import React from "react";
import { Link } from "@inertiajs/react";

export default function AppNavItem({ item, collapsed }) {
    const isActive = item.activeWhen ? route().current(item.activeWhen) : false;

    const baseClasses = `group flex items-center p-2 text-sm rounded-lg transition-colors w-full ${
        collapsed ? "justify-start" : "justify-start"
    }`;
    const activeClasses =
        "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white";
    const inactiveClasses =
        "text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800";

    const iconClasses = isActive
        ? "flex-shrink-0 text-zinc-900 dark:text-white"
        : "flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white";

    return (
        <li className="mx-2">
            <Link
                method={item.method ?? "get"}
                href={item.href ?? "#"}
                className={`${baseClasses} ${
                    isActive ? activeClasses : inactiveClasses
                }`}
            >
                <div className={iconClasses}>{item.icon}</div>
                {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
        </li>
    );
}
