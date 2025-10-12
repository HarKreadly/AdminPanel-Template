import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import UsersTable from "@/Components/UsersTable";
import { LuDownload } from "react-icons/lu";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Index({ users = [] }) {
    return (
        <AppLayout header={<h2>Users</h2>}>
            <Head title="Users" />

            <div className="py-6">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Management", href: "/dashboard" },
                            { label: "Users", href: "/users" },
                        ]}
                    />
                    
                    <div className="flex flex-col mt-6 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden ">
                        {/* Header Section */}
                        <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                            Our products
                        </div>

                        {/* Content + Actions */}
                        <div className="flex justify-between items-center p-6 bg-white dark:bg-zinc-900">
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 max-w-2xl">
                                Browse a list of Flowbite products designed to
                                help you work and play, stay organized, get
                                answers, keep in touch, grow your business, and
                                more.
                            </p>

                            <div className="flex items-center gap-2">
                                <button className="bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 font-medium py-2 px-4 rounded flex items-center gap-2">
                                    <LuDownload />
                                    Export data
                                </button>

                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2">
                                    <FaPlus />
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <UsersTable users={users} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
