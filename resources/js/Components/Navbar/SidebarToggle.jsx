import React from "react";
import {
    TbLayoutSidebarLeftExpandFilled,
    TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

export default function SidebarToggle({ collapsed, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
            {collapsed ? (
                <TbLayoutSidebarLeftExpandFilled className="w-6 h-6 text-zinc-600 dark:text-zinc-200" />
            ) : (
                <TbLayoutSidebarLeftCollapse className="w-6 h-6 text-zinc-600 dark:text-zinc-200" />
            )}
        </button>
    );
}


