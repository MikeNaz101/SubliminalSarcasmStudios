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
        const userId = body.userId;

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
            model: 'gemini-2.5-flash',
            tools: tools,
            // --- NEW: The NPC Dialogue Tree Instructions ---
            systemInstruction: `You are a friendly Real Estate Guide NPC helping a player navigate the quest of buying or selling a home.
            
            YOUR CORE MECHANIC: 
            You MUST operate on a strict dialogue tree. Never ask more than ONE question per response. 
            Keep your responses as short and digestible as a text message. Do not output walls of text.
            
            THE QUEST LINE:
            1. Establish if they are looking to buy or sell. (Wait for player input)
            2. Ask what their ideal timeframe is. (Wait for player input)
            3. If buying, ask if they have a pre-approval letter yet. (Wait for player input)
            4. Once they agree to take an action (like getting pre-approved, uploading an ID, or signing a document), use the 'create_user_task' tool to add it to their quest log.
            
            Remember: Bite-sized interactions. One question at a time. Always wait for the player to respond before moving to the next node in the dialogue tree.`
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

            // --- TOOL 2: Create Task (The Gamified Database Magic) ---
            if (functionCall.name === 'create_user_task') {
                const { task_title } = functionCall.args as { task_title: string };

                // 1. Find this specific player's active Match Lobby
                const { data: transaction } = await supabase
                    .from('transactions')
                    .select('id')
                    .eq('buyer_id', userId)
                    .eq('status', 'active')
                    .single();

                const activeTransactionId = transaction?.id;

                if (!activeTransactionId) {
                    console.error("Lobby not found for player:", userId);
                }

                // Step A: Create the task for the USER, attached to their Lobby!
                const { error: userError } = await supabase.from('tasks').insert({
                    lead_id: userId, // The Player
                    transaction_id: activeTransactionId, // The Match Lobby
                    task_title: task_title,
                    assignee_type: 'user',
                    status: 'pending',
                    scheduled_trigger_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
                });

                // Step B: Create the follow-up task for the AGENT, attached to the same Lobby!
                const { error: agentError } = await supabase.from('tasks').insert({
                    lead_id: userId,
                    transaction_id: activeTransactionId,
                    task_title: `Call to check on: ${task_title}`,
                    assignee_type: 'agent',
                    status: 'pending',
                    scheduled_trigger_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
                });

                if (userError || agentError) console.error("Database Insert Error:", userError || agentError);

                // Step C: Tell the AI it worked
                result = await chat.sendMessage([{
                    functionResponse: {
                        name: 'create_user_task',
                        response: { success: true, message: "Task added to player's quest log successfully." }
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