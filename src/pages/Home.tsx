import { useRef, useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import ScrollVelocity from "../components/ScrollVelocity";
import Typewriter from "../components/Typewriter";
import MagicCursor from "../components/MagicCursor";

// --- DATA ---
const profile = {
  fullName: "Maria Cecilia Zerrudo Lumabi",
  photo: "/me.png",
};

const techCategories = [
  {
    title: "Development",
    technologies: [
      { name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", icon: "/tech-icons/css3.png" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    ],
  },
  {
    title: "Design & Editing",
    technologies: [
      { name: "Photoshop", icon: "/tech-icons/photoshop.png" },
      { name: "Premiere Pro", icon: "/tech-icons/premiere-pro.png" },
      { name: "After Effects", icon: "/tech-icons/after-effects.png" },
      { name: "Figma", icon: "/tech-icons/figma.png" },
      { name: "Canva", icon: "/tech-icons/canva.png" },
      { name: "CapCut", icon: "/tech-icons/capcut.png" },
      { name: "DaVinci", icon: "/tech-icons/davinci.png" },
    ],
  },
];

// --- EDUCATION & EXPERIENCE DATA ---
type TimelineEntry = {
  logo?: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
};

const education: TimelineEntry[] = [
  {
    logo: "/logos/gordon-college.png",
    title: "Bachelor of Science in Information Technology",
    subtitle: "Gordon College",
    date: "2024 - Present",
    description: "Studying Information Technology with a core emphasis on programming, web technologies, and system analysis. Equipping myself with the technical skills needed to build innovative digital solutions.",
    tags: ["Web Development", "UI/UX", "Multimedia"],
  },
  {
    logo: "/logos/st-joseph-college.png",
    title: "Science, Technology, Engineering and Mathematics (STEM)",
    subtitle: "St. Joseph College Olongapo Inc. - Senior High School Department",
    date: "2021 - 2023",
    description: "Completed the STEM strand, building a strong foundation in science, mathematics, and technology that prepared me for a career in Information Technology.",
    tags: ["STEM", "Science", "Mathematics"],
  },
];

const experiences: TimelineEntry[] = [
  {
    logo: "/logos/daylite.png",
    title: "Photography Assistant",
    subtitle: "Daylite Photography",
    date: "2019 - Present",
    description: "Assist in setting up lighting and camera equipment for photo shoots. Perform photo editing and retouching using Photoshop to ensure high-quality final images.",
    tags: ["Photoshop", "Photography", "Photo Editing"],
  },
  {
    logo: "/logos/aws-cloud-club.png",
    title: "Marketing Committee",
    subtitle: "AWS Cloud Club — Gordon College",
    date: "2025 - 2026",
    description: "Assist in organizing events, creating promotional materials, and managing social media campaigns to increase student engagement in cloud computing.",
    tags: ["Marketing", "Design", "Communication"],
  },
  {
    logo: "/logos/permanente.png",
    title: "Data Encoder (OJT)",
    subtitle: "The Permanente Health Plan - Multi-Specialty Health Plan",
    date: "Midyear 2026",
    description: "Encoded and organized patient and health plan data during my on-the-job training. Ensured accuracy and confidentiality of records while supporting the administrative team with data entry and verification tasks.",
    tags: ["Data Entry", "Microsoft Office", "Accuracy"],
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
      "/works/poster5.jpg"
    ],
  },
  {
    id: 3,
    title: "Video Editing",
    shortDescription: "My journey with After Effects began in 2019, creating and sharing edits within the Instagram Editing Community.",
    description: "My journey with After Effects began in 2019, creating and sharing edits within the Instagram Editing Community. I started by editing videos of the idols I stanned — and through that community, I learned, experimented, and grew.\n\nWhat started as a hobby became a space to apply and test my skills.",
    tags: ["After Effects"],
    image: "/works/video-editing.png",
    link: "https://www.instagram.com/frances.aep",
    dateCreated: "2018 - Present",
    gallery: [],
  },
];

// --- REVEAL COMPONENT ---
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

// --- TIMELINE CARD ---
function TimelineCard({ item, delay = 0 }: { item: TimelineEntry; delay?: number }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const initials = item.subtitle
    .split(/[\s—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Reveal delay={delay} className="h-full">
      <div className="group/card flex h-full gap-5 p-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#86c05a]/30">
        <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200/50 bg-white/80 overflow-hidden flex items-center justify-center shadow-sm p-1.5">
          {item.logo && !logoFailed ? (
            <img
              src={item.logo}
              alt={item.subtitle}
              onError={() => setLogoFailed(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-2xl font-black text-gray-700">{initials}</span>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold tracking-widest text-[#86c05a] uppercase mb-1">{item.date}</span>
          <h4 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{item.title}</h4>
          <h5 className="text-xs font-bold text-gray-500 tracking-wide uppercase mb-4">{item.subtitle}</h5>
          <p className="text-sm text-gray-600 font-medium leading-relaxed mb-5">{item.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.tags.map((tag, i) => (
              <span key={i} className="text-xs font-bold bg-white/80 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200/80 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// --- CUSTOM PROJECT CARD COMPONENT ---
function CustomProjectCard({ project }: { project: any }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group flex flex-col bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 h-full"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.shortDescription}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string, i: number) => (
              <span key={i} className="text-[10px] font-bold bg-white/80 text-gray-600 px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-bold bg-white/80 text-gray-600 px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
          
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white/90 backdrop-blur-2xl w-full max-w-6xl h-[95vh] sm:h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-white/60">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/40 sticky top-0 z-10">
              <h3 
                className="text-2xl md:text-3xl text-gray-900 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-200/50 hover:bg-gray-300/50 rounded-full transition-colors cursor-pointer">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-grow">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 max-w-4xl mx-auto">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Created</h4>
                  <p className="font-bold text-gray-800 text-lg">{project.dateCreated}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs font-bold bg-white/80 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-12 max-w-4xl mx-auto">
                <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Description</h4>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">{project.description}</p>
              </div>

              {project.link && (
                <div className="mb-12 max-w-4xl mx-auto">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold bg-[#5a9e5b] text-white px-6 py-3 rounded-full hover:bg-black transition-colors shadow-md">
                    Visit Live Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-8 border-t border-gray-200/50 pt-8 max-w-4xl mx-auto">
                  <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Gallery</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {project.gallery.map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`relative rounded-xl overflow-hidden shadow-sm group border border-gray-200/50 ${
                          idx === 0 ? "sm:col-span-2 aspect-video" : "aspect-[3/4]" 
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} - Image ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#f8fdfa] text-gray-900 font-sans overflow-x-hidden relative">
      
      {/* MESH GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#a8e6cf] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -top-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#fff9c4] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#dcedc1] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#c8e6c9] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      </div>

      <MagicCursor />
      <PageLoader />

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="mx-auto max-w-7xl px-6 pt-32 pb-0 min-h-[90vh] flex items-center relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <Reveal>
              <div className="flex flex-col gap-6">
                <p className="text-xs font-mono text-[#5a9e5b] uppercase tracking-[0.3em] font-bold">Portfolio</p>
                
                <h1 
                  className="text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Hello, I'm <br />
                  <span className="italic font-normal text-gray-700">Cece!</span>
                </h1>
                
                <div className="text-lg md:text-xl text-gray-600 font-serif italic max-w-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Typewriter />
                </div>
                
                <p className="max-w-md text-gray-700 leading-relaxed text-base font-medium mt-2">
                  I breathe life into ideas by weaving design, motion, and code into memorable digital experiences — transforming complex concepts into seamless, visually captivating stories that users love to explore.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 shadow-lg">
                    View Works
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white shadow-sm">
                    Work with Me!
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="relative flex justify-center items-end h-[420px] lg:h-[560px] mt-10 lg:mt-0">
              <div className="relative h-full inline-block">
                <img src={profile.photo} alt={profile.fullName} className="h-full w-auto object-contain object-bottom relative z-10 origin-bottom scale-[1.2] drop-shadow-[12px_12px_6px_rgba(0,0,0,0.15)]" />
                <span className="float-slow tag-green absolute top-[38%] left-0 rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20">Web Developer!</span>
                <span className="float-slow tag-green absolute top-[22%] right-[22%] rounded-full px-4 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:0.8s]">:)</span>
                <span className="float-slow tag-green absolute bottom-[18%] right-[2%] rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:1.5s]">Video Editing</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[#86c05a]/20">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#5a9e5b] uppercase mb-4">Discover</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
              About <span className="italic text-gray-700">Me</span>
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={100}>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 border-b border-[#86c05a]/20 pb-4">Who Am I</h4>
                <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                  I'm Maria Cecilia Zerrudo Lumabi, a second-year BSIT student, and I've been captivated by the power of images for as long as I can remember. What started as a love for doodling has grown into a dedicated pursuit of graphic design, video editing, and web development.
                </p>
                <h4 className="text-xl font-bold text-gray-900 mb-4 border-b border-[#86c05a]/20 pb-4 mt-8">My Approach</h4>
                <p className="text-gray-700 leading-relaxed font-medium">
                  I see every project as an opportunity to solve a creative puzzle and learn something new. With my experience in digital art and coding, along with a passion for visual storytelling, I'm here to help bring unique visions to life.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h4 className="text-lg font-bold text-gray-900 mb-6">Personal Details</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-[#86c05a]/20 pb-3">
                    <span className="text-gray-500 font-medium">Name</span>
                    <span className="font-bold text-gray-900">{profile.fullName}</span>
                  </li>
                  <li className="flex justify-between border-b border-[#86c05a]/20 pb-3">
                    <span className="text-gray-500 font-medium">Location</span>
                    <span className="font-bold text-gray-900">Olongapo City, Philippines</span>
                  </li>
                  <li className="flex justify-between border-b border-[#86c05a]/20 pb-3">
                    <span className="text-gray-500 font-medium">Education</span>
                    <span className="font-bold text-gray-900">Gordon College (BSIT)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 font-medium">Email</span>
                    <a href="mailto:ma.cecilialumabi@gmail.com" className="font-bold text-gray-900 hover:text-[#5a9e5b] transition-colors">ma.cecilialumabi@gmail.com</a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="techstack" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[#86c05a]/20">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#5a9e5b] uppercase mb-4">Skills & Tools</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Tech <span className="italic text-gray-700">Stack</span>
            </h3>
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
                      <div className="group flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#86c05a]/40 hover:bg-white/80">
                        <div className="w-20 h-20 flex items-center justify-center mb-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                          <img 
                            src={tech.icon} 
                            alt={tech.name} 
                            className={`w-full h-full object-contain p-1`}
                            loading="lazy"
                          />
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

        {/* EDUCATION & EXPERIENCE SECTION */}
        <section id="experience" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[#86c05a]/20">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#5a9e5b] uppercase mb-4">Career Path</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
              Education & <span className="italic text-gray-700">Experience</span>
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            <div className="flex flex-col gap-6">
              <Reveal>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Education</h4>
              </Reveal>
              <div className="grid grid-cols-1 gap-6">
                {education.map((item, index) => (
                  <TimelineCard key={index} item={item} delay={index * 100} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal delay={100}>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Experience</h4>
              </Reveal>
              <div className="grid grid-cols-1 gap-6">
                {experiences.map((item, index) => (
                  <TimelineCard key={index} item={item} delay={100 + index * 100} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[#86c05a]/20">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#5a9e5b] uppercase mb-4">Portfolio</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-gray-900 tracking-tight mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
              Works/<span className="italic text-gray-700">Projects</span>
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <CustomProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[#86c05a]/20 text-center">
          <Reveal>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-gray-800 tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's <span className="italic text-gray-600">Connect!</span>
            </h2>
            <p className="text-gray-600 font-medium mb-12">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a 
                href="mailto:ma.cecilialumabi@gmail.com" 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300/60 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:border-[#86c05a]/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#86c05a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="font-bold text-gray-800 text-sm">ma.cecilialumabi@gmail.com</span>
              </a>

              <a 
                href="https://github.com/jiwnee" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300/60 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:border-[#86c05a]/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#86c05a] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                <span className="font-bold text-gray-800 text-sm">github.com/jiwnee</span>
              </a>

              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300/60 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:border-[#86c05a]/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#86c05a] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="font-bold text-gray-800 text-sm">LinkedIn</span>
              </a>

              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-300/60 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:border-[#86c05a]/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#86c05a] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="font-bold text-gray-800 text-sm">@jiwn.ee</span>
              </a>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Click the email to copy it.
            </p>
          </Reveal>
        </section>

        {/* SCROLL VELOCITY */}
        <div className="py-10 bg-white/30 backdrop-blur-sm overflow-hidden border-t border-[#86c05a]/20">
          <ScrollVelocity texts={["Hello I'm Cece", "Web Developer & Visual Creator"]} velocity={50} className="font-black tracking-tighter text-[#86c05a]/40 opacity-80" />
        </div>

      </div>
    </div>
  );
}