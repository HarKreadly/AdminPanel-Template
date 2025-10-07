import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputWithIcon from "@/Components/InputWithIcon";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { HiMail } from "react-icons/hi";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    // Format date to YYYY-MM-DD if it exists
    const formatDate = (date) => {
        if (!date) return "";
        // Handle different date formats
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const initialData = {
        name: user.name || "",
        first_name: user.first_name || "",
        middle_name: user.middle_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: formatDate(user.date_of_birth),
        gender: user.gender || "",
        bio: user.bio || "",
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(initialData);

    // Check if form data has changed
    const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.information.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <InputLabel htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            className="mt-1 block w-full"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            autoComplete="given-name"
                            placeholder="First Name"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.first_name}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="middle_name" value="Middle Name" />
                        <TextInput
                            id="middle_name"
                            className="mt-1 block w-full"
                            value={data.middle_name}
                            onChange={(e) =>
                                setData("middle_name", e.target.value)
                            }
                            autoComplete="additional-name"
                            placeholder="Middle Name"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.middle_name}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            className="mt-1 block w-full"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            autoComplete="family-name"
                            placeholder="Last Name"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.last_name}
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <InputWithIcon
                            id="email"
                            type="email"
                            className="mt-1"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="email"
                            placeholder="Email"
                            icon={
                                <HiMail className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                            }
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            autoComplete="tel"
                            placeholder="Phone"
                        />
                        <InputError className="mt-2" message={errors.phone} />
                    </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="date_of_birth"
                            value="Date of Birth"
                        />
                        <TextInput
                            id="date_of_birth"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.date_of_birth}
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
                            autoComplete="bday"
                            placeholder="Date of Birth"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.date_of_birth}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="gender" value="Gender" />
                        <select
                            id="gender"
                            className="mt-1 rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <InputError className="mt-2" message={errors.gender} />
                    </div>
                </div>

                {/* Bio */}
                <div>
                    <InputLabel htmlFor="bio" value="Bio" />
                    <textarea
                        id="bio"
                        rows="4"
                        className="rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 border-gray-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 block w-full p-2.5"
                        value={data.bio}
                        onChange={(e) => setData("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {/* Email Verification Notice */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            Your email address is unverified.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="font-medium underline hover:text-yellow-900 dark:hover:text-yellow-100"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {/* Save Button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing || !hasChanges}>
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
        </section>
    );
}