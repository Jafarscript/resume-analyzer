import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full shadow hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
  );
}
