import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    HiMail,
    HiPhone,
    HiLocationMarker,
    HiCalendar,
    HiUser,
    HiShieldCheck,
    HiCheckCircle,
    HiXCircle,
    HiPencil,
    HiIdentification,
    HiGlobe,
    HiOfficeBuilding,
    HiLockClosed,
    HiClock,
    HiDesktopComputer,
    HiChevronLeft,
    HiDotsVertical,
    HiTrash,
    HiBan,
    HiRefresh,
    HiDocumentText,
    HiKey,
} from "react-icons/hi";

export default function ProfileHeader({ user }) {
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    // Calculate account age
    const getAccountAge = (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months !== 1 ? "s" : ""}`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} year${years !== 1 ? "s" : ""}`;
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            inactive:
                "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
            banned: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        };
        const statusKey = status ? status.toLowerCase() : "inactive"; // Handle potentially missing/null status
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                    styles[statusKey] || styles.inactive
                }`}
            >
                {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
            </span>
        );
    };

    const getRoleBadge = (role) => {
        const styles = {
            user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
            company:
                "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
            admin: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        };
        const roleKey = role ? role.toLowerCase() : "user"; // Default to 'user' if role is missing
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                    styles[roleKey] || styles.user
                }`}
            >
                {roleKey.charAt(0).toUpperCase() + roleKey.slice(1)}
            </span>
        );
    };

    const getAvatarColor = (name) => {
        // Ensure name is not null/undefined before calling charCodeAt
        const safeName = name || "A";
        const colors = [
            "bg-blue-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-red-500",
            "bg-indigo-500",
        ];
        const index = safeName.charCodeAt(0) % colors.length;
        return colors[index];
    };

    // Fix: Ensure user.name is available for getAvatarColor if first/last name are missing.
    // Also ensuring user.first_name and user.last_name are available.
    const userFirstNameInitial = (user.first_name || user.name || "U").charAt(
        0
    );
    const userLastNameInitial = (user.last_name || "").charAt(0);

    const getHeaderBgColor = (role) => {
        const roleKey = role ? role.toLowerCase() : "user";
        const colors = {
            user: "bg-blue-100",
            company: "bg-purple-100",
            admin: "bg-orange-100",
        };
        return colors[roleKey] || colors.user;
    };

    return (
        <div className={`${getHeaderBgColor(user.role)} dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-6 mt-6`}>
            <div className="h-32 bg-gray-50 dark:bg-zinc-700"></div>

            <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start gap-6 -mt-16">
                    <div className="relative flex-shrink-0">
                        {user.profile_picture ? (
                            <img
                                src={`/storage/${user.profile_picture}`}
                                alt={user.name}
                                className="w-32 h-32 rounded-lg border-4 border-white dark:border-zinc-900 object-cover "
                            />
                        ) : (
                            <div
                                className={`w-32 h-32 rounded-lg border-4 border-white dark:border-zinc-900  ${getAvatarColor(
                                    user.name
                                )} flex items-center justify-center text-white text-3xl font-semibold`}
                            >
                                {userFirstNameInitial}
                                {userLastNameInitial}
                            </div>
                        )}
                        {user.verified && (
                            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                                <HiCheckCircle className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {user.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                    {user.verified && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/80 dark:text-blue-400 flex items-center gap-1">
                                            <HiCheckCircle className="w-4 h-4" />
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    User ID: #{user.id} • Joined{" "}
                                    {getAccountAge(user.created_at)} ago
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/users/${user.id}/edit`}
                                    className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <HiPencil className="w-4 h-4" />
                                    Edit
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setShowActionsMenu(!showActionsMenu)
                                        }
                                        className="p-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        <HiDotsVertical className="w-5 h-5" />
                                    </button>
                                    {showActionsMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() =>
                                                    setShowActionsMenu(false)
                                                }
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-20">
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 flex items-center gap-2">
                                                    <HiKey className="w-4 h-4" />
                                                    Reset Password
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 flex items-center gap-2">
                                                    <HiDocumentText className="w-4 h-4" />
                                                    View Activity Log
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200 flex items-center gap-2">
                                                    <HiBan className="w-4 h-4" />
                                                    {user.status === "banned"
                                                        ? "Unban User"
                                                        : "Ban User"}
                                                </button>
                                                {user.deleted_at && (
                                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 text-green-600 dark:text-green-400 flex items-center gap-2">
                                                        <HiRefresh className="w-4 h-4" />
                                                        Restore Account
                                                    </button>
                                                )}
                                                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                                    <HiTrash className="w-4 h-4" />
                                                    Delete Account
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {user.bio && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
