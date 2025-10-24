import React from "react";
import { FiEdit, FiDownload, FiUserPlus, FiTrash2 } from "react-icons/fi";

const baseButtonClasses =
    "p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";

const interactiveClasses =
    "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400";

const disabledClasses = "opacity-50 cursor-not-allowed text-gray-400";

export default function ActionButtons({
    onEdit = () => {},
    onExport = () => {},
    onAdd = () => {},
    onDelete = () => {},
    canEdit = false,
    canDelete = false,
}) {
    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                onClick={onEdit}
                disabled={!canEdit}
                className={`${baseButtonClasses} ${
                    canEdit ? interactiveClasses : disabledClasses
                }`}
                title={canEdit ? "Edit selected" : "Select one user to edit"}
            >
                <FiEdit className="w-5 h-5" />
            </button>
            <button
                type="button"
                onClick={onExport}
                className={`${baseButtonClasses} ${interactiveClasses}`}
                title="Export"
            >
                <FiDownload className="w-5 h-5" />
            </button>
            <button
                type="button"
                onClick={onAdd}
                className={`${baseButtonClasses} ${interactiveClasses}`}
                title="Add User"
            >
                <FiUserPlus className="w-5 h-5" />
            </button>
            <button
                type="button"
                onClick={onDelete}
                disabled={!canDelete}
                className={`${baseButtonClasses} ${
                    canDelete ? interactiveClasses : disabledClasses
                }`}
                title={canDelete ? "Delete selected" : "Select one user to delete"}
            >
                <FiTrash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
