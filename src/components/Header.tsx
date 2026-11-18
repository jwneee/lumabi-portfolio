import { useState, useEffect } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "techstack", label: "Skills" },
  { id: "projects", label: "Works" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false); // Isara ang mobile menu pagkatapos mag-click
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    
    // Observe all sections based on your Home.tsx IDs
    ["home", "about", "experience", "techstack", "projects", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none w-full">
      <div className="w-full max-w-4xl pointer-events-auto">
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full bg-white/90 py-2 pl-6 pr-2 ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 ${
            scrolled ? "shadow-md" : "shadow-sm"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleScroll("home")}
            className="flex items-center gap-2 transition-opacity hover:opacity-70 cursor-pointer"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-black">
              Portfolio<span className="align-top text-[0.7em] text-[#86c05a]">*</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleScroll(l.id)}
                className={`transition-colors hover:text-black cursor-pointer ${
                  active === l.id ? "text-black font-semibold" : ""
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Contact Button - Permanent Green Sticker */}
          <button
            onClick={() => handleScroll("contact")}
            className="rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 cursor-pointer tag-green hover:-translate-y-0.5 hover:shadow-md"
          >
            Contact
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-black transition-colors pr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          } md:hidden transform absolute top-16 right-4 z-50 origin-top-right transition-all duration-300 ease-in-out mt-2`}
        >
          <div className="flex flex-col gap-4 bg-white/95 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-xl w-48">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleScroll(l.id)}
                className={`text-left text-sm font-medium transition-colors hover:text-[#86c05a] ${
                  active === l.id ? "text-black font-bold" : "text-gray-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}