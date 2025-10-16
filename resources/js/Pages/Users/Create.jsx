import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import { FaPlus } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

export default function Create() {
    return (
        <AppLayout header={<h2>Users</h2>}>
            <Head title="Users" />

            <div className="py-6">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Management", href: "/dashboard" },
                            { label: "Users", href: "/users" },
                            { label: "Create", href: "/users/create" },
                        ]}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
