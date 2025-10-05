import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <main className="min-h-screen grid place-items-center px-4">
                <form
                    onSubmit={submit}
                    className="w-full max-w-sm  border-zinc-200 dark:border-zinc-800 rounded-xl p-6  bg-white dark:bg-zinc-900"
                >
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                        Sign in
                    </h1>

                    {status && (
                        <p className="mt-3 text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {status}
                        </p>
                    )}

                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="mt-6 text-zinc-800 dark:text-zinc-200"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError
                        message={errors.email}
                        className="mt-2 text-zinc-500 dark:text-zinc-400"
                    />

                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="mt-4 text-zinc-800 dark:text-zinc-200"
                    />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError
                        message={errors.password}
                        className="mt-2 text-zinc-500 dark:text-zinc-400"
                    />

                    <label className="mt-4 flex items-center select-none justify-between">
                        <span className="inline-flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-zinc-700 dark:text-zinc-300">
                                Remember me
                            </span>
                        </span>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        )}
                    </label>

                    <PrimaryButton
                        className="mt-6 w-full justify-center bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>

                    <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                        No account?{" "}
                        <Link
                            href={route("register")}
                            className="font-medium text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </main>
        </GuestLayout>
    );
}
