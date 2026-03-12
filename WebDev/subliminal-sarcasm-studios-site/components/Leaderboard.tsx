"use client";

import { useState, useEffect } from 'react';
import './Leaderboard.css';

// 1. Updated to match the new database variable
interface PlayerScore {
    playerName: string;
    distanceTraveled: number;
}

export default function Leaderboard() {
    const [scores, setScores] = useState<PlayerScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // 2. Fixed the URL to exactly match the route in server.js
        const apiUrl = 'https://subliminal-backend.onrender.com/api/leaderboard';

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.success) {
                    setScores(data.leaderboard);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching leaderboard:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboard-container">
            <h3 className="leaderboard-title">Top Pilots</h3>
            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th className="rank-col">Rank</th>
                    <th className="name-col">Pilot Name</th>
                    <th className="score-col">Score</th>
                </tr>
                </thead>
                <tbody>
                {/* --- STATE 1: LOADING --- */}
                {loading && (
                    <tr><td colSpan={3} className="loading-text">Accessing Void Network...</td></tr>
                )}

                {/* --- STATE 2: ERROR --- */}
                {!loading && error && (
                    <tr><td colSpan={3} className="error-text">Connection to Void Network severed.</td></tr>
                )}

                {/* --- STATE 3: NO DATA --- */}
                {!loading && !error && scores.length === 0 && (
                    <tr><td colSpan={3} className="loading-text">No flight data found. Be the first!</td></tr>
                )}

                {/* --- STATE 4: SUCCESS --- */}
                {/* 3. Updated to render the rounded distanceTraveled */}
                {!loading && !error && scores.map((player, index) => {
                    const cleanDistance = Math.round(player.distanceTraveled).toLocaleString();

                    return (
                        <tr key={index}>
                            <td className="rank-col">#{index + 1}</td>
                            <td className="name-col">{player.playerName}</td>
                            <td className="score-col">{cleanDistance} m</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}