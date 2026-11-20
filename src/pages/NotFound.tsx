import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-9xl font-black text-gray-200 tracking-tighter">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
}