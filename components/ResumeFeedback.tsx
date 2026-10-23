"use client";

import React, { useState } from "react";
import { Plus, Minus, Upload } from "lucide-react";

interface FeedbackItem {
  title: string;
  score: string;
  scoreInNumber: number;
  scoreColor?: string;
  description: string;
  strengths: string[];
  improvements: string[];
}

interface JobMatch {
  matchScore: number;
  verdict: string;
  matchedKeywords: string[];
  missingKeywords: string[];
}

interface ResumeFeedbackProps {
  feedback?: FeedbackItem[];
  jobMatch?: JobMatch;
  summary?: string;
  loading?: boolean;
  onTriggerUpload?: () => void;
}

const EXPECTED_SECTIONS = [
  {
    name: "Summary",
    detail: "Clarity of professional positioning, seniority signal, and role focus.",
  },
  {
    name: "Skills",
    detail: "Organization, specificity, and relevance of technical and domain skills.",
  },
  {
    name: "Work Experience",
    detail: "Chronological clarity, scope of ownership, and measurable outcomes.",
  },
  {
    name: "Projects",
    detail: "Applied portfolio evidence, technical depth, and problem-to-result framing.",
  },
  {
    name: "Education",
    detail: "Academic credentials, relevant coursework, and verified certifications.",
  },
  {
    name: "Formatting & Readability",
    detail: "Standard ATS section headings, contact completeness, and visual scannability.",
  },
];

const ResumeFeedback: React.FC<ResumeFeedbackProps> = ({
  feedback = [],
  jobMatch,
  summary,
  loading = false,
  onTriggerUpload,
}) => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    2: true,
  });
  const [filterMode, setFilterMode] = useState<"all" | "attention">("all");

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const next: Record<number, boolean> = {};
    feedback.forEach((_, idx) => {
      next[idx] = true;
    });
    setOpenSections(next);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const getSectionSemantic = (scoreNum: number) => {
    if (scoreNum >= 8) {
      return { text: "Strong", className: "text-emerald-700" };
    }
    if (scoreNum >= 6.5) {
      return { text: "Solid", className: "text-blue-700" };
    }
    if (scoreNum >= 5) {
      return { text: "Fair", className: "text-amber-700" };
    }
    return { text: "Needs Work", className: "text-red-700" };
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="space-y-2.5 border-b border-slate-100 pb-5">
          <div className="h-4 w-44 bg-slate-200 rounded animate-pulse" />
          <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-3.5 w-4/5 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="divide-y divide-slate-100">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="py-4 flex items-center justify-between">
              <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State (Before Upload)
  if (!feedback.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Diagnostic Section Breakdown
            </h2>
            <p className="text-sm text-slate-500">
              Upload a PDF, DOCX, or TXT resume to score each section from 0 to 10.
            </p>
          </div>
          {onTriggerUpload && (
            <button
              type="button"
              onClick={onTriggerUpload}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select Resume File</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {EXPECTED_SECTIONS.map((sec, idx) => (
            <div
              key={sec.name}
              className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6"
            >
              <div className="flex items-baseline gap-3 shrink-0">
                <span className="font-mono tabular-nums text-xs text-slate-400">
                  0{idx + 1}.
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {sec.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 sm:text-right">{sec.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayedFeedback = feedback
    .map((section, originalIndex) => ({ section, originalIndex }))
    .filter(({ section }) =>
      filterMode === "attention" ? section.scoreInNumber < 7 : true
    );

  const anyOpen = Object.values(openSections).some(Boolean);

  return (
    <div className="space-y-6">
      {/* Executive Assessment Summary */}
      {summary && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-2">
          <h2 className="font-display text-base font-semibold text-slate-900">
            Diagnostic Overview
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Optional Job Description Alignment */}
      {jobMatch && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-display text-base font-semibold text-slate-900">
                Job Description Alignment
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{jobMatch.verdict}</p>
            </div>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="text-xs text-slate-500">Role Match:</span>
              <span className="font-mono tabular-nums text-lg font-semibold text-slate-900">
                {jobMatch.matchScore}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-slate-100">
            <div className="space-y-2.5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xs font-semibold text-emerald-800">
                  Matched Qualifications in Resume
                </h3>
                <span className="font-mono tabular-nums text-xs text-slate-400">
                  {jobMatch.matchedKeywords.length} found
                </span>
              </div>
              {jobMatch.matchedKeywords.length > 0 ? (
                <ul className="space-y-1.5">
                  {jobMatch.matchedKeywords.map((kw, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 flex items-baseline gap-2"
                    >
                      <span className="text-emerald-600 font-mono shrink-0">+</span>
                      <span>{kw}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">
                  No direct keyword matches detected.
                </p>
              )}
            </div>

            <div className="space-y-2.5 md:pl-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xs font-semibold text-amber-800">
                  Missing Requirements from Posting
                </h3>
                <span className="font-mono tabular-nums text-xs text-slate-400">
                  {jobMatch.missingKeywords.length} missing
                </span>
              </div>
              {jobMatch.missingKeywords.length > 0 ? (
                <ul className="space-y-1.5">
                  {jobMatch.missingKeywords.map((kw, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 flex items-baseline gap-2"
                    >
                      <span className="text-amber-600 font-mono shrink-0">−</span>
                      <span>{kw}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">
                  All primary requirements appear covered.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section-by-Section Feedback */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-base font-semibold text-slate-900">
              Section Feedback
            </h2>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filterMode === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({feedback.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("attention")}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filterMode === "attention"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Needs Attention ({feedback.filter((f) => f.scoreInNumber < 7).length})
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={anyOpen ? collapseAll : expandAll}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            {anyOpen ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {displayedFeedback.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Every section scored 7.0/10 or higher. Switch to &ldquo;All&rdquo; to inspect full feedback.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {displayedFeedback.map(({ section, originalIndex }) => {
              const isOpen = !!openSections[originalIndex];
              const semantic = getSectionSemantic(section.scoreInNumber);

              return (
                <div key={originalIndex} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(originalIndex)}
                    className="flex items-center justify-between w-full py-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 rounded"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-4">
                      <h3 className="font-display font-semibold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                        {section.title}
                      </h3>
                      <div className="flex items-baseline gap-2 text-xs">
                        <span className="font-mono tabular-nums font-semibold text-slate-800">
                          {section.score}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                        <span className={`font-medium ${semantic.className}`}>
                          {semantic.text}
                        </span>
                      </div>
                    </div>

                    <span className="text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 pt-1 space-y-4 transition-opacity duration-150">
                      {section.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {section.description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 md:divide-x md:divide-slate-100">
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-emerald-800">
                            Strengths
                          </h4>
                          {section.strengths.length > 0 ? (
                            <ul className="space-y-2">
                              {section.strengths.map((point, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-slate-700 leading-relaxed flex items-baseline gap-2"
                                >
                                  <span className="text-emerald-600 font-mono shrink-0">
                                    +
                                  </span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-400">
                              No notable strengths recorded for this section.
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 md:pl-6">
                          <h4 className="text-xs font-semibold text-amber-800">
                            Areas for Improvement
                          </h4>
                          {section.improvements.length > 0 ? (
                            <ul className="space-y-2">
                              {section.improvements.map((point, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-slate-700 leading-relaxed flex items-baseline gap-2"
                                >
                                  <span className="text-amber-600 font-mono shrink-0">
                                    →
                                  </span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-400">
                              No critical issues flagged in this section.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeFeedback;
