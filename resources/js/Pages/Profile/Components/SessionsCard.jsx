import React from "react";
import { HiDesktopComputer } from "react-icons/hi";

export default function SessionsCard({ sessions = [] }) {
    return (
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Active Sessions ({sessions?.length || 0})
            </div>

            <div className="p-4 bg-white dark:bg-zinc-900">
                {sessions && sessions.length > 0 ? (
                    <div className="space-y-4">
                        {sessions.map((session, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border border-zinc-100 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <HiDesktopComputer className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {session.agent.browser} on{" "}
                                            {session.agent.platform}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {session.ip_address} •{" "}
                                            {session.is_current_device
                                                ? "This device"
                                                : `Last active ${new Date(
                                                      session.last_activity *
                                                          1000
                                                  ).toLocaleTimeString()}`}
                                        </p>
                                    </div>
                                </div>
                                {session.is_current_device && (
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        Current
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        <HiDesktopComputer className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No active sessions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
