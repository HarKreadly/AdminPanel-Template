import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
    return (
        <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200"
            />
        </div>
    );
}
