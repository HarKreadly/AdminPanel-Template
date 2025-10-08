import React from "react";
import Logo from "./Aside/Logo";
import Section from "./Aside/Section";
import { getMenuItems, getFooterItems } from "./Aside/items";

export default function AppAside({ collapsed }) {
    const asideClasses = `fixed top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
    } flex flex-col`;

    return (
        <aside className={asideClasses}>
    
            {/* Logo / Branding */}
            <Logo collapsed={collapsed} />

            {/* Menu */}
            <Section items={getMenuItems(route)} collapsed={collapsed} className="flex-1 px-1 mt-4 space-y-2" />

            {/* Footer Items */}
            <Section items={getFooterItems(route)} collapsed={collapsed} className="px-1 mt-4 mb-4 space-y-2 transition-all duration-300" />
        </aside>
    );
}
