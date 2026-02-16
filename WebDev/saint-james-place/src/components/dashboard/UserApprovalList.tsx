"use client";

import { useState, useEffect } from "react";

interface User {
    _id: string;
    email: string;
    name?: string;
    role: string;
    createdAt?: string;
}

export default function UserApprovalList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 1. Fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/role");
            if (!res.ok) throw new Error("Failed to load users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError("Error loading user list");
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle Role Updates (Approve/Ban)
    const updateRole = async (userId: string, newRole: string) => {
        // Optimistic UI update: Update the list locally immediately for better UX
        setUsers((prev) =>
            prev.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            )
        );

        try {
            const res = await fetch("/api/admin/role", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newRole }),
            });

            if (!res.ok) {
                throw new Error("Update failed");
            }
        } catch (err) {
            // Revert changes if API fails
            alert("Failed to update role. Please try again.");
            fetchUsers();
        }
    };

    if (loading) return <div className="p-4">Loading users...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    // Filter to show only pending approvals (or everyone if you prefer)
    const pendingUsers = users.filter((u) => u.role === "unverified");

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>

            {pendingUsers.length === 0 ? (
                <p className="text-gray-500">No new users waiting for approval.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {pendingUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.name || "No Name"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => updateRole(user._id, "resident")}
                                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition"
                                    >
                                        Approve (Resident)
                                    </button>
                                    <button
                                        onClick={() => updateRole(user._id, "worker")}
                                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition"
                                    >
                                        Worker
                                    </button>
                                    <button
                                        onClick={() => updateRole(user._id, "banned")}
                                        className="text-red-600 hover:text-red-900 ml-2"
                                    >
                                        Ban
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}