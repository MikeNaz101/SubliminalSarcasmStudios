"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// 1. Create a sub-component for the logic that uses useSearchParams
function SignInForm() {
    const searchParams = useSearchParams();
    // Defaulting to /welcome ensures the Traffic Cop logic runs after login
    const callbackUrl = searchParams.get("callbackUrl") || "/welcome";
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await signIn("google", { callbackUrl });
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            {/* Logo or Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8">
                Sign in to access the Resident Portal
            </p>

            {/* Sign In Button */}
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        {/* Google Icon SVG */}
                        <svg
                            className="h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path
                                    fill="#4285F4"
                                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                />
                            </g>
                        </svg>
                        Sign in with Google
                    </>
                )}
            </button>

            <p className="mt-6 text-xs text-gray-400">
                Managed by St. James Place
            </p>
        </div>
    );
}

// 2. The main page component that provides the Suspense boundary
export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Suspense fallback={
                <div className="text-gray-500 font-medium animate-pulse">
                    Preparing Sign In...
                </div>
            }>
                <SignInForm />
            </Suspense>
        </div>
    );
}