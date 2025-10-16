import React from "react";
import { HiCalendar, HiUser } from "react-icons/hi";

export default function PersonalInfoCard({ user }) {
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

    return (
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Personal Information
            </div>
            <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="space-y-4">
                    {user.date_of_birth ? (
                        <div className="flex items-start gap-3">
                            <HiCalendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Date of Birth
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        user.date_of_birth
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                    {calculateAge(
                                        user.date_of_birth
                                    ) && (
                                        <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                                            (
                                            {calculateAge(
                                                user.date_of_birth
                                            )}{" "}
                                            years old)
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 opacity-50">
                            <HiCalendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Date of Birth
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                    Not provided
                                </p>
                            </div>
                        </div>
                    )}
                    {user.gender ? (
                        <div className="flex items-start gap-3">
                            <HiUser className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Gender
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                    {user.gender}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 opacity-50">
                            <HiUser className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                                    Gender
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
