import React from "react";
import AppNavItem from "../AppNavItem";

export default function Section({ items, collapsed, className = "" }) {
    return (
        <>
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
