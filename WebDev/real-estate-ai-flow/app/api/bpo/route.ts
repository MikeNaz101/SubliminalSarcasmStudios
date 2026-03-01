import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // BPOs require heavy thinking, give it 60 seconds

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { subjectAddress } = await req.json();

        if (!subjectAddress) {
            return NextResponse.json({ error: "Subject address is required" }, { status: 400 });
        }

        // 1. MOCK DATA FETCH: In production, this is where you call the ATTOM or Realty Mole API
        // We are using Queensbury, NY data as our baseline test environment
        const mockComps = [
            { address: "12 Saint James Place, Queensbury, NY", soldPrice: 315000, beds: 3, baths: 2, sqft: 1800, distance: "0.1 miles", soldDate: "2025-10-15" },
            { address: "84 Aviation Rd, Queensbury, NY", soldPrice: 305000, beds: 3, baths: 2, sqft: 1750, distance: "0.8 miles", soldDate: "2025-11-02" },
            { address: "2200 Route 9, Queensbury, NY", soldPrice: 325000, beds: 4, baths: 2.5, sqft: 2100, distance: "1.2 miles", soldDate: "2026-01-10" }
        ];

        // 2. THE FAIR HOUSING GUARDRAILS (The System Prompt)
        const systemInstruction = `
      You are an expert Real Estate Appraiser Assistant generating a Broker Price Opinion (BPO).
      I will provide you with a subject property address and a list of recently sold comparable properties.
      
      YOUR TASK:
      1. Analyze the comps and determine an estimated target price for the subject property.
      2. Write a 2-paragraph professional commentary justifying this estimated price based on the comps.

      CRITICAL FAIR HOUSING RULES FOR COMMENTARY:
      - DO NOT mention race, color, religion, sex, handicap, familial status, or national origin.
      - DO NOT describe the demographics of the neighborhood (e.g., "family-friendly", "exclusive", "diverse").
      - DO NOT use terms related to crime rates or school quality.
      - FOCUS STRICTLY ON: Physical characteristics, square footage, bed/bath count, and objective geographic proximity to general amenities.
      
      Output your response as a pure JSON object in this exact format, with no markdown formatting or backticks:
      {
        "target_price": 310000,
        "ai_commentary": "Your fair housing compliant paragraphs here..."
      }
    `;

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: systemInstruction
        });

        const prompt = `Subject Property: ${subjectAddress}\nComparables: ${JSON.stringify(mockComps)}`;

        // 3. Generate the BPO
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up the response to ensure it's pure JSON
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const bpoData = JSON.parse(cleanJson);

        // 4. Save the generated BPO to your Supabase Database
        const { data: dbData, error: dbError } = await supabase
            .from('bpo_reports')
            .insert({
                subject_address: subjectAddress,
                target_price: bpoData.target_price,
                comps_data: mockComps, // Saving the raw API data directly into our JSONB column
                ai_commentary: bpoData.ai_commentary,
                status: 'completed'
            })
            .select()
            .single();

        if (dbError) throw new Error(`Database error: ${dbError.message}`);

        return NextResponse.json({ success: true, report: dbData });

    } catch (error) {
        console.error("BPO Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate BPO" }, { status: 500 });
    }
}