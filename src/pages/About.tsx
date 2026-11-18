import { Link } from "react-router-dom"; 

const profile = {
  firstName: "Cece", 
  fullName: "Maria Cecilia Zerrudo Lumabi",
  pronouns: "she/her",
  location: "Olongapo City, Philippines",
  photo: "/profile.jpg", 
  link: "linkedin.com/in/mariacecilialumabi",
  linkHref: "https://linkedin.com/in/mariacecilialumabi",
  tagTop: "3rd Year BSIT",
  tagSide: "Web Developer!",
  cardNote: "Thanks for stopping by and viewing my portfolio!",
};

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
];

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
      
      <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center">
        
        <div className="relative">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gray-900">
            I'm <br />
            <span className="font-serif italic font-medium text-gray-800">{profile.firstName}!</span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-md">
            I am a 3rd-year BSIT student at Gordon College. I have a strong passion for web
            development and creating digital experiences. I enjoy turning complex problems into
            simple, beautiful, and intuitive designs.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={profile.linkHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-200"
            >
              <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              {profile.link}
            </a>

            <Link to="/contact" className="text-sm font-bold text-black underline underline-offset-4 decoration-2 hover:text-gray-600 transition-colors">
              Work with Me! ↗
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:ml-auto mt-12 md:mt-0">
          
          {/* UPDATED STICKERS */}
          <span className="float-slow tag-green absolute -top-4 -right-4 z-10 rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
            {profile.tagTop}
          </span>
          <span className="float-slow tag-green absolute top-24 -left-6 md:-left-12 z-10 rounded-full px-5 py-2 text-sm font-semibold shadow-sm [animation-delay:1.5s]">
            {profile.tagSide}
          </span>

          <div className="relative rounded-3xl bg-[#b4c3e6] p-5 shadow-sm">
            <img src={profile.photo} alt={`Portrait of ${profile.fullName}`} className="w-full aspect-[4/3] object-cover rounded-2xl bg-[#a1b4d9]" />

            <div className="pt-5 pb-2 px-2">
              <p className="text-lg font-bold text-gray-900">
                {profile.fullName}
                <span className="ml-2 text-xs font-medium text-gray-600">· {profile.pronouns}</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {profile.location}
              </p>
              <p className="mt-3 flex items-start gap-2 text-xs text-gray-600">
                <svg className="h-4 w-4 mt-px shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.8A8 8 0 1121 12z" />
                </svg>
                {profile.cardNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 grid md:grid-cols-2 gap-16 border-t border-gray-200 pt-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Beyond Code</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md">
            Outside of coding, I love exploring motion graphics, video editing, and other forms of
            digital artwork. My ultimate goal is to become a web developer specializing in UI/UX,
            building applications that are not only functional but also visually engaging.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">My Skills</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-600 font-medium">
            {skills.map((skill) => (
              <li key={skill} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a4d065]"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}