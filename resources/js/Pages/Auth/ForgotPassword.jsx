import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <main className="min-h-screen grid place-items-center px-4">
                <form onSubmit={submit} className="w-full max-w-sm border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">Reset password</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 text-center">Enter your email and we'll send you a reset link.</p>

                    {status && (
                        <p className="mt-3 text-center text-sm font-medium text-green-600 dark:text-green-400">{status}</p>
                    )}

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-6 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-zinc-500 dark:text-zinc-400" />

                    <PrimaryButton className="mt-6 w-full justify-center" disabled={processing}>
                        Send reset link
                    </PrimaryButton>
                </form>
            </main>
        </GuestLayout>
    );
}
