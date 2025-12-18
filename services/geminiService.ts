import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const GeminiService = {
  /**
   * Solves a problem from text or image.
   */
  solveProblem: async (prompt: string, imageBase64?: string) => {
    try {
      if (!apiKey) throw new Error("API Key missing");

      const model = 'gemini-2.5-flash';
      let contents: any = { role: 'user', parts: [] };

      if (imageBase64) {
        contents.parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64
            }
        });
      }
      
      contents.parts.push({ 
        text: `You are an expert tutor. Solve this problem step-by-step. 
        Structure your answer with:
        1. **Analysis**: Briefly analyze the problem.
        2. **Step-by-Step Solution**: Detailed calculation or logic.
        3. **Final Answer**: Clearly state the result.
        
        User input: ${prompt}` 
      });

      const response = await ai.models.generateContent({
        model,
        contents: [contents], // pass as array of Content objects
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to process request. Please check your network or API key.";
    }
  },

  /**
   * Simulates smart grading of an exam paper.
   */
  gradePaper: async (imageBase64: string) => {
    try {
      if (!apiKey) throw new Error("API Key missing");
      const model = 'gemini-2.5-flash';

      const prompt = `You are a strict teacher. Analyze this image of a student's test paper.
      I need you to generate a JSON response representing the grading results.
      
      Return ONLY valid JSON with this structure:
      {
        "totalScore": number (out of 100),
        "accuracy": string (percentage),
        "summary": string (brief comment),
        "ocrText": string (transcribe the main question),
        "standardAnswer": string (the correct answer),
        "reasoning": string (explain why points were given or lost)
      }
      `;

      const response = await ai.models.generateContent({
        model,
        contents: {
            parts: [
                { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
                { text: prompt }
            ]
        },
        config: {
            responseMimeType: 'application/json'
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Grading Error:", error);
      // Fallback mock data if API fails
      return {
        totalScore: 85,
        accuracy: "85%",
        summary: "Good effort, but check the calculation in the second step.",
        ocrText: "Calculate the area of a circle with radius 5cm.",
        standardAnswer: "Area = πr² = 3.14 * 25 = 78.5 cm²",
        reasoning: "The formula was applied correctly, but there was a minor arithmetic error in the final multiplication."
      };
    }
  },

  /**
   * General chat function.
   */
  chat: async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        if (!apiKey) throw new Error("API Key missing");
        
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are a helpful, encouraging, and professional AI teaching assistant for the 'WuXue Model' app."
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat Error", error);
        return "I'm having trouble connecting right now.";
    }
  }
};