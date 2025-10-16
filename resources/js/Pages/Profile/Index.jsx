import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi";
import Breadcrumb from "@/Components/Breadcrumb";
import ProfileHeader from "./Components/ProfileHeader";
import ProfileStats from "./Components/ProfileStats";
import ContactInfoCard from "./Components/ContactInfoCard";
import PersonalInfoCard from "./Components/PersonalInfoCard";
import AddressInfoCard from "./Components/AddressInfoCard";
import SecurityCard from "./Components/SecurityCard";
import SessionsCard from "./Components/SessionsCard";

export default function Index({ user, sessions = [], auth }) {
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold">User Profile</h2>
                    </div>
                </div>
            }
        >
            <Head title={`Profile - ${user.name}`} />

            <div className="py-6">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Management", href: "/dashboard" },
                            { label: "Users", href: "/users" },
                            { label: user.name, href: `/users/${user.id}` },
                        ]}
                    />

                    {/* Admin Alert if viewing deleted account */}
                    {user.deleted_at && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <HiTrash className="w-5 h-5 text-red-600 dark:text-red-400" />
                                <div>
                                    <p className="text-sm font-semibold text-red-900 dark:text-red-200">
                                        This account has been deleted
                                    </p>
                                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                        Deleted on{" "}
                                        {new Date(
                                            user.deleted_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Header */}
                    <ProfileHeader user={user} />

                    {/* Quick Stats Row */}
                    <ProfileStats user={user} sessions={sessions} />

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Contact Information */}
                            <ContactInfoCard user={user} />

                            {/* Personal Information */}
                            <PersonalInfoCard user={user} />

                            {/* Address Information */}
                            <AddressInfoCard user={user} />
                        </div>

                        {/* Right Column - User Sessions/Security */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Security & Verification */}
                            <SecurityCard user={user} />

                            {/* Active Sessions */}
                            <SessionsCard sessions={sessions} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
