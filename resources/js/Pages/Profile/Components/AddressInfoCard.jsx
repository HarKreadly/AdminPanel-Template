import React from "react";

export default function AddressInfoCard({ user }) {
    if (!user.address) return null;

    return (
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Address Information
            </div>
            <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                            Street Address
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.address}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {user.city && (
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    City
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.city}
                                </p>
                            </div>
                        )}
                        {user.province && (
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Province/State
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.province}
                                </p>
                            </div>
                        )}
                        {user.zip_code && (
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Zip Code
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.zip_code}
                                </p>
                            </div>
                        )}
                        {user.country && (
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Country
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.country}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
