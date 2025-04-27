// app/page.tsx
import LandingHero from "@/components/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Analyzer - Improve Your Resume with AI",
  description: "Upload your resume and receive personalized feedback powered by AI. Improve your chances of landing your dream job today!",
  keywords: ["resume analyzer", "resume feedback", "AI resume checker", "job application", "career tips"],
  authors: [{ name: "Jafarscript" }],
  openGraph: {
    title: "Resume Analyzer - Improve Your Resume with AI",
    description: "Upload your resume and receive personalized feedback powered by AI. Improve your chances of landing your dream job today!",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <LandingHero />
    </div>
  );
}
