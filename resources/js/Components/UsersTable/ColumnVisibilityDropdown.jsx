import React from "react";
import { FiEye } from "react-icons/fi";

export default function ColumnVisibilityDropdown({
    visibleColumns,
    toggleColumn,
    isOpen,
    setIsOpen,
}) {
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                title="Column Visibility"
            >
                <FiEye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-2 z-50">
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-zinc-700">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                                Column Visibility
                            </p>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {Object.entries(visibleColumns).map(
                                ([column, visible]) => (
                                    <label
                                        key={column}
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer transition-colors duration-150"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={visible}
                                            onChange={() => toggleColumn(column)}
                                            className="rounded border-gray-300 dark:border-zinc-600"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                            {column === "joinDate"
                                                ? "Join Date"
                                                : column}
                                        </span>
                                    </label>
                                )
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
