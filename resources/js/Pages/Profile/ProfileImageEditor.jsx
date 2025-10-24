import { useMemo } from "react";

const PLACEHOLDER_IMAGE = "/docs/images/examples/image-4@2x.jpg";

export default function ProfileImageEditor({
    image,
    onEdit,
    onRemove,
    onFileSelected,
    inputRef,
}) {
    const previewSrc = useMemo(
        () => image || PLACEHOLDER_IMAGE,
        [image],
    );

    const handleFileChange = (event) => {
        if (!event.target.files?.length) {
            return;
        }

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            onFileSelected(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <img
                className="rounded-full w-32 h-32 object-cover bg-zinc-200 dark:bg-zinc-700"
                src={previewSrc}
                alt="Profile"
            />

            <div className="flex flex-col items-center gap-2">
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFileChange}
                />

                <div className="flex gap-2">
                    <button
                        type="button"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => inputRef.current?.click()}
                    >
                        Change
                    </button>

                    {image && (
                        <button
                            type="button"
                            className="text-sm text-red-600 dark:text-red-400 hover:underline"
                            onClick={onRemove}
                        >
                            Remove
                        </button>
                    )}
                </div>

                {image && (
                    <button
                        type="button"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={onEdit}
                    >
                        Edit & Crop
                    </button>
                )}
            </div>
        </div>
    );
}
