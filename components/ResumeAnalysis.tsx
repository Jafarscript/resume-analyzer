/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { analyzeResumeWithGemini } from "@/lib/analyzeResumeWithGemini";
import { extractText } from "@/lib/extractText";
import ResumeScoreCard from "./ResumeScoreCard";
import ResumeFeedback from "./ResumeFeedback";

const ResumeAnalysis = () => {
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobText, setJobText] = useState<string>("");

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const resumeText = await extractText(file);
      const result = await analyzeResumeWithGemini(resumeText, jobText);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Something went wrong analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 py-6 lg:flex-row">
      <div className="flex flex-col gap-4">
        <textarea
          className="border border-gray-300 rounded-md p-4 w-full h-40"
          placeholder="Paste Job Description (Optional)"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
        />
        <ResumeScoreCard
          score={analysis?.score}
          stats={analysis?.stats}
          scoreText={analysis?.scoreText}
          loading={loading}
          onUpload={handleUpload}
          
        />
      </div>
      <ResumeFeedback feedback={analysis?.feedback} />
    </div>
  );
};

export default ResumeAnalysis;
