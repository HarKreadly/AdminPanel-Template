import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoNotifications, IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";

export default function NotificationsButton({
    count = 0,
    open,
    onToggle,
    onClose,
}) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (open) panelRef.current?.focus?.();
    }, [open]);

    return (
        <>
            <button
                onClick={onToggle}
                className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative"
            >
                <IoNotifications className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                {count > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {count}
                    </span>
                )}
            </button>

            {createPortal(
                <Transition show={open} as={React.Fragment}>
                    {/* Overlay */}
                    <Transition.Child
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/50 z-[60]"
                            onClick={onClose}
                        />
                    </Transition.Child>

                    {/* Sliding panel */}
                    <Transition.Child
                        enter="transition-transform duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <aside
                            ref={panelRef}
                            tabIndex={-1}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") onClose?.();
                            }}
                            role="dialog"
                            aria-modal="true"
                            className="fixed top-0 right-0 h-screen w-80 max-w-[90vw] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 z-[70] shadow-xl flex flex-col outline-none"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                                    Notifications
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    aria-label="Close notifications"
                                >
                                    <IoClose className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                    You are all caught up.
                                </div>
                            </div>
                        </aside>
                    </Transition.Child>
                </Transition>,
                document.body
            )}
        </>
    );
}
