"use server";

import { generatePersonalizedInterventionMessage, GeneratePersonalizedInterventionMessageInput } from "@/ai/flows/generate-personalized-intervention-message";

export async function generateInterventionAction(input: GeneratePersonalizedInterventionMessageInput) {
    try {
        const output = await generatePersonalizedInterventionMessage(input);
        return { success: true, message: output.interventionMessage };
    } catch (error) {
        console.error("Error generating intervention message:", error);
        return { success: false, error: "Failed to generate intervention message." };
    }
}
