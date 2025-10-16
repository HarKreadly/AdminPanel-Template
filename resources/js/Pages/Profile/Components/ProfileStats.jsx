import React from "react";
import { HiClock, HiDesktopComputer, HiCalendar } from "react-icons/hi";

export default function ProfileStats({ user, sessions = [] }) {
    // Calculate profile completion
    const calculateProfileCompletion = () => {
        // NOTE: Added 'user.province' to fields list if it's used in Location display.
        const fields = [
            user.first_name,
            user.last_name,
            user.phone,
            user.date_of_birth,
            user.gender,
            user.bio,
            user.country,
            user.city,
            user.province, // Added province for completeness
            user.address,
            user.profile_picture,
        ];
        const filled = fields.filter(
            (field) => field !== null && field !== undefined && field !== ""
        ).length;
        return Math.round((filled / fields.length) * 100);
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

    // Get last activity
    const getLastActivity = () => {
        if (!sessions || sessions.length === 0) return "Never";
        // sessions[0] should be the latest, but let's ensure it by sorting if we can't guarantee order.
        // Assuming sessions is already sorted by 'last_activity' descending (most recent first).
        const lastSession = sessions[0];
        const lastActive = new Date(lastSession.last_activity * 1000); // last_activity is a Unix timestamp (seconds)
        const now = new Date();
        const diffMinutes = Math.floor((now - lastActive) / 60000); // Difference in milliseconds divided by 60000

        if (diffMinutes < 1) return "Just now";
        if (diffMinutes < 60)
            return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
        if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        }
        const days = Math.floor(diffMinutes / 1440);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    };

    const profileCompletion = calculateProfileCompletion();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Last Activity
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {getLastActivity()}
                        </p>
                    </div>
                    <HiClock className="w-8 h-8 text-gray-400" />
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Active Sessions
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {sessions?.length || 0}
                        </p>
                    </div>
                    <HiDesktopComputer className="w-8 h-8 text-gray-400" />
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Profile Completion
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {profileCompletion}%
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {profileCompletion}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Account Age
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {getAccountAge(user.created_at)}
                        </p>
                    </div>
                    <HiCalendar className="w-8 h-8 text-gray-400" />
                </div>
            </div>
        </div>
    );
}
