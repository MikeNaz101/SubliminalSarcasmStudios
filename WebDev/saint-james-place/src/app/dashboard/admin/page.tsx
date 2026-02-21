"use client";

import { useState, useEffect } from "react";

// FIXED: Added the optional 'role' string here so TypeScript knows it might exist on older accounts
type User = {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    role?: string;
};

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch users when the page loads
    useEffect(() => {
        fetch("/api/admin/users")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // FIXED: Removed the 'as any' hacks because our User type now knows about 'role'
                    const sanitizedUsers = data.users.map((u: User) => ({
                        ...u,
                        roles: u.roles || (u.role ? [u.role] : ["unverified"])
                    }));
                    setUsers(sanitizedUsers);
                }
                setLoading(false);
            });
    }, []);

    // Handle toggling a role checkbox
    const toggleRole = async (userId: string, roleToToggle: string) => {
        const userToUpdate = users.find((u) => u._id === userId);
        if (!userToUpdate) return;

        // Calculate the new array of roles
        let newRoles = [...userToUpdate.roles];
        if (newRoles.includes(roleToToggle)) {
            newRoles = newRoles.filter((r) => r !== roleToToggle);
        } else {
            newRoles.push(roleToToggle);
        }

        // Optimistically update the UI instantly
        setUsers(users.map((u) => u._id === userId ? { ...u, roles: newRoles } : u));

        // Send the update to MongoDB
        await fetch("/api/admin/users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, newRoles }),
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-900">Admin Command Center</h1>
                <p className="text-slate-500">Manage your staff and resident access.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <h2 className="text-xl font-bold text-slate-800 mb-6">User Access Management</h2>

                {loading ? (
                    <p className="text-slate-500 animate-pulse py-10 text-center">Loading staff and residents...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="border-b-2 border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-bold">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4 text-center">Admin</th>
                                <th className="p-4 text-center">Worker</th>
                                <th className="p-4 text-center">Resident</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-medium text-slate-900">{user.name || "Unknown"}</td>
                                    <td className="p-4 text-slate-500 text-sm">{user.email}</td>

                                    {/* Admin Checkbox */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={user.roles.includes("admin")}
                                            onChange={() => toggleRole(user._id, "admin")}
                                            className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500 cursor-pointer"
                                        />
                                    </td>

                                    {/* Worker Checkbox */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={user.roles.includes("worker")}
                                            onChange={() => toggleRole(user._id, "worker")}
                                            className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500 cursor-pointer"
                                        />
                                    </td>

                                    {/* Resident Checkbox */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={user.roles.includes("resident")}
                                            onChange={() => toggleRole(user._id, "resident")}
                                            className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}