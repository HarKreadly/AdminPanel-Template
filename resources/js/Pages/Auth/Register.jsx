import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <main className="min-h-screen grid place-items-center px-4">
                <form onSubmit={submit} className="w-full max-w-sm  border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">Sign up</h1>

                    <InputLabel htmlFor="name" value="Name" className="mt-6 text-zinc-800 dark:text-zinc-200" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-zinc-500 dark:text-zinc-400" />

                    <InputLabel htmlFor="email" value="Email" className="mt-4 text-zinc-800 dark:text-zinc-200" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-zinc-500 dark:text-zinc-400" />

                    <InputLabel htmlFor="password" value="Password" className="mt-4 text-zinc-800 dark:text-zinc-200" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2 text-zinc-500 dark:text-zinc-400" />

                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="mt-4 text-zinc-800 dark:text-zinc-200" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2 text-zinc-500 dark:text-zinc-400" />

                    <PrimaryButton className="mt-6 w-full justify-center" disabled={processing}>
                        Register
                    </PrimaryButton>

                    <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                        Already registered? <Link href={route('login')} className="font-medium text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white transition-colors">Log in</Link>
                    </p>
                </form>
            </main>
        </GuestLayout>
    );
}
