import { useRef, useEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import ScrollVelocity from "../components/ScrollVelocity";
import Typewriter from "../components/Typewriter";

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
    tags: ["Programming", "Web Development", "Multimedia"],
  },
  {
    logo: "/logos/st-joseph-college.png",
    title: "Science, Technology, Engineering and Mathematics (STEM)",
    subtitle: "St. Joseph College Olongapo Inc. - Senior High School Department",
    date: "2021 - 2023",
    description: "Completed the STEM strand, building a strong foundation in science, mathematics, and technology that prepared me for a career in Information Technology.",
    tags: ["Science", "Mathematics"],
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
    tags: ["Photoshop", "Illustrator", "Canva"],
    image: "/works/graphic-design.jpg",
    link: "",
    dateCreated: "2023-2026",
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
      <div className="group/card flex h-full gap-5 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
        <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm p-1.5">
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
              <span key={i} className="text-xs font-bold bg-white text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
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

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full"
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
              <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{project.title}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Created</h4>
                  <p className="font-semibold text-gray-800">{project.dateCreated}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{project.description}</p>
              </div>

              {project.link && (
                <div className="mb-8">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#86c05a] hover:text-black transition-colors">
                    Visit Live Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )}

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Gallery</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group ${
                          idx === 0 ? "col-span-2 aspect-video" : "aspect-[3/4]" 
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
    <div className="w-full bg-white text-gray-900 font-sans overflow-x-hidden">
      <PageLoader />

      {/* HERO SECTION */}
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
              <img src={profile.photo} alt={profile.fullName} className="h-full w-auto object-contain object-bottom relative z-10 origin-bottom scale-[1.2] drop-shadow-[12px_12px_6px_rgba(0,0,0,0.3)]" />
              <span className="float-slow tag-green absolute top-[38%] left-0 rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20">Web Developer!</span>
              <span className="float-slow tag-green absolute top-[22%] right-[22%] rounded-full px-4 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:0.8s]">:)</span>
              <span className="float-slow tag-green absolute bottom-[18%] right-[2%] rounded-full px-5 py-2 text-sm font-semibold shadow-lg z-20 [animation-delay:1.5s]">Video Editing</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT SECTION */}
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
                I'm Maria Cecilia Zerrudo Lumabi, a second-year BSIT student, and I've been captivated by the power of images for as long as I can remember. What started as a love for doodling has grown into a dedicated pursuit of graphic design, video editing, and web development.
              </p>
              <h4 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-4 mt-8">My Approach</h4>
              <p className="text-gray-600 leading-relaxed">
                I see every project as an opportunity to solve a creative puzzle and learn something new. With my experience in digital art and coding, along with a passion for visual storytelling, I'm here to help bring unique visions to life.
              </p>
            </div>
          </Reveal>
          
          {/* Right Side Personal Details */}
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
                  <span className="font-bold text-gray-900">Olongapo City, Philippines</span>
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

      {/* TECH STACK SECTION */}
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
                      
                      {/* Logo Container */}
                      <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className={`w-full h-full object-contain ${
                            category.title === "Design & Editing" ? "scale-100" : "scale-100"
                          }`}
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
      <section id="experience" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Career Path</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">Education & Experience</h3>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Education Column */}
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

          {/* Experience Column */}
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
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">Works/Projects</h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <CustomProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* SCROLL VELOCITY */}
      <div className="py-10 bg-gray-50 overflow-hidden border-t border-gray-100">
        <ScrollVelocity texts={["Hello I'm Cece", "Web Developer & Visual Creator"]} velocity={50} className="font-black tracking-tighter text-gray-200 opacity-80" />
      </div>
    </div>
  );
}