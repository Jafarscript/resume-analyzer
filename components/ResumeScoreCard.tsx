/* eslint-disable @typescript-eslint/no-explicit-any */
// ResumeScoreCard.tsx
import React from "react";

const ResumeScoreCard = ({ score = 0, stats = {}, loading = false, onUpload, scoreText }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <section className="lg:basis-1/3">
      <div className="flex flex-col items-center gap-5 rounded-lg border border-[#EAEAEA] bg-[#F7F7F7] px-8 py-8 shadow-md">
        <h3 className="text-lg font-semibold">Resume Score</h3>
        <div className="relative w-full h-80 my-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" strokeWidth="5" stroke={score >= 70 ? "#dcf3de" : "#F3E8C9"} fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="5"
              stroke={score >= 70 ? "#02A813" : "#F7AF1A"}
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={`${251.2 - (score / 100) * 251.2}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-semibold">{score}%</span>
            <span className="text-xl text-gray-600">{scoreText}</span>
          </div>
        </div>

        <input type="file" className="hidden" id="resume-upload" onChange={handleFileChange} />
        <label
          htmlFor="resume-upload"
          className="mt-2 w-full text-center cursor-pointer rounded-full border-2 border-black text-white shadow-btnShadow bg-primary px-6 py-2"
        >
          {loading ? "Analyzing..." : "Upload and Rescan Resume"}
        </label>

        <button className="mt-2 w-full rounded-full border-2 border-[#E6E6E6]  px-6 py-2 text-gray-600 hover:bg-gray-50">
          Edit Resume
        </button>

        {stats && (
          <div className="w-full mt-6">
            <h4 className="text-md font-semibold text-gray-800 text-center mb-4">
              Resume Statistics
            </h4>
            {Object.entries(stats).map(([key, value]: any) => (
              <div key={key} className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 capitalize">
                  <span>{key}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-lg mt-1">
                  <div
                    className="h-4 bg-green-500 rounded-lg"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeScoreCard;
