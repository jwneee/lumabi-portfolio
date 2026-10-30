export default function About() {
  const skills = [
    "HTML & CSS", 
    "JavaScript (ES6+)", 
    "React", 
    "TypeScript", 
    "Tailwind CSS", 
    "Git & GitHub",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Motion Graphics"
  ];

  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">About Me</h1>
      
      <p className="mb-4 text-gray-700 leading-relaxed">
        I am a 3rd-year BSIT student at Gordon College. I have a strong passion for 
        web development and creating digital experiences. I enjoy turning complex 
        problems into simple, beautiful, and intuitive designs.
      </p>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Outside of coding, I love exploring motion graphics, video editing, and other 
        forms of digital artwork. My ultimate goal is to become a web developer specializing 
        in UI/UX, building applications that are not only functional but also visually engaging.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4 mt-8">My Skills</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-6 text-gray-700">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}