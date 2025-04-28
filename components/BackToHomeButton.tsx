// components/BackToHomeButton.jsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackToHomeButton = ({ text = 'Back to Home' }) => {
  return (
    <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none self-start transition-colors duration-200">
      <ArrowLeft className="w-4 h-4 mr-2" />
      {text}
    </Link>
  );
};

export default BackToHomeButton;