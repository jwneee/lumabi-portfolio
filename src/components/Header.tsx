import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "techstack", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();
  
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isClickingRef.current) return;

      const sections = links.map((link) => link.id);
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    isClickingRef.current = true; 
    setActiveSection(id); 
    setIsOpen(false);
    navigate(`/#${id}`, { replace: true });

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 1000); 
  };

  return (
    <header 
      className={`fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none w-full transition-all duration-500 ease-in-out ${
        scrolled ? "top-2" : "top-6"
      }`}
    >
      <div 
        className={`w-full pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled ? "max-w-3xl" : "max-w-5xl"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between gap-2 sm:gap-4 rounded-full bg-white/90 backdrop-blur-md ring-1 ring-black/5 transition-all duration-500 ease-in-out ${
            scrolled 
              ? "py-1.5 pl-4 pr-1.5 shadow-lg bg-white/95" 
              : "py-2.5 pl-6 pr-2 shadow-sm"
          }`}
        >
          <button 
            onClick={() => handleScroll("home")} 
            className={`flex items-center gap-2 transition-all duration-500 hover:opacity-70 cursor-pointer ${
              scrolled ? "scale-90 origin-left" : "scale-100"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-black">
              Portfolio<span className="align-top text-[0.7em] text-[#86c05a]">*</span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 text-sm font-medium text-gray-500 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleScroll(l.id)}
                className={`relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  activeSection === l.id ? "text-white" : "hover:text-black"
                }`}
              >
                {activeSection === l.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-black rounded-full -z-10"
                    transition={{ 
                      type: "tween", 
                      ease: [0.25, 0.1, 0.25, 1],
                      duration: 0.45 
                    }}
                  />
                )}
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleScroll("contact")}
              className={`rounded-full font-bold transition-all duration-500 cursor-pointer tag-green hover:-translate-y-0.5 hover:shadow-md ${
                scrolled 
                  ? "px-4 py-1.5 text-xs" 
                  : "px-6 py-2.5 text-sm"
              }`}
            >
              Contact
            </button>

            <button
              className="md:hidden text-gray-600 hover:text-black transition-colors p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          } md:hidden transform absolute top-16 right-4 z-50 origin-top-right transition-all duration-300 ease-in-out mt-2`}
        >
          <div className="flex flex-col gap-4 bg-white/95 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-xl w-56">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleScroll(l.id)}
                className={`text-left text-sm font-medium transition-colors hover:text-[#86c05a] ${
                  location.hash === `#${l.id}` ? "text-black font-bold" : "text-gray-600"
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