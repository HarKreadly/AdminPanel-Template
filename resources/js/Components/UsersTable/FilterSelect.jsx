import React from "react";

export default function FilterSelect({ value, onChange, options, label }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="pl-3 pr-8 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/50 appearance-none dark:text-white transition-colors duration-200"
                aria-label={label}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
