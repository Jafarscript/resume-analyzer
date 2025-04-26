import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Resume Analyzer Powered by AI
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        Upload your resume, paste a job description (optional), and get instant feedback to optimize your chances of landing your dream job.
      </p>
      <Link href="/resume">
        <button className="bg-primary text-black cursor-pointer rounded-full px-8 py-3 shadow-md hover:bg-primary-dark">
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
    <div className="border p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
