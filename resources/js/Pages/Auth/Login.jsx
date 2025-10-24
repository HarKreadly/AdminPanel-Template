import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { HiArrowLeft, HiEye, HiEyeOff } from "react-icons/hi";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const carouselSlides = [
        {
            title: "Secure Access Control",
            description:
                "Advanced authentication and role-based permissions for your organization",
            icon: "🔐",
        },
        {
            title: "Real-time Monitoring",
            description:
                "Track user activity and system performance with live dashboards",
            icon: "📊",
        },
        {
            title: "Data Management",
            description:
                "Organize and manage your data with powerful administrative tools",
            icon: "💾",
        },
    ];

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [carouselSlides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Login" />

            <main className="min-h-screen flex">
                {/* Left Side - Hero Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
                    {/* Geometric Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                backgroundImage: `linear-gradient(30deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%),
                                                 linear-gradient(150deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)`,
                                backgroundSize: "60px 60px",
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                        {/* Logo and Back Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    A
                                </div>
                                <span className="text-2xl font-bold">
                                    AdminPro
                                </span>
                            </div>
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                            >
                                <HiArrowLeft className="w-4 h-4" />
                                Back to Website
                            </Link>
                        </div>

                        {/* Hero Content */}
                        <div className="max-w-xl">
                            <h1 className="text-5xl font-bold leading-tight mb-6">
                                Access Your Admin Dashboard
                            </h1>
                            <p className="text-lg text-blue-100">
                                Manage users, monitor performance, and control
                                your organization from anywhere, anytime.
                            </p>
                        </div>

                        {/* Interactive Text Carousel */}
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-4xl mb-4 opacity-80">
                                    {carouselSlides[currentSlide].icon}
                                </div>
                                <h2 className="text-2xl font-bold mb-3">
                                    {carouselSlides[currentSlide].title}
                                </h2>
                                <p className="text-lg text-blue-100 max-w-md mx-auto leading-relaxed">
                                    {carouselSlides[currentSlide].description}
                                </p>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex items-center justify-center gap-3 mt-6">
                                {carouselSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`transition-all duration-300 rounded-full ${
                                            index === currentSlide
                                                ? "w-8 h-3 bg-white"
                                                : "w-3 h-3 bg-white/40 hover:bg-white/60"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <button
                                    onClick={() =>
                                        goToSlide(
                                            (currentSlide -
                                                1 +
                                                carouselSlides.length) %
                                                carouselSlides.length
                                        )
                                    }
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                                    aria-label="Previous slide"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>

                                <span className="text-sm text-blue-200 font-medium">
                                    {String(currentSlide + 1).padStart(2, "0")}{" "}
                                    /{" "}
                                    {String(carouselSlides.length).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>

                                <button
                                    onClick={() =>
                                        goToSlide(
                                            (currentSlide + 1) %
                                                carouselSlides.length
                                        )
                                    }
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                                    aria-label="Next slide"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-zinc-900">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white dark:text-white font-bold text-xl">
                                A
                            </div>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                AdminPro
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                    Welcome Back!
                                </h1>
                                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    Sign in to access your admin dashboard and
                                    manage your organization.
                                </p>
                            </div>

                            {status && (
                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        {status}
                                    </p>
                                </div>
                            )}

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-zinc-900 dark:text-zinc-100 font-medium"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="Input your email"
                                    className="mt-2 block w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-zinc-900 dark:text-zinc-100 font-medium"
                                />
                                <div className="relative mt-2">
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        placeholder="Input your password"
                                        className="block w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 pr-10"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                    >
                                        {showPassword ? (
                                            <HiEyeOff className="w-5 h-5" />
                                        ) : (
                                            <HiEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        Remember Me
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="w-full justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
                                disabled={processing}
                            >
                                Sign In to AdminPro
                            </PrimaryButton>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <FcGoogle className="w-5 h-5" />
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    Continue with Google
                                </span>
                            </button>

                            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                                Don't have an admin account?{" "}
                                <Link
                                    href={route("register")}
                                    className="font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
                                >
                                    Create one here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
}
