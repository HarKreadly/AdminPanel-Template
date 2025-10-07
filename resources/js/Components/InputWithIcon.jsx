export default function InputWithIcon({
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    autoComplete,
    className = "",
    icon,
    ...props
}) {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className={`rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full ${icon ? 'ps-10' : ''} p-2.5 ${className}`}
                {...props}
            />
        </div>
    );
}
