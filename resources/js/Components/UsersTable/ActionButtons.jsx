import React from "react";
import { FiEdit, FiDownload, FiUserPlus, FiTrash2 } from "react-icons/fi";

export default function ActionButtons() {
    return (
        <>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                title="Edit"
            >
                <FiEdit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                title="Export"
            >
                <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                title="Add User"
            >
                <FiUserPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                title="Delete"
            >
                <FiTrash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
        </>
    );
}
