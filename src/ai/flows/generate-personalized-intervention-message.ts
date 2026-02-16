'use server';
/**
 * @fileOverview A Genkit flow that generates personalized intervention messages for customers based on their risk category.
 *
 * - generatePersonalizedInterventionMessage - A function that handles the generation of personalized intervention messages.
 * - GeneratePersonalizedInterventionMessageInput - The input type for the generatePersonalizedInterventionMessage function.
 * - GeneratePersonalizedInterventionMessageOutput - The return type for the generatePersonalizedInterventionMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedInterventionMessageInputSchema = z.object({
  customerId: z.string().describe('The unique identifier for the customer.'),
  customerName: z.string().describe('The full name of the customer.'),
  riskCategory: z.enum(['Low', 'Medium', 'High']).describe('The risk category assigned to the customer.'),
  loanAmount: z.number().describe('The total loan amount of the customer.'),
  emiAmount: z.number().describe('The monthly EMI amount for the customer.'),
  paymentHistory: z.string().describe('A summary of the customer\u0027s payment history (e.g., "mostly on-time", "some delayed", "frequently delayed").'),
  missedPayments: z.number().describe('The number of missed payments by the customer.'),
});
export type GeneratePersonalizedInterventionMessageInput = z.infer<typeof GeneratePersonalizedInterventionMessageInputSchema>;

const GeneratePersonalizedInterventionMessageOutputSchema = z.object({
  interventionMessage: z.string().describe('A personalized intervention message for the customer.'),
});
export type GeneratePersonalizedInterventionMessageOutput = z.infer<typeof GeneratePersonalizedInterventionMessageOutputSchema>;

const interventionPrompt = ai.definePrompt({
  name: 'generatePersonalizedInterventionMessagePrompt',
  input: {schema: GeneratePersonalizedInterventionMessageInputSchema},
  output: {schema: GeneratePersonalizedInterventionMessageOutputSchema},
  prompt: `You are an AI assistant for a financial institution, tasked with generating personalized intervention messages for customers at risk of loan delinquency.\nYour goal is to be helpful, empathetic, and clear.\n\nCustomer Details:\n- Customer ID: {{{customerId}}}\n- Customer Name: {{{customerName}}}\n- Risk Category: {{{riskCategory}}}\n- Loan Amount: {{{loanAmount}}}\n- EMI Amount: {{{emiAmount}}}\n- Payment History: {{{paymentHistory}}}\n- Missed Payments: {{{missedPayments}}}\n\nBased on the customer's risk category, generate a suitable intervention message.\n\n{{#if (eq riskCategory "Low")}}\n  **Action:** Send Friendly Reminder\n  **Instructions:** Generate a friendly reminder message encouraging the customer to maintain their good payment habits. Offer support if they anticipate any future difficulties.\n  Example tone: Supportive and appreciative.\n\n{{else if (eq riskCategory "Medium")}}\n  **Action:** Payment Restructuring Suggestion\n  **Instructions:** Generate a message suggesting payment restructuring options. Emphasize that the institution is here to help and encourage them to contact us to discuss flexible payment plans.\n  Example tone: Proactive, helpful, and understanding.\n\n{{else if (eq riskCategory "High")}}\n  **Action:** Immediate Customer Outreach Alert\n  **Instructions:** Generate an urgent alert message indicating serious risk. Stress the importance of immediate contact to prevent further issues and discuss urgent solutions.\n  Example tone: Urgent, serious, but still offering support.\n\n{{/if}}\n\nPlease generate the personalized intervention message, starting directly with the message content:`
});

const generatePersonalizedInterventionMessageFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedInterventionMessageFlow',
    inputSchema: GeneratePersonalizedInterventionMessageInputSchema,
    outputSchema: GeneratePersonalizedInterventionMessageOutputSchema,
  },
  async (input) => {
    const {output} = await interventionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate intervention message.');
    }
    return output;
  }
);

export async function generatePersonalizedInterventionMessage(
  input: GeneratePersonalizedInterventionMessageInput
): Promise<GeneratePersonalizedInterventionMessageOutput> {
  return generatePersonalizedInterventionMessageFlow(input);
}
