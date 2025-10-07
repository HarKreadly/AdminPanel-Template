import { useRef, useState, useCallback } from "react";
import { MdRotateLeft, MdRotateRight } from "react-icons/md";
import Cropper from "react-easy-crop";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, targetWidth = 500, targetHeight = 500) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to target dimensions
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Calculate the center of the canvas
    const centerX = targetWidth / 2;
    const centerY = targetHeight / 2;

    // Save the context state
    ctx.save();

    // Move to center, rotate, then move back
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    // Calculate scaling to fit the cropped area into target dimensions
    const scaleX = targetWidth / pixelCrop.width;
    const scaleY = targetHeight / pixelCrop.height;

    // Draw the cropped and rotated image, scaled to target size
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        targetWidth,
        targetHeight
    );

    // Restore the context state
    ctx.restore();

    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                resolve(blob);
            },
            "image/jpeg",
            0.92 // Quality optimization
        );
    });
}

export default function ProfilePictureAccordion() {
    const user = usePage().props.auth.user;
    const inputRef = useRef();
    const triggerFileSelectPopup = () => {
        inputRef.current?.click();
    };

    const [profileImage, setProfileImage] = useState(user.profile_picture ? `/storage/${user.profile_picture}` : null);
    const [tempImage, setTempImage] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedBlob, setCroppedBlob] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        profile_picture: null,
        _method: 'patch'
    });

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate file type
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
                alert(
                    "Please select a valid image file (JPEG, PNG, GIF, WebP, BMP, or SVG)"
                );
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result);
                setShowCropModal(true);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setRotation(0);
            };
            reader.onerror = () => {
                alert("Error reading file. Please try another image.");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyCrop = async () => {
        if (tempImage && croppedAreaPixels) {
            const croppedBlob = await getCroppedImg(
                tempImage,
                croppedAreaPixels,
                rotation,
                500,
                500
            );
            const croppedImageUrl = URL.createObjectURL(croppedBlob);
            setProfileImage(croppedImageUrl);
            setCroppedBlob(croppedBlob);
            setData('profile_picture', croppedBlob);
            setShowCropModal(false);
            setTempImage(null);
        }
    };

    const handleCancelCrop = () => {
        setShowCropModal(false);
        setTempImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
    };

    const handleRotateLeft = () => {
        setRotation((prev) => (prev - 90) % 360);
    };

    const handleRotateRight = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setCroppedBlob(null);
        setData('profile_picture', null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (croppedBlob) {
            // Upload new picture
            setData('profile_picture', croppedBlob);
            
            post(route('profile.picture.update'), {
                forceFormData: true,
                onSuccess: () => {
                    setCroppedBlob(null);
                },
                onError: (errors) => {
                    console.error('Upload error:', errors);
                }
            });
        } else if (profileImage === null) {
            // Handle deletion
            setData('profile_picture', null);
            post(route('profile.picture.update'), {
                onSuccess: () => {
                    setCroppedBlob(null);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                }
            });
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl">
                <img
                    className="rounded-full w-64 h-64 object-cover bg-zinc-200 dark:bg-zinc-700 cursor-pointer flex-shrink-0"
                    src={profileImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name || 'User') + "&size=300&background=random"}
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
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 ">
                        {user.bio || 'No bio available'}
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
                    <PrimaryButton disabled={processing || (!croppedBlob && profileImage !== null)}>
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

            {/* Crop Modal */}
            {showCropModal && tempImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ margin: 0, width: "100vw", height: "100vh" }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleCancelCrop}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex">
                        {/* Main Content Area */}
                        <div className="flex-1">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                    Crop Profile Picture
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleRotateLeft}
                                        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition shadow-sm"
                                        title="Rotate Left"
                                    >
                                        <MdRotateLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleRotateRight}
                                        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition shadow-sm"
                                        title="Rotate Right"
                                    >
                                        <MdRotateRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Cropper Area */}
                            <div className="relative h-96 bg-zinc-100 dark:bg-zinc-800">
                                <Cropper
                                    image={tempImage}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={1}
                                    cropShape="round"
                                    showGrid={false}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            {/* Zoom Slider */}
                            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Zoom
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) =>
                                        setZoom(Number(e.target.value))
                                    }
                                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 flex justify-end gap-3 bg-zinc-50 dark:bg-zinc-800/50">
                                <button
                                    onClick={handleCancelCrop}
                                    className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleApplyCrop}
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Sidebar with Rotate Buttons */}
                        {/* <div className="w-20 bg-zinc-100 dark:bg-zinc-800 border-l border-zinc-200 dark:border-zinc-700 flex flex-col items-center gap-4 py-6">
                            <button
                                onClick={handleRotateLeft}
                                className="p-3 rounded-lg bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
                                title="Rotate Left"
                            >
                                <MdRotateLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleRotateRight}
                                className="p-3 rounded-lg bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
                                title="Rotate Right"
                            >
                                <MdRotateRight className="w-6 h-6" />
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}
