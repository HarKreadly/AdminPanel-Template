export default function SettingsSidebar({ sections, selectedSection, onSectionChange }) {
    return (
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 h-fit self-start">
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-4">
                Settings
            </h3>
            <nav className="space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedSection === section.id
                                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
