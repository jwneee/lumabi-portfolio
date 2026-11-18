import { useState, useRef, useEffect } from "react";
import PageLoader from "../components/PageLoader";
import ScrollVelocity from "../components/ScrollVelocity";
import GlareHover from "../components/GlareHover";
import Typewriter from "../components/Typewriter";

// --- DATA ---
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
    title: "Frontend",
    description: "Frameworks and libraries for building interactive user interfaces.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend",
    description: "Server-side technologies and frameworks.",
    technologies: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Design & Tools",
    description: "Design software, version control, and development tools.",
    technologies: ["Figma", "Photoshop", "Premiere Pro", "After Effects", "Git", "GitHub"],
  },
];

const experiences = [
  {
    company: "AWS Cloud Club — Gordon College",
    role: "Marketing Committee",
    date: "2025 - Present",
    description: "Assist in organizing events, creating promotional materials, and managing social media campaigns to increase student engagement in cloud computing.",
    skills: ["Marketing", "Design", "Communication"],
  },
  {
    company: "Daylite Photography",
    role: "Photography Assistant",
    date: "2019 - Present",
    description: "Assist in setting up lighting and camera equipment for photo shoots. Perform photo editing and retouching using Photoshop to ensure high-quality final images.",
    skills: ["Photoshop", "Photography", "Photo Editing"],
  },
];

const projects = [
  {
    title: "KomuniCare",
    description: "A web-based barangay health and wellness platform designed to streamline patient records and community health programs.",
    tags: ["React", "UI/UX", "Node.js"],
    image: "/works/komunicare.png",
    link: "https://komunicare-4ff27.web.app/",
  },
  {
    title: "Graphic Design & Posters",
    description: "A collection of minimalist typography posters and branding materials created for events and personal projects.",
    tags: ["Photoshop", "Illustrator", "Canva"],
    image: "/works/graphic-design.jpg",
    link: "",
  },
  {
    title: "Video Editing",
    description: "My journey with After Effects began in 2019, creating and sharing edits within the Instagram Editing Community.",
    tags: ["After Effects", "Premiere Pro", "CapCut"],
    image: "/works/video-editing.png",
    link: "",
  },
];

// --- ANIMATION HELPER ---
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

              {/* TYPEWRITER COMPONENT */}
              <Typewriter />

              <p className="max-w-md text-gray-500 mt-4 leading-relaxed text-lg">
                I enjoy turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800">
                  View Works ↗
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

      {/* TECH STACK SECTION */}
      <section id="techstack" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Skills & Tools</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">My Tech Stack</h3>
        </Reveal>

        <div className="flex flex-col gap-16">
          {techCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <Reveal className="md:w-1/3" delay={idx * 100}>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{category.title}</h4>
                <p className="text-gray-500 font-medium text-sm">{category.description}</p>
              </Reveal>
              <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {category.technologies.map((tech, techIdx) => (
                  <Reveal key={techIdx} delay={idx * 100 + techIdx * 50}>
                    <div className="group flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl transition-all duration-300 hover:-translate-y-2 h-full shadow-sm hover:shadow-md">
                      <div className="w-12 h-12 mb-4 flex items-center justify-center font-bold text-xl bg-white text-gray-800 rounded-xl shadow-sm border border-gray-100 group-hover:text-[#86c05a] transition-colors">
                        {tech.substring(0, 2)}
                      </div>
                      <span className="text-sm font-bold text-gray-900 text-center">{tech}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
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

      {/* PROJECTS SECTION */}
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <Reveal>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-16">Selected Works</h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}>
              <GlareHover className="group flex flex-col h-full bg-white border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 border-b border-gray-100">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105" />
                  
                  {/* Live Preview Link overlay */}
                  {project.link && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        View Live Site ↗
                      </a>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-0">
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-3 transition-colors duration-300">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#86c05a]">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlareHover>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCROLL VELOCITY DIVIDER */}
      <div className="py-10 bg-gray-50 overflow-hidden border-t border-gray-100">
        <ScrollVelocity 
          texts={["Hello I'm Cece", "Web Developer & Visual Creator"]} 
          velocity={50} 
          className="font-black tracking-tighter text-gray-200 opacity-80" 
        />
      </div>

    </div>
  );
}