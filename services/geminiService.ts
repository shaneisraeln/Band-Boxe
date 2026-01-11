import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.VITE_GEMINI_API_KEY || '';

// Initialize the client only if the key exists to prevent immediate crashes if missing
// In a real app, handle missing key gracefully.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const chatWithAssistant = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  if (!genAI) {
    return "I'm sorry, my AI brain is currently offline (API Key missing). Please contact support directly.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: msg.parts
      })),
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text() || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};