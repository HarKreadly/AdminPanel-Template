import { useState, useRef } from "react";
import Cropper from "react-easy-crop";

export default function ProfileImageEditor({
    yourImage,
    setYourImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    inputRef,
    triggerFileSelectPopup,
}) {
    const [showCropper, setShowCropper] = useState(false);

    return (
        <div className="flex items-center gap-4 mb-6">
            <img
                className="rounded-full w-32 h-32 bg-red-200 m-4"
                src={
                    yourImage
                        ? yourImage
                        : "/docs/images/examples/image-4@2x.jpg"
                }
                alt="Profile Picture"
            />
            <div>
                {yourImage && (
                    <>
                        <button
                            className="text-sm text-blue-600 hover:underline mb-2"
                            onClick={() => setShowCropper(true)}
                        >
                            Edit & Crop
                        </button>
                        {showCropper && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg relative w-[400px]">
                                    <button
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800"
                                        onClick={() => setShowCropper(false)}
                                    >
                                        &times;
                                    </button>
                                    <div className="w-full h-64 relative">
                                        <Cropper
                                            image={yourImage}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm mb-1">
                                            Zoom
                                        </label>
                                        <input
                                            type="range"
                                            min={1}
                                            max={3}
                                            step={0.01}
                                            value={zoom}
                                            onChange={(e) =>
                                                setZoom(Number(e.target.value))
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            onClick={() =>
                                                setShowCropper(false)
                                            }
                                        >
                                            Done
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                            onClick={() =>
                                                setShowCropper(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <span>
                <h1 className="font-bold ">Ahmed Farhi</h1>
                <p className="">Lorem ipsum dolor sit amet.</p>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                setYourImage(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />
                <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={triggerFileSelectPopup}
                >
                    Change
                </button>
                <button
                    className="text-sm text-red-600 hover:underline ml-2"
                    onClick={() => setYourImage(null)}
                >
                    Remove
                </button>
            </span>
        </div>
    );
}
