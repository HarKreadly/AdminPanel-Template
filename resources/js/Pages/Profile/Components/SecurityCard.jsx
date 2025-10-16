import React from "react";
import { HiShieldCheck, HiIdentification, HiCheckCircle, HiXCircle, HiLockClosed } from "react-icons/hi";

export default function SecurityCard({ user }) {
    return (
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Security & Verification
            </div>

            <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <HiShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Two-Factor
                                    Authentication
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.two_factor_enabled
                                        ? "Enabled"
                                        : "Disabled"}
                                </p>
                            </div>
                        </div>
                        {user.two_factor_enabled ? (
                            <HiLockClosed className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <HiXCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                    </div>

                    <div className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <HiIdentification className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Identity Verified
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.identity_verified_at
                                        ? "Verified"
                                        : "Not Verified"}
                                </p>
                            </div>
                        </div>
                        {user.identity_verified_at ? (
                            <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <HiXCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
