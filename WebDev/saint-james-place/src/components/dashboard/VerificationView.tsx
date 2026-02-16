"use client";

import { signOut } from "next-auth/react";

export default function VerificationView() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                    {/* Clock Icon */}
                    <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>

                <p className="text-gray-600 mb-6">
                    Thanks for signing up! For security reasons, a manager needs to verify your residency before you can access the portal.
                </p>

                <div className="bg-blue-50 p-4 rounded-md text-left mb-6">
                    <p className="text-sm text-blue-800 font-medium">What happens next?</p>
                    <ul className="list-disc list-inside text-sm text-blue-700 mt-1 ml-1">
                        <li>We have received your request.</li>
                        <li>You will receive an email once approved.</li>
                        <li>Check back here later to see your dashboard.</li>
                    </ul>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition mb-3"
                >
                    Check Status Again
                </button>

                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}