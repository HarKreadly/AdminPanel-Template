import React from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Pagination({
    currentPage,
    totalPages,
    setCurrentPage,
    filteredCount,
    itemsPerPage,
}) {
    return (
        <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                    We have found
                    {filteredCount > 0
                        ? ` ${
                              (currentPage - 1) * itemsPerPage + 1
                          } to ${Math.min(
                              currentPage * itemsPerPage,
                              filteredCount
                          )} of ${filteredCount}`
                        : " 0 to 0 of 0"}
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                        title="First page"
                    >
                        <div className="flex">
                            <FiChevronDown className="w-3 h-3 rotate-90" />
                            <FiChevronDown className="w-3 h-3 rotate-90 -ml-1.5" />
                        </div>
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                        title="Previous page"
                    >
                        <FiChevronDown className="w-4 h-4 rotate-90" />
                    </button>
                    <span className="px-4 text-gray-700 dark:text-gray-300 font-medium">
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                            )
                        }
                        disabled={
                            currentPage === totalPages || totalPages === 0
                        }
                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                        title="Next page"
                    >
                        <FiChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={
                            currentPage === totalPages || totalPages === 0
                        }
                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
                        title="Last page"
                    >
                        <div className="flex">
                            <FiChevronDown className="w-3 h-3 -rotate-90" />
                            <FiChevronDown className="w-3 h-3 -rotate-90 -ml-1.5" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
