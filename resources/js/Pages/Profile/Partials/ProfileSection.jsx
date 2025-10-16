import ProfilePictureAccordion from "./ProfilePictureAccordion";
import UpdateProfileInformationForm from "./UpdateProfileInformationForm";
import UpdateAddressInformationForm from "./UpdateAddressInformationForm";

export default function ProfileSection({ mustVerifyEmail, status }) {
    return (
        <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                    Profile Picture
                </div>
                <div className="p-4">
                    <ProfilePictureAccordion />
                </div>
            </div>

            {/* Profile Information Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                    Personal Information
                </div>
                <div className="p-4">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                    Address Information
                </div>
                <div className="p-4">
                    <UpdateAddressInformationForm />
                </div>
            </div>
        </div>
    );
}
