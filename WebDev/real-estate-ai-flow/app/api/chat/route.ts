import { GoogleGenerativeAI, SchemaType, Tool } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // <-- We bring in your database connection!

// Allow the function to run longer for complex AI tasks
export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// 1. Teach the AI what tools it has available
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "search_properties",
                description: "Search for real estate properties based on user criteria like bedrooms, location, and max price.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        location: { type: SchemaType.STRING, description: "City or neighborhood" },
                        bedrooms: { type: SchemaType.NUMBER, description: "Number of bedrooms" },
                        maxPrice: { type: SchemaType.NUMBER, description: "Maximum price in dollars" },
                        propertyType: { type: SchemaType.STRING, description: "Type of property (e.g., house, apartment, townhouse)" }
                    },
                    required: ["location", "bedrooms", "maxPrice"],
                },
            },
            // --- NEW TOOL: The Database Nurture Engine ---
            {
                name: "create_user_task",
                description: "Creates a mandatory checklist task for the user (e.g., 'Upload ID', 'Get Pre-Approved'). Call this when the user agrees to the next step in the real estate process.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        task_title: {
                            type: SchemaType.STRING,
                            description: "A short, actionable title for the task (e.g., 'Upload Photo ID')."
                        },
                    },
                    required: ["task_title"],
                },
            }
        ],
    },
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body.messages;

        const history = messages.map((msg: { sender: string; text: string }) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        // Fix for Gemini history starting with model
        if (history.length > 0 && history[0].role === 'model') {
            history.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
        }

        const latestMessage = history.pop();

        const model = genAI.getGenerativeModel({
            // --- NEW: Updated to the currently active Google model ---
            model: 'gemini-2.5-flash',
            tools: tools
        });

        const chat = model.startChat({ history });

        let result = await chat.sendMessage(latestMessage.parts[0].text);
        let propertyResults = null;

        // --- Check if the AI decided to use a tool ---
        // NEW: We execute functionCalls() with parentheses and save it to a variable first
        const calls = result.response.functionCalls();

        if (calls && calls.length > 0) {
            const functionCall = calls[0];

            // TOOL 1: Property Search
            if (functionCall.name === 'search_properties') {
                const args = functionCall.args as { location: string; bedrooms: number; maxPrice: number; propertyType?: string };
                const mockApiData = {
                    results: [
                        { address: `123 Maple St, ${args.location}`, price: args.maxPrice - 15000, beds: args.bedrooms, type: args.propertyType || "Home" },
                        { address: `456 Oak Ln, ${args.location}`, price: args.maxPrice - 5000, beds: args.bedrooms, type: args.propertyType || "Home" }
                    ]
                };
                propertyResults = mockApiData.results;

                result = await chat.sendMessage([{
                    functionResponse: { name: 'search_properties', response: mockApiData }
                }]);
            }

            // --- TOOL 2: Create Task (The Database Magic) ---
            if (functionCall.name === 'create_user_task') {
                const { task_title } = functionCall.args as { task_title: string };

                // Hardcoded lead ID to match our frontend component for testing
                const leadId = "123e4567-e89b-12d3-a456-426614174000";

                // Step A: Create the task for the USER
                const { error: userError } = await supabase.from('tasks').insert({
                    lead_id: leadId,
                    task_title: task_title,
                    assignee_type: 'user',
                    status: 'pending',
                    // Set the SMS reminder for 4 hours from now
                    scheduled_trigger_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
                });

                // Step B: Create the follow-up task for the AGENT
                const { error: agentError } = await supabase.from('tasks').insert({
                    lead_id: leadId,
                    task_title: `Call to check on: ${task_title}`,
                    assignee_type: 'agent',
                    status: 'pending',
                    // Set the Agent dashboard reminder for 5 hours from now
                    scheduled_trigger_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
                });

                if (userError || agentError) console.error("Database Insert Error:", userError || agentError);

                // Step C: Tell the AI it worked so it can reply to the user naturally!
                result = await chat.sendMessage([{
                    functionResponse: {
                        name: 'create_user_task',
                        response: { success: true, message: "Task added to database successfully." }
                    }
                }]);
            }
        }

        return NextResponse.json({
            text: result.response.text(),
            properties: propertyResults
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}