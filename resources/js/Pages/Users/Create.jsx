import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Checkbox from "@/Components/Checkbox";
import ProfileImageEditor from "@/Pages/Profile/ProfileImageEditor";
import CropperModal from "@/Pages/Profile/Partials/CropperModal";

export default function Create() {
    const inputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [croppedPreview, setCroppedPreview] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        bio: "",
        country: "",
        city: "",
        province: "",
        address: "",
        zip_code: "",
        time_zone: "",
        role: "user",
        status: "active",
        verified: false,
        password: "",
        password_confirmation: "",
        profile_picture: null,
    });

    useEffect(() => {
        if (nameTouched) {
            return;
        }

        const suggestion = [data.first_name, data.middle_name, data.last_name]
            .filter(Boolean)
            .join(" ")
            .trim();

        if (suggestion && suggestion !== data.name) {
            setData("name", suggestion);
        }
    }, [
        data.first_name,
        data.middle_name,
        data.last_name,
        data.name,
        nameTouched,
        setData,
    ]);

    const handleCropApply = useCallback(
        (blob, previewUrl) => {
            const file = new File([blob], "profile-picture.jpg", {
                type: blob.type || "image/jpeg",
            });

            setCroppedPreview(previewUrl);
            setData("profile_picture", file);
            setShowCropper(false);
        },
        [setData]
    );

    const handleCropCancel = useCallback(() => {
        setShowCropper(false);

        if (!croppedPreview && inputRef.current) {
            inputRef.current.value = "";
            setPreviewImage(null);
        }
    }, [croppedPreview]);

    const handleFileSelected = useCallback((base64Image) => {
        setPreviewImage(base64Image);
        setShowCropper(true);
    }, []);

    const handleRemoveImage = useCallback(() => {
        setPreviewImage(null);
        setCroppedPreview(null);
        setData("profile_picture", null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [setData]);

    const handleFieldChange = (field) => (event) => {
        setData(field, event.target.value);
    };

    const handleCheckboxChange = (field) => (event) => {
        setData(field, event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("users.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviewImage(null);
                setCroppedPreview(null);
                setShowCropper(false);
                setNameTouched(false);

                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            },
        });
    };

    const handleCancel = () => {
        router.visit(route("users.index"));
    };

    const roleOptions = useMemo(
        () => [
            { value: "user", label: "User" },
            { value: "company", label: "Company" },
            { value: "admin", label: "Admin" },
        ],
        []
    );

    const statusOptions = useMemo(
        () => [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "banned", label: "Banned" },
        ],
        []
    );

    const currentPreview = croppedPreview || previewImage;

    return (
        <AppLayout header={<h2>Users</h2>}>
            <Head title="Create User" />

            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Dashboard", href: "/dashboard" },
                            { label: "Users", href: "/users" },
                            { label: "Create", href: "/users/create" },
                        ]}
                    />

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-6"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-6 lg:grid-cols-4">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Profile Picture
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <ProfileImageEditor
                                            image={currentPreview}
                                            onEdit={() =>
                                                setShowCropper(
                                                    Boolean(previewImage)
                                                )
                                            }
                                            onRemove={handleRemoveImage}
                                            onFileSelected={handleFileSelected}
                                            inputRef={inputRef}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.profile_picture}
                                        />
                                    </div>
                                </div>

                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Personal Information
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Display Name"
                                            />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(event) => {
                                                    setNameTouched(true);
                                                    setData(
                                                        "name",
                                                        event.target.value
                                                    );
                                                }}
                                                placeholder="Enter display name"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="first_name"
                                                    value="First Name"
                                                />
                                                <TextInput
                                                    id="first_name"
                                                    name="first_name"
                                                    className="mt-1 block w-full"
                                                    value={data.first_name}
                                                    onChange={handleFieldChange(
                                                        "first_name"
                                                    )}
                                                    placeholder="Input first name"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.first_name}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="middle_name"
                                                    value="Middle Name"
                                                />
                                                <TextInput
                                                    id="middle_name"
                                                    name="middle_name"
                                                    className="mt-1 block w-full"
                                                    value={data.middle_name}
                                                    onChange={handleFieldChange(
                                                        "middle_name"
                                                    )}
                                                    placeholder="Input middle name"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.middle_name}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="last_name"
                                                    name="last_name"
                                                    className="mt-1 block w-full"
                                                    value={data.last_name}
                                                    onChange={handleFieldChange(
                                                        "last_name"
                                                    )}
                                                    placeholder="Input last name"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.last_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Contact Information
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="mt-1 block w-full"
                                                    value={data.email}
                                                    onChange={handleFieldChange(
                                                        "email"
                                                    )}
                                                    required
                                                    autoComplete="email"
                                                    placeholder="name@example.com"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Phone"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    className="mt-1 block w-full"
                                                    value={data.phone}
                                                    onChange={handleFieldChange(
                                                        "phone"
                                                    )}
                                                    autoComplete="tel"
                                                    placeholder="e.g., +1 555 123 4567"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.phone}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="date_of_birth"
                                                    value="Date of Birth"
                                                />
                                                <TextInput
                                                    id="date_of_birth"
                                                    name="date_of_birth"
                                                    type="date"
                                                    className="mt-1 block w-full"
                                                    value={data.date_of_birth}
                                                    onChange={handleFieldChange(
                                                        "date_of_birth"
                                                    )}
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.date_of_birth
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="gender"
                                                    value="Gender"
                                                />
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="mt-1 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                                                    value={data.gender}
                                                    onChange={handleFieldChange(
                                                        "gender"
                                                    )}
                                                >
                                                    <option value="">
                                                        Select gender
                                                    </option>
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                    <option value="other">
                                                        Other
                                                    </option>
                                                </select>
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.gender}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Bio
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="bio"
                                                value="Bio"
                                            />
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={4}
                                                className="rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                                                value={data.bio}
                                                onChange={handleFieldChange(
                                                    "bio"
                                                )}
                                                placeholder="Tell us about this user..."
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.bio}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                            <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Account Settings
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="role"
                                                value="Role"
                                            />
                                            <select
                                                id="role"
                                                name="role"
                                                className="mt-1 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                                                value={data.role}
                                                onChange={handleFieldChange(
                                                    "role"
                                                )}
                                            >
                                                {roleOptions.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                className="mt-2"
                                                message={errors.role}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="status"
                                                value="Status"
                                            />
                                            <select
                                                id="status"
                                                name="status"
                                                className="mt-1 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                                                value={data.status}
                                                onChange={handleFieldChange(
                                                    "status"
                                                )}
                                            >
                                                {statusOptions.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                className="mt-2"
                                                message={errors.status}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                name="verified"
                                                checked={data.verified}
                                                onChange={handleCheckboxChange(
                                                    "verified"
                                                )}
                                            />
                                            <span className="text-sm text-gray-700 dark:text-zinc-200">
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">


                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Location Details
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="country"
                                                    value="Country"
                                                />
                                                <TextInput
                                                    id="country"
                                                    name="country"
                                                    className="mt-1 block w-full"
                                                    value={data.country}
                                                    onChange={handleFieldChange(
                                                        "country"
                                                    )}
                                                    placeholder="Country"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.country}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="city"
                                                    name="city"
                                                    className="mt-1 block w-full"
                                                    value={data.city}
                                                    onChange={handleFieldChange(
                                                        "city"
                                                    )}
                                                    placeholder="City"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.city}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="province"
                                                    value="State/Province"
                                                />
                                                <TextInput
                                                    id="province"
                                                    name="province"
                                                    className="mt-1 block w-full"
                                                    value={data.province}
                                                    onChange={handleFieldChange(
                                                        "province"
                                                    )}
                                                    placeholder="State or Province"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.province}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="zip_code"
                                                    value="Zip / Postal Code"
                                                />
                                                <TextInput
                                                    id="zip_code"
                                                    name="zip_code"
                                                    className="mt-1 block w-full"
                                                    value={data.zip_code}
                                                    onChange={handleFieldChange(
                                                        "zip_code"
                                                    )}
                                                    placeholder="Postal code"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.zip_code}
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="address"
                                                    value="Street Address"
                                                />
                                                <TextInput
                                                    id="address"
                                                    name="address"
                                                    className="mt-1 block w-full"
                                                    value={data.address}
                                                    onChange={handleFieldChange(
                                                        "address"
                                                    )}
                                                    placeholder="Street address"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.address}
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="time_zone"
                                                    value="Time Zone"
                                                />
                                                <TextInput
                                                    id="time_zone"
                                                    name="time_zone"
                                                    className="mt-1 block w-full"
                                                    value={data.time_zone}
                                                    onChange={handleFieldChange(
                                                        "time_zone"
                                                    )}
                                                    placeholder="e.g., America/New_York"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.time_zone}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                                    <div className="px-5 py-4 text-lg font-semibold text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-700">
                                        Security
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />
                                                <TextInput
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    className="mt-1 block w-full"
                                                    value={data.password}
                                                    onChange={handleFieldChange(
                                                        "password"
                                                    )}
                                                    placeholder="Set a password"
                                                    autoComplete="new-password"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="Confirm Password"
                                                />
                                                <TextInput
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    type="password"
                                                    className="mt-1 block w-full"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={handleFieldChange(
                                                        "password_confirmation"
                                                    )}
                                                    placeholder="Confirm password"
                                                    autoComplete="new-password"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900">
                            <div className="p-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
                                <SecondaryButton
                                    type="button"
                                    onClick={handleCancel}
                                    className="justify-center"
                                    disabled={processing}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Create User"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <CropperModal
                show={showCropper}
                image={previewImage}
                onCancel={handleCropCancel}
                onApply={handleCropApply}
            />
        </AppLayout>
    );
}
