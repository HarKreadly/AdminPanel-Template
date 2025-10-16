export default function SettingsSidebar({ sections, selectedSection, onSectionChange, getSectionIcon }) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden sticky top-6">
                <div className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700 uppercase">
                    Settings Navigation
                </div>
                <div className="p-4">
                    <nav className="space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => onSectionChange(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                                    selectedSection === section.id
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                {getSectionIcon(section.icon)}
                                <span className="flex-1">{section.label}</span>
                                {selectedSection === section.id && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
