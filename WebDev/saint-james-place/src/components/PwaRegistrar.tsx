// src/components/PwaRegistrar.tsx
"use client"; // This is required!

import { useEffect } from "react";

export default function PwaRegistrar() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((reg) => console.log("SW Registered!", reg.scope))
                .catch((err) => console.log("SW Failed:", err));
        }
    }, []);

    return null; // It renders nothing, just runs logic
}