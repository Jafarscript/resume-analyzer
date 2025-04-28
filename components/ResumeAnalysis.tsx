/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { extractText } from "@/lib/extractText";
import { analyzeResumeWithGemini } from "@/lib/analyzeResumeWithGemini";
import ResumeScoreCard from "@//components/ResumeScoreCard";
import ResumeFeedback from "@/components/ResumeFeedback";
import LoadingSpinner from "@/components/LoadingSpinner";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import BackToHomeButton from "./BackToHomeButton";



const ResumeAnalysis = () => {
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const text = await extractText(file);
      const combinedText = `${text}\n\nTarget Job Description:\n${jobDescription || "N/A"}`;
      const result = await analyzeResumeWithGemini(combinedText);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Something went wrong analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-6">
      <BackToHomeButton text="Back to Home" />
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/70 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex flex-col min-h-screen gap-6 py-6 lg:flex-row">
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <ResumeScoreCard
          score={analysis?.score}
          stats={analysis?.stats}
          scoreText={analysis?.scoreText}
          loading={loading}
          onUpload={handleUpload}
        />
        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
      </div>
      <div className="w-full lg:w-2/3">
        <ResumeFeedback feedback={analysis?.feedback} />
      </div>
    </div>
    </section>
  );
};

export default ResumeAnalysis;
