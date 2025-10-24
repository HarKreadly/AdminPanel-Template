import React from "react";
import { Link } from "@inertiajs/react";
import { TiHome } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {/* Home Link */}
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <TiHome className="mr-1 w-4 h-4" />
                        Home
                    </Link>
                </li>

                {/* Dynamic Breadcrumb Items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={index}
                            aria-current={isLast ? "page" : undefined}
                        >
                            <div className="flex items-center">
                                <FaChevronRight className="mr-1 w-4 h-4 text-gray-400 dark:text-gray-600" />
                                {isLast ? (
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
