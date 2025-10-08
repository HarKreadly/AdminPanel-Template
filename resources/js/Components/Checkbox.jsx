export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-zinc-600 shadow-sm focus:ring-zinc-500 ' +
                className
            }
        />
    );
}
