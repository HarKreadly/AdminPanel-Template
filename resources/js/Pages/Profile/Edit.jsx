import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import SettingsSidebar from "./Partials/SettingsSidebar";
import ProfileSection from "./Partials/ProfileSection";
import PasswordSection from "./Partials/PasswordSection";
import DeleteAccountSection from "./Partials/DeleteAccountSection";

export default function Edit({ mustVerifyEmail, status }) {
    const [selectedSection, setSelectedSection] = useState("profile");
    const [openAccordion, setOpenAccordion] = useState([
        "profile_picture",
        "profile",
        "adresses",
        "password",
        "delete",
    ]);

    const toggleAccordion = (id) => {
        setOpenAccordion((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const sections = [
        { id: "profile", label: "Profile Information" },
        { id: "password", label: "Update Password" },
        { id: "delete", label: "Delete Account" },
    ];

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-8 ">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Fixed Sidebar */}
                        <SettingsSidebar
                            sections={sections}
                            selectedSection={selectedSection}
                            onSectionChange={setSelectedSection}
                        />

                        {/* Scrollable Content Area */}
                        <section className="flex-1 space-y-4 min-h-auto">
                            {selectedSection === "profile" && (
                                <ProfileSection
                                    openAccordion={openAccordion}
                                    toggleAccordion={toggleAccordion}
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            )}

                            {selectedSection === "password" && (
                                <PasswordSection
                                    openAccordion={openAccordion}
                                    toggleAccordion={toggleAccordion}
                                />
                            )}

                            {selectedSection === "delete" && (
                                <DeleteAccountSection
                                    openAccordion={openAccordion}
                                    toggleAccordion={toggleAccordion}
                                />
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
