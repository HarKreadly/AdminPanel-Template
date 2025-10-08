import { useRef, useState, useCallback } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import CropperModal from "./CropperModal";

export default function ProfilePictureAccordion() {
    const user = usePage().props.auth.user;
    const inputRef = useRef();
    const triggerFileSelectPopup = () => inputRef.current?.click();

    const [profileImage, setProfileImage] = useState(
        user.profile_picture ? `/storage/${user.profile_picture}` : null
    );
    const [tempImage, setTempImage] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [croppedBlob, setCroppedBlob] = useState(null);

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        profile_picture: null,
        _method: "patch",
    });

    const handleFileChange = (e) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];

        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/svg+xml",
        ];
        if (!validTypes.includes(file.type)) {
            alert("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setTempImage(reader.result);
            setShowCropModal(true);
        };
        reader.readAsDataURL(file);
    };

    const handleApplyCrop = (blob, previewUrl) => {
        setProfileImage(previewUrl);
        setCroppedBlob(blob);
        setData("profile_picture", blob);
        setShowCropModal(false);
    };

    const handleCancelCrop = () => {
        setShowCropModal(false);
        setTempImage(null);
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setCroppedBlob(null);
        setData("profile_picture", null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        post(route("profile.picture.update"), {
            forceFormData: true,
            onSuccess: () => setCroppedBlob(null),
        });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl">
                <img
                    className="rounded-full w-64 h-64 object-cover bg-zinc-200 dark:bg-zinc-700 cursor-pointer"
                    src={
                        profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || "User"
                        )}&size=300&background=random`
                    }
                    alt="Profile Picture"
                    onClick={triggerFileSelectPopup}
                />

                <div className="text-center md:text-left w-full md:w-auto">
                    <h1 className="font-bold text-zinc-800 dark:text-zinc-200 text-2xl">
                        {user.name}
                    </h1>
                    <h2 className="text-sm text-zinc-500 dark:text-zinc-400">
                        {user.email}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {user.bio || "No bio available"}
                    </p>

                    <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.svg"
                        ref={inputRef}
                        onChange={handleFileChange}
                    />

                    <div className="mt-2 flex gap-2 justify-center md:justify-start">
                        <button
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={triggerFileSelectPopup}
                        >
                            Change
                        </button>
                        {profileImage && (
                            <button
                                className="text-sm text-red-600 dark:text-red-400 hover:underline"
                                onClick={handleRemoveImage}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <form onSubmit={handleSave} className="mt-4" method="patch">
                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={
                            processing ||
                            (!croppedBlob && profileImage !== null)
                        }
                    >
                        Save
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>

            {/* Crop Modal Component */}
            <CropperModal
                show={showCropModal}
                image={tempImage}
                onCancel={handleCancelCrop}
                onApply={handleApplyCrop}
            />
        </>
    );
}
