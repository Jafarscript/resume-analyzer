import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeWithGemini } from "@/lib/analyzeResumeWithGemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, pdfBase64, jobDescriptionText } = body;

    const hasText = typeof resumeText === "string" && resumeText.trim().length > 0;
    const hasPdf = typeof pdfBase64 === "string" && pdfBase64.trim().length > 0;

    if (!hasText && !hasPdf) {
      return NextResponse.json(
        { error: "A valid resume document (PDF, DOCX, or TXT) is required for analysis." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeWithGemini({
      resumeText: hasText ? resumeText : undefined,
      pdfBase64: hasPdf ? pdfBase64 : undefined,
      jobDescriptionText:
        typeof jobDescriptionText === "string" && jobDescriptionText.trim()
          ? jobDescriptionText.trim()
          : undefined,
    });

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error("Error in /api/analyze route:", error);
    const message =
      error instanceof Error ? error.message : "Failed to analyze resume";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
