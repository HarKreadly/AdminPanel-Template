export default function FormInput({
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    autoComplete,
    className = "",
    icon = null,
    ...props
}) {
    if (icon) {
        return (
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    {icon}
                </div>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
                    {...props}
                />
            </div>
        );
    }

    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
            {...props}
        />
    );
}
