"use client";

import { useState, useEffect } from 'react';
import './Leaderboard.css';

// Define the shape of our data for TypeScript
interface PlayerScore {
    playerName: string;
    finalScore: number;
}

export default function Leaderboard() {
    const [scores, setScores] = useState<PlayerScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Replace with your actual Render URL
        const apiUrl = 'https://subliminal-backend.onrender.com/api/leaderboard/void-runner';

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
                {!loading && !error && scores.map((player, index) => (
                    <tr key={index}>
                        <td className="rank-col">#{index + 1}</td>
                        <td className="name-col">{player.playerName}</td>
                        <td className="score-col">{player.finalScore.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}