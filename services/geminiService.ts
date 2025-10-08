
import { GoogleGenAI, Type } from '@google/genai';
import type { CasePrediction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

/**
 * Sends a legal query to the AI assistant.
 * @param prompt The user's legal question.
 * @returns The AI's text response.
 */
export async function askLegalAssistant(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: 'You are an AI Legal Assistant for the Indian judicial system. Provide clear, concise, and accurate answers based on Indian laws, acts, and past judgments. Do not provide legal advice, but explain legal concepts and procedures.',
    },
  });
  return response.text;
}

/**
 * Predicts the outcome of a case based on provided details.
 * @param caseDetails A string containing the facts and details of the case.
 * @returns A structured prediction object.
 */
export async function predictCaseOutcome(caseDetails: string): Promise<CasePrediction> {
    const prompt = `Based on the following case details, predict the likely outcome, provide reasoning based on legal precedents and statutes, and give a confidence score from 0 to 100.
    Case Details: ${caseDetails}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    prediction: {
                        type: Type.STRING,
                        description: 'The predicted outcome of the case (e.g., "Acquittal", "Conviction with minor sentence").',
                    },
                    reasoning: {
                        type: Type.STRING,
                        description: 'A detailed explanation for the prediction, citing relevant legal sections or precedents.',
                    },
                    confidenceScore: {
                        type: Type.INTEGER,
                        description: 'A numerical score from 0 to 100 representing the confidence in this prediction.',
                    },
                },
                required: ['prediction', 'reasoning', 'confidenceScore'],
            },
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CasePrediction;
}

/**
 * Summarizes legal research on a given topic.
 * @param topic The legal topic or case law to research.
 * @returns A summary of the research.
 */
export async function summarizeLegalResearch(topic: string): Promise<string> {
  const prompt = `Provide a detailed summary of relevant case laws, statutes, and precedents related to the following topic in the Indian legal context: "${topic}". Structure the response with clear headings.`;
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
        systemInstruction: 'You are an expert legal researcher specializing in Indian law. Your goal is to provide comprehensive and well-structured summaries.'
    }
  });
  return response.text;
}

/**
 * Analyzes a legal document and extracts key points.
 * @param documentText The full text of the legal document.
 * @returns A summary of the key legal points.
 */
export async function analyzeCaseDocument(documentText: string): Promise<string> {
  const prompt = `Analyze the following legal document and extract the key legal points, arguments, cited precedents, and final judgment if available. Present the information in a clear, summarized format.
  
  Document Text:
  ---
  ${documentText}
  ---
  `;
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return response.text;
}

/**
 * Detects potential bias in a legal judgment.
 * @param judgmentText The full text of the judgment.
 * @returns An analysis report on potential biases.
 */
export async function detectBias(judgmentText: string): Promise<string> {
  const prompt = `Act as an AI fairness auditor. Analyze the following legal text for any signs of bias (e.g., gender, caste, religion), inconsistent application of law, or emotionally charged language. Provide a report listing any flagged sections and explain why they might be considered biased. If no bias is found, state that clearly.
  
  Judgment Text:
  ---
  ${judgmentText}
  ---
  `;
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
        systemInstruction: 'You are an AI specializing in detecting bias and promoting fairness in legal documents. Your analysis should be objective and based on established principles of judicial fairness and ethics.'
    }
  });
  return response.text;
}
