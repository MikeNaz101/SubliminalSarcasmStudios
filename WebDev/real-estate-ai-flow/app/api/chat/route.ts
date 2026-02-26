import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from '@google/generative-ai';
import { NextResponse } from 'next/server';

interface PropertySearchArgs {
    location: string;
    propertyType: string;
    bedrooms: number;
    maxPrice: number;
}

interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    text: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// --- 1. Define the tool (The Function) ---
// This tells the AI what the function does and what data it needs to provide
const propertySearchTool: FunctionDeclaration = {
    name: "searchProperties",
    description: "Searches for available real estate properties based on user criteria. Call this ONLY when you have gathered location, bedrooms, bathrooms, and max price.",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            location: {
                type: SchemaType.STRING,
                description: "The city and state, e.g., 'Queensbury, NY'",
            },
            propertyType: {
                type: SchemaType.STRING,
                description: "Type of property, e.g., 'house', 'townhouse', 'apartment'",
            },
            bedrooms: { type: SchemaType.NUMBER },
            maxPrice: { type: SchemaType.NUMBER },
        },
        required: ["location", "propertyType", "bedrooms", "maxPrice"],
    },
};

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `
      You are HomeJourney AI, a real estate assistant.
      1. Gather wishlist: bedrooms, property type, location.
      2. Gather financials: max monthly payment or price.
      3. ONCE YOU HAVE location, property type, bedrooms, and price, use the searchProperties tool to fetch listings.
      4. Present the fetched properties nicely to the user and ask what they think.
      5. Move into asking about mortgage pre-approval.
    `;

        // --- 2. Initialize the model with the tool ---
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt,
            tools: [{ functionDeclarations: [propertySearchTool] }],
        });

        // Map the messages to the Gemini format
        const history = messages.map((msg: ChatMessage) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        // FIX: Gemini requires history to start with a user message.
        // If our history starts with the AI's hardcoded greeting, prepend a silent user greeting.
        if (history.length > 0 && history[0].role === 'model') {
            history.unshift({
                role: 'user',
                parts: [{ text: 'Hello' }],
            });
        }

        // Extract the very last message to send as the new prompt
        const latestMessage = history.pop();

        // Start the chat
        const chat = model.startChat({ history });

        // --- 3. Send message and check if AI wants to call the tool ---
        let result = await chat.sendMessage(latestMessage.parts[0].text);
        let aiResponse = result.response;

        // Check if the AI decided to call 'searchProperties'
        const functionCall = aiResponse.functionCalls()?.[0];

        let propertyResults = null;

        if (functionCall && functionCall.name === "searchProperties") {
            const args = functionCall.args as unknown as PropertySearchArgs;

            // --- 4. EXECUTE YOUR API SEARCH HERE ---
            // In the future, this is where you run your fetch() to RapidAPI/Zillow.
            // For now, we mock the database response using the AI's arguments:
            const mockApiData = {
                results: [
                    { address: `123 Maple St, ${args.location}`, price: args.maxPrice - 15000, beds: args.bedrooms, type: args.propertyType },
                    { address: `456 Oak Ln, ${args.location}`, price: args.maxPrice - 5000, beds: args.bedrooms, type: args.propertyType }
                ]
            };

            propertyResults = mockApiData.results;

            // --- 5. Send the data back to the AI so it can summarize it ---
            result = await chat.sendMessage([{
                functionResponse: {
                    name: "searchProperties",
                    response: mockApiData
                }
            }]);

            aiResponse = result.response;
        }

        return NextResponse.json({
            text: aiResponse.text(),
            properties: propertyResults // Send the properties to the frontend!
        });

    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { error: 'Failed to generate response.' },
            { status: 500 }
        );
    }
}