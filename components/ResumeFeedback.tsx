/* eslint-disable @typescript-eslint/no-explicit-any */
// ResumeFeedback.tsx
import React from "react";

const ResumeFeedback = ({ feedback = [] }: { feedback: any[] }) => {
  console.log(feedback)
  if (!feedback.length)
    return (
      <div className="lg:basis-2/3 flex items-center justify-center h-full text-gray-500">
        Upload a resume to get feedback
      </div>
    );

  return (
    <div className="rounded-lg border border-[#EAEAEA] bg-[#F7F7F7] p-6 shadow-md lg:basis-2/3">
      {feedback.map((section, index) => (
        <div key={index} className="bg-[#F7F7F7] border  rounded-lg p-4 mb-8">
          <div className="flex gap-5 items-center">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <span
              className={`px-3 py-2 text-sm ${section.scoreInNumber >= 5.0 ? 'bg-[#02A8131A] text-[#02A813]' : 'bg-[#F7AF1A1A] text-[#F7AF1A]'} rounded-2xl font-semibold`}
            >
              {section.score}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{section.description}</p>
          <hr className="my-3" />
          <h4 className="font-semibold">Strengths</h4>
          <ul className="list-disc list-inside text-gray-700">
            {section.strengths.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-3">Areas for Improvement</h4>
          <ul className="list-disc list-inside text-gray-700">
            {section.improvements.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResumeFeedback;
