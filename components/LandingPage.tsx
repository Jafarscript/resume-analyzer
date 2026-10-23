"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";

const SAMPLE_PREVIEW_SECTIONS = [
  {
    title: "Summary",
    score: "7.0/10",
    status: "Solid",
    statusColor: "text-blue-700",
    detail:
      "Clear seniority level and core technical stack stated upfront, though business domain impact could be quantified more explicitly.",
  },
  {
    title: "Skills",
    score: "8.5/10",
    status: "Strong",
    statusColor: "text-emerald-700",
    detail:
      "Well-grouped competencies across languages, frameworks, and infrastructure with zero redundant filler terms.",
  },
  {
    title: "Work Experience",
    score: "6.5/10",
    status: "Fair",
    statusColor: "text-amber-700",
    detail:
      "Recent role includes concrete latency metrics, whereas earlier positions list routine responsibilities without outcomes.",
  },
  {
    title: "Formatting & Readability",
    score: "8.0/10",
    status: "Strong",
    statusColor: "text-emerald-700",
    detail:
      "Standard chronological headings and clean single-column hierarchy parse cleanly across ATS scanners.",
  },
];

const SCORING_TIERS = [
  {
    range: "90–100%",
    tier: "Excellent",
    tone: "text-emerald-700",
    criteria:
      "Quantified outcomes across roles, strong keyword alignment, and clean ATS-parseable structure.",
  },
  {
    range: "80–89%",
    tier: "Job ready",
    tone: "text-emerald-700",
    criteria:
      "Clear section hierarchy and solid skill evidence with minor opportunities to sharpen metrics.",
  },
  {
    range: "70–79%",
    tier: "Good",
    tone: "text-teal-700",
    criteria:
      "Competent baseline resume; select sections rely on task descriptions rather than measurable results.",
  },
  {
    range: "60–69%",
    tier: "Above average",
    tone: "text-blue-700",
    criteria:
      "Readable layout, but missing targeted domain keywords or depth in project and experience entries.",
  },
  {
    range: "0–59%",
    tier: "Needs improvement",
    tone: "text-amber-700",
    criteria:
      "Structural parsing gaps, vague summaries, or insufficient evidence of core qualifications.",
  },
];

export default function LandingHero() {
  const [openPreviewIdx, setOpenPreviewIdx] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* 3-Zone Top Bar Contract */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Resume Analyzer
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#how-it-works"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#dimensions"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Dimensions
            </a>
            <a
              href="#scoring-scale"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Scoring Scale
            </a>
            <a
              href="#formats"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Formats
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <Link
              href="/resume"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Analyze Resume
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section: 2-Column Balanced Split */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Proposition & Action */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Document Diagnostics</span>
              <span aria-hidden="true">·</span>
              <span>PDF, DOCX & TXT</span>
              <span aria-hidden="true">·</span>
              <span>ATS Evaluation</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-[1.12] [text-wrap:balance]">
              Objective scoring for every section of your resume.
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Upload your existing resume file to evaluate ATS parseability,
              verify technical and soft-skill evidence, and inspect strengths
              and gaps across six core sections. Add an optional job description
              to measure role alignment.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Upload Resume File</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#scoring-scale"
                className="text-sm font-medium text-slate-700 hover:text-slate-950 underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                Review scoring rubric
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>Browser-side text extraction</span>
              <span aria-hidden="true">·</span>
              <span>No account required</span>
              <span aria-hidden="true">·</span>
              <span>Files are never stored</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Diagnostic Preview */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-xs text-slate-500">Sample Diagnostic Output</p>
                  <h2 className="font-display text-base font-semibold text-slate-900 mt-0.5">
                    Overall Evaluation
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-mono tabular-nums text-2xl font-bold text-slate-900">
                    76%
                  </span>
                  <span className="block text-xs font-medium text-teal-700">
                    Good · ATS Parse 84%
                  </span>
                </div>
              </div>

              {/* Statistics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1">
                <div>
                  <span className="block text-xs text-slate-500">Searchability</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-900">
                    82%
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Hard Skills</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-900">
                    80%
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Soft Skills</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-900">
                    68%
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Formatting</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-900">
                    84%
                  </span>
                </div>
              </div>

              {/* Interactive Section Rows */}
              <div className="divide-y divide-slate-200 border-t border-slate-200">
                {SAMPLE_PREVIEW_SECTIONS.map((sec, idx) => {
                  const isOpen = openPreviewIdx === idx;
                  return (
                    <div key={sec.title}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenPreviewIdx(isOpen ? null : idx)
                        }
                        className="w-full py-3 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-display text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {sec.title}
                          </span>
                          <span className="font-mono tabular-nums text-xs text-slate-600">
                            {sec.score}
                          </span>
                          <span aria-hidden="true" className="text-slate-300 text-xs">
                            ·
                          </span>
                          <span className={`text-xs font-medium ${sec.statusColor}`}>
                            {sec.status}
                          </span>
                        </div>
                        <span className="text-slate-400">
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="pb-3.5 text-xs text-slate-600 leading-relaxed">
                          {sec.detail}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: 3-Step Workflow */}
      <section
        id="how-it-works"
        className="border-t border-slate-200 bg-slate-50 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              How the analysis works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Designed strictly for auditing and benchmarking your existing resume
              file—so you know what works and what needs revision before applying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="font-mono tabular-nums text-xs font-semibold text-blue-600">
                01. Upload Document
              </span>
              <h3 className="font-display text-base font-semibold text-slate-900">
                Select your PDF, DOCX, or TXT file
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                PDFs are inspected directly alongside extracted DOCX and plain
                text content so both your text hierarchy and visual layout are
                evaluated accurately.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="font-mono tabular-nums text-xs font-semibold text-blue-600">
                02. Optional Role Context
              </span>
              <h3 className="font-display text-base font-semibold text-slate-900">
                Paste a target job description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluate your resume on general industry standards alone, or
                paste a specific job posting to check matched qualifications and
                missing requirements.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <span className="font-mono tabular-nums text-xs font-semibold text-blue-600">
                03. Review & Rescan
              </span>
              <h3 className="font-display text-base font-semibold text-slate-900">
                Inspect section-by-section scores
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Examine strengths and areas for improvement across every resume
                section, update your document in your preferred editor, and
                re-upload to verify score gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Dimensions: Asymmetric Bento Grid */}
      <section id="dimensions" className="py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              What gets evaluated
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every scan scores both high-level searchability metrics and
              individual resume sections on a 10-point diagnostic scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 border border-slate-200 rounded-xl p-7 space-y-3 bg-white">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                01. Six-Section Structural Audit
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Each uploaded resume is broken down into Summary, Skills, Work
                Experience, Projects, Education, and Formatting & Readability.
                Every section receives an independent numerical score alongside
                verified strengths and specific weaknesses.
              </p>
            </div>

            <div className="lg:col-span-5 border border-slate-200 rounded-xl p-7 space-y-3 bg-slate-50/70">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                02. ATS Searchability & Parsing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Flags non-standard headings, missing contact details, and dense
                unstructured blocks that hinder Applicant Tracking System
                indexing.
              </p>
            </div>

            <div className="lg:col-span-5 border border-slate-200 rounded-xl p-7 space-y-3 bg-slate-50/70">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                03. Hard & Soft Skill Evidence
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Distinguishes between skills merely listed in a glossary and
                competencies backed by concrete project or role outcomes.
              </p>
            </div>

            <div className="lg:col-span-7 border border-slate-200 rounded-xl p-7 space-y-3 bg-white">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                04. Job Description Gap Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you include a target job posting, the analyzer cross-checks
                required tools, qualifications, and domain terminology against
                your resume text—listing confirmed matches and missing gaps side
                by side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Scale Rubric */}
      <section
        id="scoring-scale"
        className="py-20 px-6 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Scoring rubric
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The analyzer applies strict grading standards. High scores are
              reserved for resumes with clear structure, specific technical
              evidence, and measurable outcomes.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="py-3.5 px-5 whitespace-nowrap">Score Range</th>
                  <th className="py-3.5 px-5 whitespace-nowrap">Rating</th>
                  <th className="py-3.5 px-5">Diagnostic Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {SCORING_TIERS.map((row) => (
                  <tr key={row.range} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-5 font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                      {row.range}
                    </td>
                    <td
                      className={`py-3.5 px-5 font-medium whitespace-nowrap ${row.tone}`}
                    >
                      {row.tier}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {row.criteria}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Formats & Final Conversion */}
      <section id="formats" className="py-20 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
            <span>Supported Formats: PDF (.pdf)</span>
            <span aria-hidden="true">·</span>
            <span>Word (.docx)</span>
            <span aria-hidden="true">·</span>
            <span>Plain Text (.txt)</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
            See where your resume stands before you submit your application.
          </h2>
          <div className="pt-2">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Go to Resume Analyzer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 py-8 px-6 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-semibold text-slate-800">
            Resume Analyzer
          </span>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#dimensions" className="hover:text-slate-900 transition-colors">
              Dimensions
            </a>
            <a href="#scoring-scale" className="hover:text-slate-900 transition-colors">
              Scoring Scale
            </a>
            <Link href="/resume" className="hover:text-slate-900 transition-colors">
              Analyze Resume
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Resume Analyzer</p>
        </div>
      </footer>
    </div>
  );
}
