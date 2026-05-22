import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function GET(req: Request) {
    try {
        console.log("⏰ Waking up the Daily Matchmaker Engine...");

        // 1. FETCH ACTIVE BUYERS
        const { data: activeTransactions, error } = await supabase
            .from('transactions')
            .select(`
                id, 
                property_address,
                buyer_id
            `)
            .eq('status', 'active');

        if (error) throw error;

        if (!activeTransactions || activeTransactions.length === 0) {
            console.log("🛑 No active buyers found in the lobby.");
            return NextResponse.json({ message: "No active buyers to process." });
        }

        console.log(`🕵️ Found ${activeTransactions.length} active buyers. Fetching properties...`);

        // 2. MOCK NEW PROPERTIES (The Bait)
        const todaysNewListings = [
            { address: "789 Pine Rd, Queensbury, NY", price: 310000, beds: 3, vibe: "Fixer-upper with great bones" },
            { address: "101 Lakefront Way, Queensbury, NY", price: 450000, beds: 4, vibe: "Turn-key modern family home" }
        ];

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        let messagesDrafted = 0;

        // 3. THE AI FILTERING ENGINE
        for (const tx of activeTransactions) {
            // We need to fetch the buyer's name from the leads table using their ID
            const { data: leadData } = await supabase
                .from('leads')
                .select('name, email')
                .eq('id', tx.buyer_id)
                .single();

            const buyerName = leadData?.name || "Client";

            console.log(`\n🧠 Asking AI to evaluate properties for: ${buyerName}...`);

            const prompt = `
                You are a real estate AI assistant. 
                The buyer, ${buyerName}, is currently looking for: ${tx.property_address}.
                
                Here are today's new market listings:
                ${JSON.stringify(todaysNewListings)}
                
                If any of these properties are a good match, write a short, friendly SMS text message (max 2 sentences) to send to the buyer, including the address.
                If none match, reply EXACTLY with the word: "SKIP".
            `;

            const result = await model.generateContent(prompt);
            const aiResponse = result.response.text().trim();

            // 4. THE DRY RUN OUTPUT
            if (aiResponse !== "SKIP") {
                console.log(`✅ MATCH FOUND!`);
                console.log(`📱 TO: ${leadData?.email || 'Unknown'}`);
                console.log(`💬 MESSAGE: "${aiResponse}"`);
                messagesDrafted++;
            } else {
                console.log(`❌ No match today for ${buyerName}. (AI skipped)`);
            }
        }

        console.log(`\n🏁 Engine Shutdown. Drafted ${messagesDrafted} messages.`);
        return NextResponse.json({ success: true, matchesFound: messagesDrafted });

    } catch (error) {
        console.error("Cron Job Error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}