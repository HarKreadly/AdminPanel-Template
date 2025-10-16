import { HiExclamation } from "react-icons/hi";
import DeleteUserForm from "./DeleteUserForm";

export default function DeleteAccountSection() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 uppercase flex items-center gap-2">
                <HiExclamation className="w-4 h-4" />
                Danger Zone
            </div>
            <div className="p-4">
                <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Delete Account
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                </div>
                <DeleteUserForm />
            </div>
        </div>
    );
}
