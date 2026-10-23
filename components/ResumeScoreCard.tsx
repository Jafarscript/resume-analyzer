"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

interface ResumeScoreCardProps {
  score?: number;
  atsScore?: number;
  stats?: {
    searchability?: number;
    hardskills?: number;
    softskills?: number;
    formatting?: number;
    [key: string]: number | undefined;
  };
  scoreText?: string;
  loading?: boolean;
  hasAnalysis?: boolean;
  fileMeta?: {
    name: string;
    sizeKb: string;
    wordCount?: number;
  } | null;
  onUpload: (file: File) => void;
}

const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({
  score = 0,
  atsScore,
  stats = {},
  scoreText,
  loading = false,
  hasAnalysis = false,
  fileMeta = null,
  onUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const getScoreTheme = (val: number) => {
    if (!hasAnalysis) {
      return {
        stroke: "#cbd5e1",
        bgRing: "#f1f5f9",
        textColor: "text-slate-400",
        label: "Awaiting upload",
      };
    }
    if (val >= 90) {
      return {
        stroke: "#059669",
        bgRing: "#d1fae5",
        textColor: "text-emerald-700",
        label: scoreText || "Excellent",
      };
    }
    if (val >= 80) {
      return {
        stroke: "#10b981",
        bgRing: "#d1fae5",
        textColor: "text-emerald-700",
        label: scoreText || "Job ready",
      };
    }
    if (val >= 70) {
      return {
        stroke: "#0d9488",
        bgRing: "#ccfbf1",
        textColor: "text-teal-700",
        label: scoreText || "Good",
      };
    }
    if (val >= 60) {
      return {
        stroke: "#2563eb",
        bgRing: "#dbeafe",
        textColor: "text-blue-700",
        label: scoreText || "Above average",
      };
    }
    if (val >= 50) {
      return {
        stroke: "#d97706",
        bgRing: "#fef3c7",
        textColor: "text-amber-700",
        label: scoreText || "Average",
      };
    }
    if (val >= 40) {
      return {
        stroke: "#ea580c",
        bgRing: "#ffedd5",
        textColor: "text-orange-700",
        label: scoreText || "Below average",
      };
    }
    return {
      stroke: "#dc2626",
      bgRing: "#fee2e2",
      textColor: "text-red-700",
      label: scoreText || "Needs improvement",
    };
  };

  const getBarColor = (val: number) => {
    if (val >= 80) return "bg-emerald-600";
    if (val >= 65) return "bg-blue-600";
    if (val >= 50) return "bg-amber-500";
    return "bg-red-600";
  };

  const theme = getScoreTheme(score);
  const normalizedScore = hasAnalysis ? Math.min(100, Math.max(0, score)) : 0;
  const strokeDashoffset = 251.2 - (normalizedScore / 100) * 251.2;

  const statLabels: Record<string, string> = {
    searchability: "Searchability",
    hardskills: "Hard Skills",
    softskills: "Soft Skills",
    formatting: "Formatting & Readability",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
        <h2 className="font-display text-base font-semibold text-slate-900">
          Resume Score
        </h2>
        {hasAnalysis && atsScore !== undefined && (
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            ATS Parse: {atsScore}%
          </span>
        )}
      </div>

      {/* Circular Gauge */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="6"
              stroke={theme.bgRing}
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="6"
              stroke={theme.stroke}
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="font-mono tabular-nums text-4xl font-semibold tracking-tight text-slate-900">
              {hasAnalysis ? `${score}%` : "—"}
            </span>
            <span className={`text-xs font-medium mt-1.5 ${theme.textColor}`}>
              {theme.label}
            </span>
          </div>
        </div>
      </div>

      {/* File Upload Dropzone / Button */}
      <div className="space-y-3">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
        <label
          htmlFor="resume-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`w-full flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-5 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-600 bg-blue-50/40"
              : "border-slate-300 hover:border-slate-900 bg-slate-50/60 hover:bg-slate-50"
          } ${loading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <Upload className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
            {loading
              ? "Scanning document..."
              : hasAnalysis
              ? "Upload & Rescan Resume"
              : "Upload Resume File"}
          </span>
          <span className="text-xs text-slate-500">
            Drop PDF, DOCX, or TXT here, or click to browse
          </span>
        </label>

        {fileMeta && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-0.5">
            <span className="truncate max-w-[180px] font-medium text-slate-700" title={fileMeta.name}>
              {fileMeta.name}
            </span>
            <span className="font-mono tabular-nums shrink-0">
              {fileMeta.sizeKb}
              {fileMeta.wordCount !== undefined ? ` · ${fileMeta.wordCount} words` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Resume Statistics */}
      {hasAnalysis && Object.keys(stats).length > 0 && (
        <div className="pt-5 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-900">Resume Statistics</span>
            <span className="font-mono tabular-nums">0–100%</span>
          </div>

          <div className="space-y-3.5">
            {Object.entries(stats).map(([key, value]) => {
              if (typeof value !== "number") return null;
              const label =
                statLabels[key] ||
                key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-slate-700 font-medium">{label}</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {value}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                        value
                      )}`}
                      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeScoreCard;