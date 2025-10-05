import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-900">
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
