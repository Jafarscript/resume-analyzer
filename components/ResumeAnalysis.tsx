"use client";

import { useState } from "react";
import Link from "next/link";
import {
  prepareResumePayload,
  type PreparedResumePayload,
} from "@/lib/extractText";
import type { ResumeAnalysisResult } from "@/lib/analyzeResumeWithGemini";
import ResumeScoreCard from "@/components/ResumeScoreCard";
import ResumeFeedback from "@/components/ResumeFeedback";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import { Download, RotateCcw, AlertCircle } from "lucide-react";

const ResumeAnalysis = () => {
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [preparedPayload, setPreparedPayload] =
    useState<PreparedResumePayload | null>(null);
  const [fileMeta, setFileMeta] = useState<{
    name: string;
    sizeKb: string;
    wordCount?: number;
  } | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const runAnalysisRequest = async (
    payload: PreparedResumePayload,
    jdText: string
  ) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: payload.resumeText,
          pdfBase64: payload.pdfBase64,
          jobDescriptionText: jdText.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze the resume.");
      }

      const result: ResumeAnalysisResult = await response.json();
      setAnalysis(result);

      if (result.wordCount !== undefined && payload.wordCount === undefined) {
        setFileMeta({
          name: payload.fileName,
          sizeKb: payload.sizeKb,
          wordCount: result.wordCount,
        });
      }
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong analyzing the resume.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const payload = await prepareResumePayload(file);
      setPreparedPayload(payload);
      setFileMeta({
        name: payload.fileName,
        sizeKb: payload.sizeKb,
        wordCount: payload.wordCount,
      });

      await runAnalysisRequest(payload, jobDescription);
    } catch (err: unknown) {
      console.error(err);
      setLoading(false);
      const msg =
        err instanceof Error
          ? err.message
          : "Could not read the uploaded file.";
      setError(msg);
    }
  };

  const handleReanalyzeWithJd = async () => {
    if (!preparedPayload) return;
    await runAnalysisRequest(preparedPayload, jobDescription);
  };

  const handleReset = () => {
    setAnalysis(null);
    setPreparedPayload(null);
    setFileMeta(null);
    setJobDescription("");
    setError(null);
  };

  const handleDownloadReport = () => {
    if (!analysis) return;

    const fileHeader = fileMeta
      ? `File: ${fileMeta.name} (${fileMeta.sizeKb}${
          fileMeta.wordCount !== undefined ? `, ${fileMeta.wordCount} words` : ""
        })`
      : "";

    const lines: string[] = [
      "RESUME DIAGNOSTIC REPORT",
      "========================",
      ...(fileHeader ? [fileHeader] : []),
      `Overall Score: ${analysis.score}% — ${analysis.scoreText}`,
      `ATS Parseability: ${analysis.atsScore}%`,
      "",
      "EXECUTIVE SUMMARY",
      "-----------------",
      analysis.summary,
      "",
      "STATISTICS",
      "----------",
      `- Searchability: ${analysis.stats.searchability}%`,
      `- Hard Skills: ${analysis.stats.hardskills}%`,
      `- Soft Skills: ${analysis.stats.softskills}%`,
      `- Formatting & Readability: ${analysis.stats.formatting}%`,
      "",
    ];

    if (analysis.jobMatch) {
      lines.push(
        `JOB DESCRIPTION ALIGNMENT (${analysis.jobMatch.matchScore}%)`,
        "---------------------------------",
        analysis.jobMatch.verdict,
        `Matched: ${analysis.jobMatch.matchedKeywords.join(", ") || "None"}`,
        `Missing: ${analysis.jobMatch.missingKeywords.join(", ") || "None"}`,
        ""
      );
    }

    lines.push("SECTION BREAKDOWN", "-----------------");
    analysis.feedback.forEach((sec) => {
      lines.push(`\n[${sec.title}] — ${sec.score}`);
      lines.push(sec.description);
      if (sec.strengths.length) {
        lines.push("Strengths:");
        sec.strengths.forEach((s) => lines.push(`  + ${s}`));
      }
      if (sec.improvements.length) {
        lines.push("Areas for Improvement:");
        sec.improvements.forEach((imp) => lines.push(`  - ${imp}`));
      }
    });

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume-analysis-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const triggerHiddenFileInput = () => {
    const el = document.getElementById("resume-upload");
    if (el) el.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Workspace Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2.5 text-sm whitespace-nowrap shrink-0"
          >
            <Link
              href="/"
              className="font-display font-bold text-slate-900 hover:text-blue-700 transition-colors"
            >
              Resume Analyzer
            </Link>
            <span aria-hidden="true" className="text-slate-300">
              /
            </span>
            <span className="text-slate-500">Diagnostic Workspace</span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {analysis && (
              <>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs font-semibold text-red-600 hover:text-red-800 shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Score, File Upload & Job Description */}
          <div className="lg:col-span-4 space-y-6">
            <ResumeScoreCard
              score={analysis?.score}
              atsScore={analysis?.atsScore}
              stats={analysis?.stats}
              scoreText={analysis?.scoreText}
              loading={loading}
              hasAnalysis={Boolean(analysis)}
              fileMeta={fileMeta}
              onUpload={handleUpload}
            />

            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onClear={() => setJobDescription("")}
              canReanalyze={Boolean(preparedPayload)}
              loading={loading}
              onReanalyze={handleReanalyzeWithJd}
            />
          </div>

          {/* Right Column: Section-by-Section Feedback & Job Alignment */}
          <div className="lg:col-span-8">
            <ResumeFeedback
              feedback={analysis?.feedback}
              jobMatch={analysis?.jobMatch}
              summary={analysis?.summary}
              loading={loading}
              onTriggerUpload={triggerHiddenFileInput}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysis;
