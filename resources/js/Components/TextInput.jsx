import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, placeholder = '', ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5 ${className}`}

            ref={localRef}
            placeholder={placeholder}
        />
    );
});
