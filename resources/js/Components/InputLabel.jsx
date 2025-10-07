export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-700 dark:text-zinc-200 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
