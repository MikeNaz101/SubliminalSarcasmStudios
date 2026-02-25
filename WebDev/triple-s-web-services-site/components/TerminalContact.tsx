"use client";

import { useState, useRef, useEffect } from "react";

type HistoryLine = {
    command?: string;
    response: string;
};

export default function TerminalContact() {
    const [step, setStep] = useState(0);
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState<HistoryLine[]>([]);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const questions = [
        "Welcome to Triple S Web Services.",
        "> Enter your name:",
        "> Enter your email address:",
        "> Briefly describe your project or web needs:"
    ];

    // Auto-scroll to the bottom when new lines are added
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, step]);

    // Keep the hidden input focused when clicking anywhere on the terminal
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputVal.trim() !== "") {
            const currentAnswer = inputVal.trim();

            // Save to history
            setHistory((prev) => [
                ...prev,
                { response: questions[step === 0 ? 1 : step] },
                { command: currentAnswer, response: "" }
            ]);

            // Save to form data
            if (step === 1) setFormData({ ...formData, name: currentAnswer });
            if (step === 2) setFormData({ ...formData, email: currentAnswer });
            if (step === 3) {
                setFormData({ ...formData, message: currentAnswer });
                submitForm();
                setInputVal("");
                return;
            }

            setStep(step === 0 ? 2 : step + 1);
            setInputVal("");
        }
    };

    const submitForm = () => {
        setIsSubmitting(true);
        // Here is where you will eventually POST to your API/Database
        setTimeout(() => {
            setHistory((prev) => [
                ...prev,
                { response: "> Transmitting encrypted data payload..." },
                { response: "> Success. A developer will be in touch shortly." }
            ]);
            setIsSubmitting(false);
            setStep(4); // Form complete
        }, 1500);
    };

    return (
        <div
            className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm sm:text-base text-green-400 cursor-text"
            onClick={handleTerminalClick}
        >
            {/* Mac-style Window Controls for Aesthetic */}
            <div className="flex gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
            </div>

            <div className="min-h-[300px] flex flex-col gap-2">
                {/* Render History */}
                {step === 0 && <div className="text-gray-300">{questions[0]}</div>}

                {history.map((line, index) => (
                    <div key={index}>
                        {line.response && <div className="text-gray-300">{line.response}</div>}
                        {line.command && <div className="text-green-400 flex gap-2"><span>$</span><span>{line.command}</span></div>}
                    </div>
                ))}

                {/* Current Active Prompt */}
                {step > 0 && step < 4 && !isSubmitting && (
                    <div className="text-gray-300 mt-2">{questions[step]}</div>
                )}

                {/* The Active Typing Line */}
                {step < 4 && !isSubmitting && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-500">$</span>
                        <span className="text-green-400">{inputVal}</span>
                        {/* Blinking Cursor */}
                        <span className="w-2 h-5 bg-green-500 animate-pulse"></span>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Hidden Input Field to capture mobile keyboards and raw typing */}
            <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="opacity-0 absolute w-0 h-0"
                autoFocus
                disabled={step >= 4 || isSubmitting}
            />
        </div>
    );
}