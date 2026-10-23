import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 px-6 text-center">
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-md w-full space-y-4">
        <span className="text-4xl font-extrabold text-blue-600 block">404</span>
        <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
