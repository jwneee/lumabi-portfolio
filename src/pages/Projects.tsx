const projects = [
  {
    id: 1,
    title: "KomuniCare",
    description: "A web-based barangay health and wellness platform designed to streamline patient records and community health programs.",
    image: "https://via.placeholder.com/300x180?text=Project+1",
  },
  {
    id: 2,
    title: "Graphic Design & Poster",
    description: "A collection of minimalist typography posters and branding materials created for events and personal projects.",
    image: "https://via.placeholder.com/300x180?text=Project+2",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "This portfolio — built with React, TypeScript, and Tailwind CSS.",
    image: "https://via.placeholder.com/300x180?text=Project+3",
  },
];

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <img 
              src={p.image} 
              alt={p.title} 
              className="w-full h-48 object-cover rounded-md mb-4 bg-gray-200" 
            />
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}