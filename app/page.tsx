import Head from "next/head";
import LandingHero from "@/components/LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume Analyzer - Improve Your Resume with AI</title>
        <meta name="description" content="Upload your resume and receive personalized feedback powered by AI. Improve your chances of landing your dream job today!" />
        <meta name="keywords" content="resume analyzer, resume feedback, AI resume checker, job application, career tips" />
        <meta name="author" content="ResumeAnalyzer" />
        <meta property="og:title" content="Resume Analyzer - Improve Your Resume with AI" />
        <meta property="og:description" content="Upload your resume and receive personalized feedback powered by AI. Improve your chances of landing your dream job today!" />
        <meta property="og:type" content="website" />
      </Head>
      <LandingHero />
    </>
  );
}
