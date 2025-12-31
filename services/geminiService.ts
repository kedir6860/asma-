import { GoogleGenAI } from "@google/genai";

export const analyzeHealthData = async (dataContext: any) => {
  try {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an Ethiopian Public Health expert, analyze the following DHIS2 metrics and provide 3 key insights or recommendations for the local health office. Use concise language:
      ${JSON.stringify(dataContext)}`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "No insights could be generated from the data provided.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Could not generate AI insights at this time. Please check your network connection.";
  }
};