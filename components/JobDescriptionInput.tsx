"use client";

import React from "react";
import { X, RefreshCw } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
  canReanalyze?: boolean;
  loading?: boolean;
  onReanalyze?: () => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  onClear,
  canReanalyze = false,
  loading = false,
  onReanalyze,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label
            htmlFor="job-description"
            className="font-display text-sm font-semibold text-slate-900 block"
          >
            Target Job Description
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            Optional · Compare your uploaded resume against a specific role
          </p>
        </div>

        {value && (
          <button
            type="button"
            onClick={() => (onClear ? onClear() : onChange(""))}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div>
        <textarea
          id="job-description"
          className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-y min-h-[120px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job requirements and responsibilities here before or after uploading your resume..."
        />
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <span className="font-mono tabular-nums">
            {value ? `${value.length} chars` : "No job posting added"}
          </span>

          {canReanalyze && onReanalyze && (
            <button
              type="button"
              onClick={onReanalyze}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Re-run Analysis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
