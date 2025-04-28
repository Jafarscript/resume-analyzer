/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ResumeFeedback = ({ feedback = [] }: { feedback: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!feedback.length) {
    return (
      <div className="flex items-center justify-center text-gray-400 h-full">
        Upload a resume to get feedback
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-[#F7F7F7] p-6 shadow-lg  text-black">
      {feedback.map((section, index) => (
        <div key={index} className="border-b last:border-none">
          <button
            onClick={() => toggleSection(index)}
            className="flex justify-between items-center w-full py-4 text-left"
          >
            <div className="flex gap-3 items-center">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  section.scoreInNumber >= 8
                    ? "bg-green-100 text-green-700"
                    : section.scoreInNumber >= 6
                    ? "bg-blue-100 text-blue-700"
                    : section.scoreInNumber >= 4
                    ? "bg-yellow-100 text-yellow-700"
                    : section.scoreInNumber >= 2
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {section.score}
              </span>
            </div>
            <span className="text-gray-500">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-6">
                  <p className="text-gray-600 mb-4">{section.description}</p>

                  <h4 className="font-semibold">Strengths</h4>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {section.strengths.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold">Areas for Improvement</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {section.improvements.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ResumeFeedback;
