import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the Google Generative AI client with your React environment variable
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

// 2. Upgrade the model string to the active production model
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });