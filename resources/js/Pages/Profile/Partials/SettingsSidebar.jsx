import { usePage } from '@inertiajs/react';

export default function SettingsSidebar({ sections, selectedSection, onSectionChange, getSectionIcon }) {
    const user = usePage().props.auth.user;

    return (
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden sticky top-6">
                {/* Profile Info Section - Top Left */}
                <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <img
                            className="rounded-full w-16 h-16 object-cover bg-zinc-200 dark:bg-zinc-700"
                            src={user.profile_picture ? `/storage/${user.profile_picture}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&size=100&background=random`}
                            alt="Profile Picture"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Items Container */}
                <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-700 mt-2">
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => onSectionChange(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                                    selectedSection === section.id
                                        ? "bg-blue-600 text-white border border-blue-500"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                <div className={`transition-colors duration-200 ${
                                    selectedSection === section.id
                                        ? "text-white"
                                        : "text-gray-500 dark:text-gray-400"
                                }`}>
                                    {getSectionIcon(section.icon)}
                                </div>
                                <span className="flex-1">{section.label}</span>
                                {selectedSection === section.id && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
