import React, { useState } from "react";
import { FiPhone, FiMail, FiMoreVertical } from "react-icons/fi";

export default function UserRow({
    user,
    visibleColumns,
    selectedUsers,
    handleSelectUser,
    calculateAge,
    getAvatarColor,
    getRoleBadge,
    getStatusBadge,
}) {
    const [activeDropdown, setActiveDropdown] = useState(false);

    return (
        <tr className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors duration-150">
            <td className="px-4 py-4">
                <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-700 w-4 h-4"
                />
            </td>
            {visibleColumns.id && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.id}
                    </span>
                </td>
            )}
            {visibleColumns.name && (
                <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                        {user.profile_picture ? (
                            <img
                                src={`/storage/${user.profile_picture}`}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(
                                    user.name
                                )}`}
                            >
                                {user.first_name?.charAt(0) ||
                                    user.name.charAt(0)}
                                {user.last_name?.charAt(0) || ""}
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.name}
                        </span>
                    </div>
                </td>
            )}
            {visibleColumns.email && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                    </span>
                </td>
            )}
            {visibleColumns.phone && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.phone || "-"}
                    </span>
                </td>
            )}
            {visibleColumns.gender && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {user.gender || "-"}
                    </span>
                </td>
            )}
            {visibleColumns.age && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {calculateAge(user.date_of_birth) || "-"}
                    </span>
                </td>
            )}
            {visibleColumns.role && (
                <td className="px-4 py-4">{getRoleBadge(user.role)}</td>
            )}
            {visibleColumns.status && (
                <td className="px-4 py-4">{getStatusBadge(user.status)}</td>
            )}
            {visibleColumns.verified && (
                <td className="px-4 py-4">
                    <span
                        className={`text-sm ${
                            user.verified
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-400"
                        }`}
                    >
                        {user.verified ? "✓" : "✗"}
                    </span>
                </td>
            )}
            {visibleColumns.location && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.city && user.country
                            ? `${user.city}, ${user.country}`
                            : "-"}
                    </span>
                </td>
            )}
            {visibleColumns.joinDate && (
                <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                    </span>
                </td>
            )}
            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors duration-150"
                        title="Call"
                    >
                        <FiPhone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors duration-150"
                        title="Email"
                    >
                        <FiMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setActiveDropdown(!activeDropdown)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors duration-150"
                        >
                            <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        {activeDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setActiveDropdown(false)}
                                />
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 z-50">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 transition-colors duration-150">
                                        View Profile
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 transition-colors duration-150">
                                        Edit
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 transition-colors duration-150">
                                        {user.status === "active"
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150">
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}
