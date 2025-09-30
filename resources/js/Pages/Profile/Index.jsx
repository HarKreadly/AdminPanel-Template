import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Index(header, children) {
    return (
        <AppLayout header={<h2>Profile</h2>}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h1>Profile</h1>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
