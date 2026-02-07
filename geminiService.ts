
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with a named apiKey parameter directly from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppetizingDescription = async (itemName: string): Promise<string> => {
  try {
    // Using gemini-3-flash-preview for text tasks and providing thinkingConfig when maxOutputTokens is set.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buatkan deskripsi singkat yang sangat menggugah selera untuk menu makanan bernama "${itemName}" di warung Mie Ayam Arsy. Gunakan bahasa Indonesia yang santai tapi profesional. Maksimal 2 kalimat.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    // Directly access the .text property of the GenerateContentResponse object.
    return response.text || "Menu lezat khas Mie Ayam Arsy.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Menu spesial dari resep warisan keluarga.";
  }
};