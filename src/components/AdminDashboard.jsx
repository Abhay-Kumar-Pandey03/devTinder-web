import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        premiumUsers: 0,
        connections: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/admin/stats`, {
                    withCredentials: true,
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to load admin stats", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">🛡 Admin Dashboard</h1>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-200 rounded-lg p-5">
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <h2 className="text-3xl font-bold">{stats.users}</h2>
                </div>

                <div className="bg-base-200 rounded-lg p-5">
                    <p className="text-gray-400 text-sm">Premium Users</p>
                    <h2 className="text-3xl font-bold text-yellow-400">
                        {stats.premiumUsers}
                    </h2>
                </div>

                <div className="bg-base-200 rounded-lg p-5">
                    <p className="text-gray-400 text-sm">Connections</p>
                    <h2 className="text-3xl font-bold">{stats.connections}</h2>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>   
                <div className="mt-6">
                    {/* <h2 className="text-lg font-semibold mb-4 text-gray-200">
                        Quick Actions
                    </h2> */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            className="
                flex items-center justify-center gap-2
                px-4 py-3 rounded-lg
                bg-base-200 hover:bg-base-300
                border border-gray-600
                transition-all duration-200
                text-sm font-medium
            "
                        >
                            👥 View Users
                        </button>

                        <button
                            className="
                flex items-center justify-center gap-2
                px-4 py-3 rounded-lg
                bg-base-200 hover:bg-base-300
                border border-gray-600
                transition-all duration-200
                text-sm font-medium
            "
                        >
                            💳 View Payments
                        </button>

                        <button
                            className="
                flex items-center justify-center gap-2
                px-4 py-3 rounded-lg
                bg-base-200 hover:bg-base-300
                border border-gray-600
                transition-all duration-200
                text-sm font-medium
            "
                        >
                            📢 Send Announcement
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
