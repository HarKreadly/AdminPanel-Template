import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { MdRotateLeft, MdRotateRight } from "react-icons/md";
import { HiPlus, HiMinus } from "react-icons/hi";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { RxCross2 } from "react-icons/rx";


const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.crossOrigin = "anonymous";
        image.src = url;
    });

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const size = 500;
    canvas.width = size;
    canvas.height = size;

    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-size / 2, -size / 2);

    const scaleX = size / pixelCrop.width;
    const scaleY = size / pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size,
        size
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
    });
}

export default function CropperModal({ show, image, onCancel, onApply }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleApply = async () => {
        if (!image || !croppedAreaPixels) return;
        const blob = await getCroppedImg(image, croppedAreaPixels, rotation);
        const previewUrl = URL.createObjectURL(blob);
        onApply(blob, previewUrl);
    };

    return (
        <Modal show={show} maxWidth="3xl" onClose={onCancel}>
            <div className="p-4 sm:p-6 h-full sm:h-auto flex flex-col relative">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition shadow-sm"
                    title="Close"
                >
                    <RxCross2/>
                </button>

                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        Crop Profile Picture
                    </h3>
                </div>

                {/* Cropper */}
                <div className="relative w-full flex-1 sm:flex-none sm:h-96 lg:h-[500px] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                    <Cropper
                        image={image}
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

                {/* Rotation Controls (under canvas) */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setRotation((prev) => (prev - 90) % 360)}
                        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition shadow-sm"
                        title="Rotate Left"
                    >
                        <MdRotateLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setRotation((prev) => (prev + 90) % 360)}
                        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition shadow-sm"
                        title="Rotate Right"
                    >
                        <MdRotateRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Zoom Controls */}
                <div className="">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Zoom
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setZoom((prev) => Math.max(1, prev - 0.1))}
                            className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                        >
                            <HiMinus />
                        </button>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <button
                            onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                            className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                        >
                            <HiPlus />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <SecondaryButton
                        onClick={onCancel}
                        className="w-full sm:w-auto justify-center"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={handleApply}
                        className="w-full sm:w-auto justify-center"
                    >
                        Apply
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
