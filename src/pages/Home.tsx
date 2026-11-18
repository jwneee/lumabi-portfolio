import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLoader from "../components/PageLoader";
import ScrollVelocity from "../components/ScrollVelocity";
import Typewriter from "../components/Typewriter";

const profile = {
  fullName: "Maria Cecilia Zerrudo Lumabi",
  pronouns: "she/her",
  location: "Olongapo City, Philippines",
  photo: "/me.png",
  githubHref: "https://github.com/jwneee",
  linkedinHref: "https://linkedin.com/in/mariacecilialumabi",
  instagramHref: "https://instagram.com/jwn.ee",
  editsHref: "https://instagram.com/frances.aep",
};

const techCategories = [
  {
    title: "Development",
    technologies: [
      { name: "React.js", abbr: "Re", color: "bg-[#61DAFB]/20 text-[#20232A]" },
      { name: "TypeScript", abbr: "Ts", color: "bg-[#3178C6]/20 text-[#3178C6]" },
      { name: "Tailwind CSS", abbr: "Tw", color: "bg-[#06B6D4]/20 text-[#06B6D4]" },
      { name: "HTML5", abbr: "H5", color: "bg-[#E34F26]/20 text-[#E34F26]" },
      { name: "CSS3", abbr: "C3", color: "bg-[#1572B6]/20 text-[#1572B6]" },
      { name: "JavaScript", abbr: "Js", color: "bg-[#F7DF1E]/20 text-[#000000]" },
      { name: "Node.js", abbr: "No", color: "bg-[#339933]/20 text-[#339933]" },
    ],
  },
  {
    title: "Design & Editing",
    technologies: [
      { name: "Photoshop", abbr: "Ps", color: "bg-[#001e36] text-[#31a8ff]" },
      { name: "Premiere Pro", abbr: "Pr", color: "bg-[#00005b] text-[#9999ff]" },
      { name: "After Effects", abbr: "Ae", color: "bg-[#00005b] text-[#d291ff]" },
      { name: "Figma", abbr: "Fi", color: "bg-[#F24E1E]/20 text-[#F24E1E]" },
      { name: "Canva", abbr: "Ca", color: "bg-[#00C4CC]/20 text-[#00C4CC]" },
      { name: "CapCut", abbr: "Cc", color: "bg-black text-white" },
      { name: "DaVinci", abbr: "Dv", color: "bg-[#FF4A4A]/20 text-[#FF4A4A]" },
    ],
  },
];

const experiences = [
  {
    company: "Daylite Photography",
    role: "Photography Assistant",
    date: "2019 - Present",
    description: "Assist in setting up lighting and camera equipment for photo shoots. Perform photo editing and retouching using Photoshop to ensure high-quality final images.",
    skills: ["Photoshop", "Photography", "Photo Editing"],
  },
  {
    company: "AWS Cloud Club — Gordon College",
    role: "Marketing Committee",
    date: "2025 - 2026",
    description: "Assist in organizing events, creating promotional materials, and managing social media campaigns to increase student engagement in cloud computing.",
    skills: ["Marketing", "Design", "Communication"],
  },
];

const projects = [
  {
    id: 1,
    title: "KomuniCare",
    shortDescription: "A web-based barangay health and wellness platform designed to streamline patient records and community health programs.",
    description: "A web-based barangay health and wellness platform designed to streamline patient records and community health programs.",
    tags: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    image: "/works/komunicare.png",
    link: "https://komunicare-4ff27.web.app/",
    dateCreated: "2025",
    gallery: [],
  },
  {
    id: 2,
    title: "Graphic Design & Posters",
    shortDescription: "A collection of minimalist typography posters and branding materials created for events and personal projects.",
    description: "A collection of minimalist typography posters and branding materials created for events and personal projects.",
    tags: ["Photoshop", "Illustrator", "Canva", "Figma"],
    image: "/works/graphic-design.jpg",
    link: "",
    dateCreated: "2024",
    gallery: [
      "/works/poster1.jpg",
      "/works/poster2.jpg",
      "/works/poster3.jpg",
      "/works/poster4.jpg",
    ],
  },
  {
    id: 3,
    title: "Video Editing",
    shortDescription: "My journey with After Effects began in 2019, creating and sharing edits within the Instagram Editing Community.",
    description: "My journey with After Effects began in 2019, creating and sharing edits within the Instagram Editing Community. I started by editing videos of the idols I stanned — and through that community, I learned, experimented, and grew.\n\nWhat started as a hobby became a space to apply and test my skills. Every post was an opportunity to practice keyframing, motion graphics, 3D effects, transitions, and explore new plugins.",
    tags: ["After Effects"],
    image: "/works/video-editing.png",
    link: "https://www.instagram.com/frances.aep",
    dateCreated: "2018 - Present",
    gallery: [],
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const activeProject = projects.find((p) => p.id === selectedProject);

  return (
    <div className="w-full bg-white text-gray-900 font-sans overflow-x-hidden">
      <PageLoader />

      <section id="home" className="mx-auto max-w-7xl px-6 pt-32 pb-0 min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
          
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">Portfolio</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Hello, I'm <br />
                <span className="font-serif italic font-medium text-gray-800">Cece!</span>
              </h1>

              <Typewriter />

              <p className="max-w-md text-gray-500 mt-4 leading-relaxed text-lg">
                I enjoy turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800">
                  View Works
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-transparent border border-gray-300 px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-50">
                  Work with Me!
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="relative flex justify-center items-end h-[420px] lg:h-[560px] mt-10 lg:mt-0">
            <div className="relative h-full inline-block">
              <img
                src={profile.photo}
                alt={profile.fullName}
                className="h-full w-auto object-contain object-bottom relative z-10 origin-bottom scale-[1.2] drop-shadow-[12px_12px_6px_rgba(0,0,0,0.3)]"
              />
              <span className="float-slow tag-green absolute top-[38%] left-0 rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20">
                Web Developer!
              </span>
              <span className="float-slow tag-green absolute top-[22%] right-[22%] rounded-full px-4 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:0.8s]">
                :)
              </span>
              <span className="float-slow tag-green absolute bottom-[18%] right-[2%] rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:1.5s]">
                Video Editing
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Discover</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">About Me</h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal delay={100}>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-4">Who Am I</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                I'm a 3rd-year BSIT student at Gordon College, and I've been captivated by the power of images for as long as I can remember. What started as a love for doodling has grown into a dedicated pursuit of graphic design, video editing, and web development.
              </p>
              <h4 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-4 mt-8">My Approach</h4>
              <p className="text-gray-600 leading-relaxed">
                I see every project as an opportunity to solve a creative puzzle and learn something new. With experience in digital art and a passion for visual storytelling, I'm here to help bring unique visions to life — ideally as a web developer specializing in UI/UX.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-6">Personal Details</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-medium">Name</span>
                  <span className="font-bold text-gray-900">{profile.fullName}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="font-bold text-gray-900">{profile.location}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-medium">Education</span>
                  <span className="font-bold text-gray-900">Gordon College (BSIT)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 font-medium">Email</span>
                  <a href="mailto:ma.cecilialumabi@gmail.com" className="font-bold text-gray-900 hover:text-[#86c05a] transition-colors">ma.cecilialumabi@gmail.com</a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="techstack" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Skills & Tools</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">My Tech Stack</h3>
        </Reveal>

        <div className="flex flex-col gap-16">
          {techCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <Reveal delay={idx * 100}>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{category.title}</h4>
              </Reveal>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                {category.technologies.map((tech, techIdx) => (
                  <Reveal key={techIdx} delay={idx * 100 + techIdx * 50}>
                    <div className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-gray-300">
                      <div className={`w-16 h-16 flex items-center justify-center rounded-2xl text-2xl font-black mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${tech.color}`}>
                        {tech.abbr}
                      </div>
                      <span className="text-sm font-bold text-gray-700 text-center group-hover:text-black transition-colors">{tech.name}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Career Path</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">Work Experience</h3>
        </Reveal>

        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="group/item relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 -mx-6 md:-mx-8 rounded-2xl transition-all duration-500 hover:bg-gray-50 border border-transparent hover:border-gray-200">
                <div className="md:col-span-1 pt-1 md:pt-2">
                  <span className="text-xs font-bold tracking-widest text-[#86c05a] uppercase">{exp.date}</span>
                </div>
                <div className="md:col-span-3 flex flex-col">
                  <h4 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{exp.role}</h4>
                  <h5 className="text-sm font-bold text-gray-500 tracking-wide uppercase mb-6">{exp.company}</h5>
                  <p className="text-base text-gray-600 font-medium leading-relaxed mb-6">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-xs font-bold bg-white text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider group-hover/item:bg-gray-100 transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">Works/Projects</h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 border-b border-gray-100">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-3 group-hover:text-[#86c05a] transition-colors duration-300">{project.title}</h4>
                  {/* Dito natin ginamit ang shortDescription */}
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-grow line-clamp-3">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedProject(project.id)} 
                      className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 flex items-center gap-3 group/btn cursor-pointer"
                    >
                      View Details
                      <span className="w-8 h-[2px] bg-gray-900 group-hover/btn:w-12 group-hover/btn:bg-[#86c05a] transition-all duration-300"></span>
                    </button>

                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black hover:bg-gray-50 transition-all duration-300"
                        title="Visit Project"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="py-10 bg-gray-50 overflow-hidden border-t border-gray-100">
        <ScrollVelocity 
          texts={["Hello I'm Cece", "Web Developer & Visual Creator"]} 
          velocity={50} 
          className="font-black tracking-tighter text-gray-200 opacity-80" 
        />
      </div>

      <AnimatePresence>
        {selectedProject !== null && activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setSelectedProject(null)} 
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }} 
              className="bg-white border border-gray-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{activeProject.title}</h4>
                <button 
                  className="text-gray-500 hover:text-black transition-colors p-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer" 
                  onClick={() => setSelectedProject(null)}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-3">Created</span>
                    <span className="text-sm font-bold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200">{activeProject.dateCreated}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-3">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tech, i) => (
                        <span key={i} className="text-xs font-bold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-4">Description</span>
                  {/* Dito natin ginamit ang buong description */}
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {activeProject.description}
                  </p>
                </div>

                {activeProject.gallery && activeProject.gallery.length > 0 && (
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-4">Gallery</span>
                    <div className="grid grid-cols-2 gap-4">
                      {activeProject.gallery.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          alt={`${activeProject.title} - Image ${i + 1}`} 
                          className="w-full h-auto object-cover rounded-xl border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer" 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}