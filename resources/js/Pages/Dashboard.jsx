import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Dashboard(header, children) {
    return (
        <AppLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Dashboard", href: "/dashboard" },
                        ]}
                    />

                    <div className="overflow-hidden bg-gray-50 border border-gray-300 sm:rounded-lg mt-6">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
