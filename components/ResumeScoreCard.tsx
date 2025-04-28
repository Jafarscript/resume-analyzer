/* eslint-disable @typescript-eslint/no-explicit-any */
// ResumeScoreCard.tsx
import React from "react";

const ResumeScoreCard = ({ score = 0, stats = {}, loading = false, onUpload, scoreText }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  // Get color for the circular progress based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#059669"; // Green-600
    if (score >= 80) return "#10B981"; // Green-500
    if (score >= 70) return "#34D399"; // Green-400
    if (score >= 60) return "#3B82F6"; // Blue-500
    if (score >= 50) return "#F59E0B"; // Amber-500
    if (score >= 40) return "#F97316"; // Orange-500
    return "#EF4444"; // Red-500
  };

  // Get background color for the circular progress
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "#D1FAE5"; // Green-100
    if (score >= 80) return "#D1FAE5"; // Green-100
    if (score >= 70) return "#DCFCE7"; // Green-50
    if (score >= 60) return "#DBEAFE"; // Blue-100
    if (score >= 50) return "#FEF3C7"; // Amber-100
    if (score >= 40) return "#FFEDD5"; // Orange-100
    return "#FEE2E2"; // Red-100
  };

  // Get color for the stats bars
  const getStatColor = (value: number) => {
    if (value >= 90) return "#059669"; // Green-600
    if (value >= 80) return "#10B981"; // Green-500
    if (value >= 70) return "#34D399"; // Green-400
    if (value >= 60) return "#3B82F6"; // Blue-500
    if (value >= 50) return "#F59E0B"; // Amber-500
    if (value >= 40) return "#F97316"; // Orange-500
    return "#EF4444"; // Red-500
  };

  const scoreColor = getScoreColor(score);
  const scoreBgColor = getScoreBgColor(score);

  return (
    <section className="lg:basis-1/3">
      <div className="flex flex-col items-center gap-5 rounded-lg border border-[#EAEAEA] bg-[#F7F7F7] px-8 py-8 shadow-md">
        <h3 className="text-lg font-semibold">Resume Score</h3>
        <div className="relative w-full h-96 my-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" strokeWidth="5" stroke={scoreBgColor} fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="5"
              stroke={scoreColor}
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={`${251.2 - (score / 100) * 251.2}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
            <span className="text-5xl font-semibold">{score}%</span>
            <span className="text-lg text-center text-gray-600">{scoreText}</span>
          </div>
        </div>

        <input type="file" className="hidden" id="resume-upload" onChange={handleFileChange} />
        <label
          htmlFor="resume-upload"
          className="mt-2 w-full text-center cursor-pointer rounded-full border-2 border-black text-gray-800 shadow-btnShadow bg-primary px-6 py-2"
        >
          {loading ? "Analyzing..." : "Upload and Rescan Resume"}
        </label>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          Upload your resume to get a score and personalized feedback.
          <br />
          (PDF, DOCX, and TXT formats supported)
        </p>

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
                    className="h-4 rounded-lg"
                    style={{ 
                      width: `${value}%`,
                      backgroundColor: getStatColor(value)
                    }}
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