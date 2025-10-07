export default function FormLabel({ htmlFor, children, className = "" }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}
        >
            {children}
        </label>
    );
}
