import React from "react";
import AppNavItem from "../AppNavItem";

export default function Section({ items, collapsed, className = "" }) {
    return (
        <>
            <hr className="dark:opacity-30 opacity-100 transition-all duration-300" />
            <ul className={`font-medium ${className}`}>
                {items.map((item) => (
                    <AppNavItem
                        key={item.name}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </ul>
        </>
    );
}
