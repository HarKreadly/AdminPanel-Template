import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Index(header, children) {
    return (
        <AppLayout header={<h2>Profile</h2>}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to users Profile Page!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
