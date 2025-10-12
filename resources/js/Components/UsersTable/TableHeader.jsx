import React from "react";
import { FaSort } from "react-icons/fa";

export default function TableHeader({
    visibleColumns,
    handleSort,
    sortField,
    handleSelectAll,
    selectedUsers,
    paginatedUsers,
}) {
    return (
        <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-800">
                <th className="px-4 py-3 text-left">
                    <input
                        type="checkbox"
                        checked={
                            selectedUsers.length === paginatedUsers.length &&
                            paginatedUsers.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 dark:border-zinc-700 w-4 h-4"
                    />
                </th>
                {visibleColumns.id && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("id")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            ID
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.name && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("name")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Name
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.email && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("email")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Email
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.phone && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Phone
                    </th>
                )}
                {visibleColumns.gender && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("gender")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Gender
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.age && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("age")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Age
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.role && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("role")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Role
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.status && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("status")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Status
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                {visibleColumns.verified && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Verified
                    </th>
                )}
                {visibleColumns.location && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Location
                    </th>
                )}
                {visibleColumns.joinDate && (
                    <th className="px-4 py-3 text-left">
                        <button
                            onClick={() => handleSort("created_at")}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150"
                        >
                            Join Date
                            <FaSort className="w-3 h-3" />
                        </button>
                    </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
    );
}
