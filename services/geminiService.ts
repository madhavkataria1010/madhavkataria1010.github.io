import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PROJECTS, PAPERS, BIO, SKILLS, BLOG_POSTS } from '../constants';

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Kai", the AI assistant for Madhav Kataria's portfolio website.
Madhav is an AI Researcher & Full-Stack ML Developer.

Here is Madhav's context:
Bio: ${BIO}
Skills: ${SKILLS.join(', ')}

Projects (Detailed):
${PROJECTS.map(p => `
- Title: ${p.title}
  Category: ${p.category}
  Description: ${p.description}
  Tech Stack: ${p.techStack.join(', ')}
  Key Metrics: ${p.metrics || 'N/A'}
`).join('\n')}

Research Papers:
${PAPERS.map(p => `- ${p.title} (${p.conference}, ${p.year}): ${p.abstract}`).join('\n')}

Recent Blog Posts:
${BLOG_POSTS.map(b => `- ${b.title} (${b.date}): ${b.excerpt}`).join('\n')}

Your goal is to answer visitors' questions about Madhav professionally, concisely, and enthusiastically.
Keep answers relatively short (under 100 words) unless asked for detail.
Adopt a helpful, polite, and slightly sophisticated tone, matching the "Apple-like" aesthetic of the site.
If asked about specific technologies (like VLLM or CrewAI), refer to the projects or blog posts where Madhav used them.
`;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initChat = async (): Promise<void> => {
  const ai = getClient();
  if (!ai) return;

  try {
    chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        }
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
      await initChat();
  }

  if (!chatSession) {
      return "I'm sorry, I can't connect to the AI service right now. Please check the API configuration.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I didn't get a response.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "I encountered an error while thinking. Please try again.";
  }
};