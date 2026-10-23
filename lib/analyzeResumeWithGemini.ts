import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

export const FeedbackSectionSchema = z.object({
  title: z.string(),
  score: z.string().default("7.0/10"),
  scoreInNumber: z.number().min(0).max(10).default(7),
  scoreColor: z.string().optional().default("text-slate-700"),
  description: z.string().default(""),
  strengths: z.array(z.string()).default([]),
  improvements: z.array(z.string()).default([]),
});

export const JobMatchSchema = z.object({
  matchScore: z.number().min(0).max(100).default(70),
  verdict: z
    .string()
    .default("Moderate alignment with the provided job description."),
  matchedKeywords: z.array(z.string()).default([]),
  missingKeywords: z.array(z.string()).default([]),
});

export const ResumeAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  scoreText: z.string().default("Needs improvement"),
  summary: z.string().default(""),
  atsScore: z.number().min(0).max(100).default(70),
  wordCount: z.number().int().nonnegative().optional(),
  stats: z.object({
    searchability: z.number().min(0).max(100).default(70),
    hardskills: z.number().min(0).max(100).default(70),
    softskills: z.number().min(0).max(100).default(70),
    formatting: z.number().min(0).max(100).default(70),
  }),
  jobMatch: JobMatchSchema.optional(),
  feedback: z.array(FeedbackSectionSchema).default([]),
});

export type ResumeAnalysisResult = z.infer<typeof ResumeAnalysisSchema>;

export interface AnalyzeResumeInput {
  resumeText?: string;
  pdfBase64?: string;
  jobDescriptionText?: string;
}

export const analyzeResumeWithGemini = async ({
  resumeText,
  pdfBase64,
  jobDescriptionText,
}: AnalyzeResumeInput): Promise<ResumeAnalysisResult> => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const prompt = `You are a rigorous, objective resume evaluator and ATS (Applicant Tracking System) auditor.
Your sole responsibility is to analyze and critique the uploaded resume document. Do NOT generate or rewrite resume content for the user; provide objective diagnostic scoring, strengths observed, and analytical areas for improvement.

${
  jobDescriptionText
    ? `Evaluate the resume both on overall professional quality and against this Target Job Description:\n"""\n${jobDescriptionText}\n"""`
    : `No specific job description was provided. Evaluate the resume against high industry standards for the candidate's apparent field.`
}

${
  resumeText
    ? `Uploaded Resume Text:\n"""\n${resumeText}\n"""`
    : `Inspect the attached PDF resume document carefully, evaluating both its text content and visual layout/formatting.`
}

Respond strictly with a single valid JSON object matching this exact structure:
{
  "score": <integer 0-100 representing overall resume quality>,
  "scoreText": <one of: "Excellent", "Job ready", "Above average", "Needs improvement", "Significant improvements needed">,
  "summary": <2-sentence objective diagnostic assessment of the resume's overall readiness, primary strength, and biggest weakness>,
  "atsScore": <integer 0-100 measuring ATS parseability, standard section headings, contact completeness, and chronological clarity>,
  "wordCount": <integer approximate word count of the resume content>,
  "stats": {
    "searchability": <integer 0-100: ATS keyword clarity, standard section headings, contact info completeness>,
    "hardskills": <integer 0-100: depth and specificity of technical/domain competencies and measurable evidence>,
    "softskills": <integer 0-100: evidence of collaboration, ownership, communication, and leadership>,
    "formatting": <integer 0-100: structural organization, readability, conciseness, and date consistency>
  },
  ${
    jobDescriptionText
      ? `"jobMatch": {
    "matchScore": <integer 0-100 reflecting qualification overlap with the target job description>,
    "verdict": <1-sentence objective summary of role alignment>,
    "matchedKeywords": [<array of specific skills, tools, or requirements from the job description confirmed in the resume>],
    "missingKeywords": [<array of key skills, tools, or requirements in the job description missing or weak in the resume>]
  },`
      : ""
  }
  "feedback": [
    {
      "title": "Summary",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of the summary or opening positioning>,
      "strengths": [<specific strengths observed in this section>],
      "improvements": [<objective analytical recommendations on what is weak, vague, or missing>]
    },
    {
      "title": "Skills",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of technical and domain skills presentation>,
      "strengths": [<specific strengths observed>],
      "improvements": [<objective analytical recommendations>]
    },
    {
      "title": "Work Experience",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of work history, scope, and quantified outcomes>,
      "strengths": [<specific strengths observed>],
      "improvements": [<objective analytical recommendations>]
    },
    {
      "title": "Projects",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of projects or portfolio evidence (note if omitted and whether relevant for this profile)>,
      "strengths": [<specific strengths observed>],
      "improvements": [<objective analytical recommendations>]
    },
    {
      "title": "Education",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of academic credentials and certifications>,
      "strengths": [<specific strengths observed>],
      "improvements": [<objective analytical recommendations>]
    },
    {
      "title": "Formatting & Readability",
      "score": "X.X/10",
      "scoreInNumber": <number 0-10>,
      "description": <concise diagnostic evaluation of document structure, clarity, and ATS compatibility>,
      "strengths": [<specific strengths observed>],
      "improvements": [<objective analytical recommendations>]
    }
  ]
}`;

  const contents = pdfBase64
    ? {
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: pdfBase64,
            },
          },
          { text: prompt },
        ],
      }
    : prompt;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini API returned an empty response.");
    }

    const cleanedText = text.replace(/^```json\s*|```$/g, "").trim();
    const json = JSON.parse(cleanedText);

    return ResumeAnalysisSchema.parse(json);
  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    if (error instanceof z.ZodError) {
      console.error("Gemini response validation error:", error.issues);
      throw new Error(
        "Analysis response format was invalid. Please try scanning again."
      );
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred during resume analysis.");
    }
  }
};
