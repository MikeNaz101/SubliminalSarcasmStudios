"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Property {
  address: string;
  price: number;
  beds: number;
  type: string;
}

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  properties?: Property[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! 👋 Are you ready to start your home purchasing journey?"
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- NEW: State for the currently selected property for the modal ---
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const newUserMessage: Message = { id: Date.now(), sender: 'user', text: inputValue };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: data.text,
            properties: data.properties
          }
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: "Sorry, I'm having trouble connecting." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: Function to handle asking the AI about a specific property ---
  const handleAskAboutProperty = (address: string) => {
    setInputValue(`I'm interested in the property at ${address}. What are the next steps?`);
    setSelectedProperty(null); // Close the modal
  };

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
        <header className="bg-white shadow-sm p-4 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">HomeJourney AI</h1>
            <button className="text-slate-600 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors">
              Agent Portal Login
            </button>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 z-10">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[600px] relative">

            <div className="bg-blue-600 p-5 text-white flex items-center justify-between z-20">
              <div>
                <h3 className="font-semibold text-lg">Real Estate Assistant</h3>
                <div className="flex items-center mt-1">
                  <span className={`flex w-2 h-2 rounded-full mr-2 ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
                  <p className="text-blue-100 text-sm">{isLoading ? 'Typing...' : 'Online'}</p>
                </div>
              </div>
              <button
                  onClick={() => setMessages([messages[0]])}
                  className="text-blue-100 hover:text-white text-sm underline"
              >
                Start Over
              </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-6 relative">
              {messages.map((message) => (
                  <div key={message.id} className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>

                    <div className={`px-5 py-4 max-w-[85%] shadow-sm ${
                        message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none'
                    }`}>
                      {message.text}
                    </div>

                    {message.properties && message.properties.length > 0 && (
                        <div className="flex gap-4 mt-3 overflow-x-auto w-full max-w-[90%] pb-4 snap-x">
                          {message.properties.map((prop, idx) => (
                              <div key={idx} className="min-w-[220px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm snap-start shrink-0 flex flex-col">
                                <div className="h-32 bg-slate-200 flex items-center justify-center">
                                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </div>
                                <div className="p-4 flex-grow flex flex-col">
                                  <p className="font-bold text-xl text-slate-800">${prop.price.toLocaleString()}</p>
                                  <p className="text-sm font-semibold text-blue-600 mb-1 capitalize">{prop.beds} Beds • {prop.type}</p>
                                  <p className="text-xs text-slate-500 truncate mb-3">{prop.address}</p>

                                  {/* --- NEW: Open Modal Button --- */}
                                  <button
                                      onClick={() => setSelectedProperty(prop)}
                                      className="mt-auto w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded transition-colors"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                          ))}
                        </div>
                    )}

                  </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 z-20">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer here..."
                    disabled={isLoading}
                    className="flex-grow border border-slate-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 text-slate-700 bg-slate-50"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-full px-8 py-3 font-semibold transition-colors shadow-md"
                >
                  Send
                </button>
              </form>
            </div>

            {/* --- NEW: The Property Details Modal --- */}
            {selectedProperty && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
                  <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">

                    {/* Modal Image Area */}
                    <div className="h-48 bg-slate-200 relative flex items-center justify-center">
                      <button
                          onClick={() => setSelectedProperty(null)}
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-colors"
                      >
                        ✕
                      </button>
                      <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-black text-slate-900">${selectedProperty.price.toLocaleString()}</h2>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">Active</span>
                      </div>
                      <p className="text-lg font-semibold text-blue-600 mb-1 capitalize">
                        {selectedProperty.beds} Bedrooms • {selectedProperty.type}
                      </p>
                      <p className="text-slate-600 mb-6">{selectedProperty.address}</p>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                        <p className="text-sm text-slate-700">
                          This is a highly sought-after property that matches your wishlist criteria perfectly. It features a modern layout and is located in a great neighborhood.
                        </p>
                      </div>

                      {/* Modal Actions */}
                      <div className="flex gap-3">
                        <button
                            onClick={() => handleAskAboutProperty(selectedProperty.address)}
                            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
                        >
                          Ask AI about this
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
            )}

          </div>
        </main>
      </div>
  );
}