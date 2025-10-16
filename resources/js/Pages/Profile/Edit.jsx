import { useState } from "react";
import { Head } from "@inertiajs/react";
import { HiUser, HiLockClosed, HiTrash } from "react-icons/hi";
import AppLayout from "@/Layouts/AppLayout";
import SettingsSidebar from "./Partials/SettingsSidebar";
import ProfileSection from "./Partials/ProfileSection";
import PasswordSection from "./Partials/PasswordSection";
import DeleteAccountSection from "./Partials/DeleteAccountSection";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Edit({ mustVerifyEmail, status }) {
    const [selectedSection, setSelectedSection] = useState("profile");

    const sections = [
        { id: "profile", label: "Profile Information", icon: "user" },
        { id: "security", label: "Security Information", icon: "lock" },
        { id: "delete", label: "Account Management", icon: "trash" },
    ];

    const getSectionIcon = (iconName) => {
        const icons = {
            user: <HiUser className="w-5 h-5" />,
            lock: <HiLockClosed className="w-5 h-5" />,
            trash: <HiTrash className="w-5 h-5" />,
        };
        return icons[iconName] || <HiUser className="w-5 h-5" />;
    };
    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold">
                            Profile Settings
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Dashboard", href: "/dashboard" },
                            {
                                label: "Profile Settings",
                                href: "/settings/edit",
                            },
                        ]}
                    />

                    {/* Settings Overview Card */}
                    <div className="mt-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Profile Management
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Manage your profile information, security
                                settings, and account preferences
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <SettingsSidebar
                                    sections={sections}
                                    selectedSection={selectedSection}
                                    onSectionChange={setSelectedSection}
                                    getSectionIcon={getSectionIcon}
                                />

                                <div className="lg:col-span-3 space-y-6">
                                    {selectedSection === "profile" && (
                                        <div className="">
                                            <ProfileSection
                                                mustVerifyEmail={
                                                    mustVerifyEmail
                                                }
                                                status={status}
                                            />
                                        </div>
                                    )}

                                    {selectedSection === "security" && (
                                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Security Settings
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    Manage your password and
                                                    security preferences
                                                </p>
                                            </div>
                                            <div className="p-6">
                                                <PasswordSection />
                                            </div>
                                        </div>
                                    )}

                                    {selectedSection === "delete" && (
                                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Account Management
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    Manage your account settings
                                                    and deletion options
                                                </p>
                                            </div>
                                            <div className="p-6">
                                                <DeleteAccountSection />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
