import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const isProduction = import.meta.env.VITE_APP_ENV === 'production';

// Initialize the client only if the key exists to prevent immediate crashes if missing
const genAI = apiKey && apiKey !== 'PLACEHOLDER_API_KEY' ? new GoogleGenerativeAI(apiKey) : null;

// Rate limiting for API calls
let lastCallTime = 0;
const RATE_LIMIT_MS = 1000; // 1 second between calls

export const chatWithAssistant = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  // Rate limiting
  const now = Date.now();
  if (now - lastCallTime < RATE_LIMIT_MS) {
    return "Please wait a moment before sending another message.";
  }
  lastCallTime = now;

  // Input validation
  if (!newMessage || newMessage.trim().length === 0) {
    return "Please enter a message.";
  }

  if (newMessage.length > 500) {
    return "Message is too long. Please keep it under 500 characters.";
  }

  // Sanitize input
  const sanitizedMessage = newMessage.trim().replace(/[<>]/g, '');

  if (!genAI) {
    if (isProduction) {
      return "I'm sorry, the chat service is temporarily unavailable. Please contact us directly at +91 98765 43210 or contact@bandboxe.in";
    }
    return "I'm sorry, my AI brain is currently offline (API Key missing). Please contact support directly.";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    
    const chat = model.startChat({
      history: history.slice(-10).map(msg => ({ // Limit history to last 10 messages
        role: msg.role,
        parts: msg.parts
      })),
      generationConfig: {
        maxOutputTokens: 150, // Reduced for cost control
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const result = await chat.sendMessage(`You are "BandBoxe Bot", the friendly AI assistant for BandBoxe Dry Cleaners. 
    Your role is to help customers with:
    1. Stain removal advice (give brief, helpful tips).
    2. Explaining our services (Dry Cleaning, Laundry, Specialized Garment Care for Sarees/Suits).
    3. Pricing estimates (refer to general market rates if unsure, but mention our Saree wash is approx ₹350 and Suits ₹500).
    4. Booking guidance.
    
    Tone: Professional, warm, and helpful. Keep responses concise (under 100 words).
    Do not make up fake order statuses.
    If a user asks about an order status, ask for their Order ID and say you will forward it to a human agent.
    
    User message: ${sanitizedMessage}`);
    
    const response = await result.response;
    const text = response.text();
    
    // Additional output sanitization
    return text.replace(/[<>]/g, '') || "I'm not sure how to answer that. Please contact us directly for assistance.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    if (isProduction) {
      return "I'm having trouble connecting right now. Please contact us directly at +91 98765 43210 or contact@bandboxe.in";
    }
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};