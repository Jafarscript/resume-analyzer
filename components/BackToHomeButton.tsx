import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackToHomeButtonProps {
  text?: string;
}

const BackToHomeButton = ({ text = "Back to Home" }: BackToHomeButtonProps) => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-none transition-colors duration-150"
    >
      <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
      <span>{text}</span>
    </Link>
  );
};

export default BackToHomeButton;