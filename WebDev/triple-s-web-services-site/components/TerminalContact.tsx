"use client";

import { useState, useRef, useEffect } from "react";

type HistoryLine = {
    command?: string;
    response?: string;
};

export default function TerminalContact() {
    const [step, setStep] = useState(0);
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState<HistoryLine[]>([
        { response: "Initializing Triple S web-interface..." },
        { response: "Connection secure." },
        { response: "> Identify yourself (Enter your name):" }
    ]);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isTyping]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    // Artificial delay to simulate the "AI" thinking
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const processInput = async (currentInput: string) => {
        // 1. Instantly display what the user typed
        setHistory(prev => [...prev, { command: currentInput }]);
        setInputVal("");
        setIsTyping(true);

        // 2. Add a random "thinking" delay (600ms - 1400ms)
        await sleep(600 + Math.random() * 800);

        let nextResponse = "";

        // 3. Process Logic based on the current step
        if (step === 0) {
            // Step 0: Name was entered
            setFormData({ ...formData, name: currentInput });
            nextResponse = `> Acknowledged, ${currentInput}. What is the optimal email address to route our communications?`;
            setStep(1);

        } else if (step === 1) {
            // Step 1: Email was entered (Add basic validation)
            if (!currentInput.includes("@") || !currentInput.includes(".")) {
                nextResponse = "> [ERROR]: Invalid syntax. Please provide a standard email format:";
                // Do NOT advance the step, force them to try again
            } else {
                setFormData({ ...formData, email: currentInput });
                nextResponse = `> Encrypted channel to ${currentInput} locked. \n> Define your parameters. What kind of digital infrastructure are we building?`;
                setStep(2);
            }

        } else if (step === 2) {
            // Step 2: Project was entered (Keyword Extraction)
            setFormData({ ...formData, message: currentInput });
            const lowerInput = currentInput.toLowerCase();
            let observation = "";

            // The "Fake AI" logic
            if (lowerInput.includes("ecommerce") || lowerInput.includes("shop") || lowerInput.includes("store")) {
                observation = "E-commerce detected. We can engineer a high-conversion, frictionless checkout flow.";
            } else if (lowerInput.includes("app") || lowerInput.includes("dashboard") || lowerInput.includes("portal")) {
                observation = "Custom web application noted. We specialize in complex state management and secure databases.";
            } else if (lowerInput.includes("game") || lowerInput.includes("unity") || lowerInput.includes("unreal")) {
                observation = "Game engine crossover detected. You are speaking our exact language.";
            } else if (lowerInput.includes("fast") || lowerInput.includes("speed")) {
                observation = "Performance is our priority. We will ensure sub-second rendering times.";
            } else {
                observation = "Parameters accepted. Our architectural team will review these requirements.";
            }

            setHistory(prev => [
                ...prev,
                { response: "> Analyzing requirements..." }
            ]);

            await sleep(1200); // Extra delay for dramatic effect

            setHistory(prev => [
                ...prev,
                { response: `> ${observation}` },
                { response: "> Compiling payload and transmitting to engineering..." }
            ]);

            await sleep(1500);

            setHistory(prev => [
                ...prev,
                { response: "> [SUCCESS]: Data transferred. A lead engineer will initiate contact shortly. Terminating session." }
            ]);

            setStep(3); // Form complete
            setIsTyping(false);

            // THIS IS WHERE YOU TRIGGER THE ACTUAL DATABASE SAVE
            console.log("Saving to DB:", { name: formData.name, email: currentInput, message: formData.message });
            return;
        }

        // Push the response to the screen
        setHistory(prev => [...prev, { response: nextResponse }]);
        setIsTyping(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputVal.trim() !== "" && !isTyping) {
            processInput(inputVal.trim());
        }
    };

    return (
        <div
            className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm sm:text-base text-green-400 cursor-text min-h-[400px] flex flex-col"
            onClick={handleTerminalClick}
        >
            <div className="flex gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
            </div>

            <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
                {history.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {line.response && <div className="text-gray-300">{line.response}</div>}
                        {line.command && <div className="text-emerald-400 flex gap-2"><span>$</span><span>{line.command}</span></div>}
                    </div>
                ))}

                {/* The Typing Indicator */}
                {isTyping && (
                    <div className="text-gray-500 animate-pulse mt-2">
                        _processing_
                    </div>
                )}

                {/* The Active Input Line */}
                {!isTyping && step < 3 && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-emerald-500">$</span>
                        <span className="text-emerald-400">{inputVal}</span>
                        <span className="w-2 h-5 bg-emerald-500 animate-pulse"></span>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="opacity-0 absolute w-0 h-0"
                autoFocus
                disabled={step >= 3 || isTyping}
            />
        </div>
    );
}