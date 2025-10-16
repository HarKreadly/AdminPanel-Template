import UpdatePasswordForm from "./UpdatePasswordForm";

export default function PasswordSection() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                Password & Security
            </div>
            <div className="p-4">
                <UpdatePasswordForm />
            </div>
        </div>
    );
}
