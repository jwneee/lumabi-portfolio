import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
      
        <div className="text-sm font-bold tracking-widest text-gray-800">
          2026
        </div>

        <nav className="flex gap-8 text-sm font-medium text-gray-600">
          <Link to="/about" className="hover:text-black transition-colors">About Me</Link>
          <Link to="/projects" className="hover:text-black transition-colors">Works</Link>
          <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}