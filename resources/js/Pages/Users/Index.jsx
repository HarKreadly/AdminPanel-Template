import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import UsersTable from "@/Components/UsersTable";
import { LuDownload } from "react-icons/lu";
import Breadcrumb from "@/Components/Breadcrumb";
import * as XLSX from "xlsx";

export default function Index({ users = [] }) {
    const handleExportToExcel = () => {
        // Prepare data for export
        const exportData = users.map((user) => ({
            ID: user.id,
            Name: user.name,
            "First Name": user.first_name,
            "Middle Name": user.middle_name,
            "Last Name": user.last_name,
            Email: user.email,
            Phone: user.phone,
            "Date of Birth": user.date_of_birth,
            Gender: user.gender,
            Country: user.country,
            City: user.city,
            Province: user.province,
            Address: user.address,
            "Zip Code": user.zip_code,
            "Time Zone": user.time_zone,
            Role: user.role,
            Status: user.status,
            Verified: user.verified ? "Yes" : "No",
            "Created At": user.created_at,
            "Updated At": user.updated_at,
            "Deleted At": user.deleted_at || "N/A",
            "Is Deleted": user.is_deleted ? "Yes" : "No",
        }));

        // Create workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Auto-size columns
        const maxWidth = 50;
        const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
            wch: Math.min(
                Math.max(
                    key.length,
                    ...exportData.map((row) => String(row[key] || "").length)
                ),
                maxWidth
            ),
        }));
        worksheet["!cols"] = colWidths;

        // Generate filename with current date
        const date = new Date().toISOString().split("T")[0];
        const filename = `users_export_${date}.xlsx`;

        // Download file
        XLSX.writeFile(workbook, filename);
    };

    const handleAddUser = () => {
        router.visit(route("users.create"));
    };
    return (
        <AppLayout header={<h2>Users</h2>}>
            <Head title="Users" />

            <div className="py-6">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Users", href: "/users" },
                        ]}
                    />

                    <div className="flex flex-col mt-6 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden ">
                        {/* Header Section */}
                        <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                            Users
                        </div>

                        {/* Content + Actions */}
                        <div className="flex justify-between items-center p-6 bg-white dark:bg-zinc-900">
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 max-w-2xl">
                                Browse a list of users, manage their roles and
                                permissions, and perform actions such as
                                suspending or deleting accounts.
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleExportToExcel}
                                    className="bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors"
                                >
                                    <LuDownload />
                                    Export data
                                </button>

                                <button
                                    onClick={handleAddUser}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors"
                                >
                                    <FaPlus />
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <UsersTable
                            users={users}
                            onAddUser={handleAddUser}
                            onExportUsers={handleExportToExcel}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
