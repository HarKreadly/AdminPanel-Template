import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import AppNavbar from "@/Components/AppNavbar";
import AppAside from "@/Components/AppAside";
import AppMain from "@/Components/AppMain";

export default function AppLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [collapsed, setCollapsed] = useState(() => {
        // Load from localStorage on first render
        return localStorage.getItem("sidebarCollapsed") === "true";
    });

    const toggleSidebar = () => {
        setCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebarCollapsed", newState);
            return newState;
        });
    };

    // Sync when manually modified (e.g. across multiple tabs)
    useEffect(() => {
        const syncCollapsed = () => {
            setCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
        };
        window.addEventListener("storage", syncCollapsed);
        return () => window.removeEventListener("storage", syncCollapsed);
    }, []);

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-zinc-800">
            <AppAside collapsed={collapsed} />

            <AppMain collapsed={collapsed}>
                <AppNavbar collapsed={collapsed} toggleSidebar={toggleSidebar} header={header} />
                {children}
            </AppMain>
        </div>
    );
}
