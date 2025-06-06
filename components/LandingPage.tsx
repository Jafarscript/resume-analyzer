import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-20 lg:pt-0 justify-center min-h-screen px-6 text-center bg-white">
      <h1 className="text-4xl font-bold mb-6 text-black">
        Resume Analyzer Powered by AI
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        Upload your resume, paste a job description (optional), and get instant feedback to optimize your chances of landing your dream job.
      </p>
      <Link href="/resume">
        <button className="text-black border border-black cursor-pointer rounded-full px-8 py-3 shadow-md">
          Get Started
        </button>
      </Link>

      {/* Features Section */}
      <section className="mt-16 grid gap-8 md:grid-cols-3">
        <FeatureCard title="AI Analysis" description="Get smart insights into your resume." />
        <FeatureCard title="Job-Specific Feedback" description="Paste a job description for customized suggestions." />
        <FeatureCard title="Instant Results" description="Upload, scan, and get results in seconds." />
      </section>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-black p-6 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-semibold mb-2  text-black">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
