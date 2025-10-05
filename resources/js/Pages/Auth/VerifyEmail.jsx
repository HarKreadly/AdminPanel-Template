import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <main className="min-h-screen grid place-items-center px-4">
                <section className="w-full max-w-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm bg-white dark:bg-zinc-900 text-center">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Verify your email</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        We sent a verification link to your email. If you didn’t receive it, resend below.
                    </p>

                    {status === 'verification-link-sent' && (
                        <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
                            A new verification link has been sent to your email.
                        </p>
                    )}

                    <form onSubmit={submit} className="mt-6 flex items-center justify-between gap-3">
                        <PrimaryButton className="flex-1 justify-center" disabled={processing}>
                            Resend email
                        </PrimaryButton>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                        >
                            Log out
                        </Link>
                    </form>
                </section>
            </main>
        </GuestLayout>
    );
}
