import { IoIosArrowDown } from "react-icons/io";

export default function AccordionItem({ 
    id, 
    title, 
    isOpen, 
    onToggle, 
    children, 
    titleClassName = "text-zinc-800 dark:text-zinc-200",
    className = "bg-white",
}) {
    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden">
            <button
                onClick={() => onToggle(id)}
                className={`flex justify-between items-center w-full p-4 font-medium ${titleClassName} bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-950 transition`}
            >
                <span>{title}</span>
                <IoIosArrowDown
                    className={`w-4 h-4 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className={`dark:bg-zinc-900 p-6 border-t border-zinc-200 dark:border-zinc-800 ${className}`}>
                    {children}
                </div>
            )}
        </div>
    );
}
