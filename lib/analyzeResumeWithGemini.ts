import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define the schema for expected response (same as your OpenAI schema)
const FeedbackSectionSchema = z.object({
  title: z.string(),
  score: z.string(),
  scoreInNumber: z.number().min(0).max(10),
  scoreColor: z.string(),
  description: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});

const ResumeAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  // scoreText: z.string(),
  scoreText: z.enum([
    "Job ready",
    "Needs improvement",
    "Significant improvements needed",
  ]),
  stats: z.object({
    searchability: z.number().min(0).max(100),
    hardskills: z.number().min(0).max(100),
    softskills: z.number().min(0).max(100),
  }),
  feedback: z.array(FeedbackSectionSchema),
});

export const analyzeResumeWithGemini = async (
  resumeText: string,
  jobDescriptionText?: string
) => {
  const prompt = `
    You are an extremely strict and critical resume reviewer AI. Analyze the resume below ${
      jobDescriptionText
        ? `with respect to the following job description too.`
        : `without any job description.`
    }You have very high standards and will only give positive scores to truly exceptional resumes. Analyze the resume below and respond with a JSON object containing:
  - "score": a number between 0 and 100 (overall resume quality)
  - "scoreText": a string like "Job ready" or "Needs improvement" or "Significant improvements needed"
  - "stats": an object with three numbers (each 0–100) for "searchability", "hardskills", and "softskills"
  - "feedback": an array of sections with:
     - "title" (string),
     - "score" (string like "7.0/10"),
     - "scoreInNumber" (number between 0 and 10),
     - "scoreColor" (Tailwind CSS utility class for visual score color),
     - "description" (short summary of analysis),
     - "strengths" (array of strings),
     - "improvements" (array of strings)

    
    Analyze this resume and respond only with valid JSON.
    
    Resume:
  ${resumeText}
  Here is the job description (if provided):
${jobDescriptionText || "No job description provided."}
      `;

  // Respond only with valid JSON. Do not include any other text or explanation. If you cannot analyze the resume, return an error message in the same JSON format.
  // If the resume is empty, return an error message in the same JSON format.
  // `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Gemini API returned an empty response.");
    }

    const cleanedText = text.replace(/^```json\s*|```$/g, "").trim();
    const json = JSON.parse(cleanedText);

    return ResumeAnalysisSchema.parse(json); // ✅ Validate before using
  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    if (error instanceof z.ZodError) {
      console.error("Gemini response validation error:", error.issues);
      throw new Error("Gemini response format was invalid.");
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred during Gemini analysis.");
    }
  }
};
