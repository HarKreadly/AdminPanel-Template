import React from "react";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";

export default function ContactInfoCard({ user }) {
    return (
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Contact Information
            </div>
            <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <HiMail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                Email
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                                {user.email}
                            </p>
                            {user.email_verified_at && (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                                    <HiCheckCircle className="w-3 h-3" />
                                    Verified on{" "}
                                    {new Date(
                                        user.email_verified_at
                                    ).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                    {user.phone ? (
                        <div className="flex items-start gap-3">
                            <HiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Phone
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.phone}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 opacity-50">
                            <HiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Phone
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    Not provided
                                </p>
                            </div>
                        </div>
                    )}
                    {user.city || user.country ? (
                        <div className="flex items-start gap-3">
                            <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Location
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {[
                                        user.city,
                                        user.province,
                                        user.country,
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 opacity-50">
                            <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Location
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    Not provided
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
