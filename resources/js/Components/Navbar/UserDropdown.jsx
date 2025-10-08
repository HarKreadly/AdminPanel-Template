import React, { useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";

export default function UserDropdown({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const close = () => setOpen(false);
    
    const user = usePage().props.auth.user;
    const profilePicture = user?.profile_picture 
        ? `/storage/${user.profile_picture}` 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=128&background=random`;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900"
            >
                <img
                    src={profilePicture}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover"
                />
            </button>
            {open && (
                <>
                    {/* Backdrop for outside click */}
                    <div className="fixed inset-0 z-40" onClick={close} />
                    <div
                        className="absolute right-0 mt-4 w-48 bg-white dark:bg-zinc-900 rounded shadow-lg py-2 flex-col border border-zinc-300 dark:border-zinc-600 z-50 outline-none"
                        tabIndex={-1}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") close();
                        }}
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <Link
                            href={route("profile.index")}
                            className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            onClick={close}
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("profile.edit")}
                            className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            onClick={close}
                        >
                            Settings
                        </Link>
                        <div className="my-2 border-t border-zinc-200 dark:border-zinc-700" />
                        <button
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            role="menuitem"
                            aria-pressed={darkMode}
                        >
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                Dark mode
                            </span>
                            <span
                                className={`inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                    darkMode ? "bg-yellow-700" : "bg-zinc-300"
                                }`}
                                aria-hidden="true"
                            >
                                <span
                                    className={`h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        darkMode
                                            ? "translate-x-4"
                                            : "translate-x-1"
                                    }`}
                                />
                            </span>
                        </button>
                        <Link
                            href={route("logout")}
                            method="post"
                            className="flex items-center justify-start px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
                            onClick={close}
                        >
                            Logout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}