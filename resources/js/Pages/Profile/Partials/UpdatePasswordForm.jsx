import { useState, useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Header */}
            <header>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Update Password
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Ensure your account uses a strong, unique password to keep it secure.
                </p>
            </header>

            {/* Form */}
            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/* Current Password */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                        className="text-zinc-900 dark:text-zinc-100 font-medium"
                    />
                    <div className="relative mt-2">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            type={showCurrentPassword ? "text" : "password"}
                            value={data.current_password}
                            placeholder="Enter your current password"
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className="block w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 pr-10"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            {showCurrentPassword ? (
                                <HiEyeOff className="w-5 h-5" />
                            ) : (
                                <HiEye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                {/* New Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="New Password"
                        className="text-zinc-900 dark:text-zinc-100 font-medium"
                    />
                    <div className="relative mt-2">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            placeholder="Create a new password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 pr-10"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            {showPassword ? (
                                <HiEyeOff className="w-5 h-5" />
                            ) : (
                                <HiEye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-zinc-900 dark:text-zinc-100 font-medium"
                    />
                    <div className="relative mt-2">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? "text" : "password"}
                            value={data.password_confirmation}
                            placeholder="Confirm your new password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="block w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 pr-10"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            {showConfirmPassword ? (
                                <HiEyeOff className="w-5 h-5" />
                            ) : (
                                <HiEye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Save Button + Feedback */}
                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
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
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
