import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectProps {
  project: {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    dateCreated: string;
    gallery?: string[];
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 border-b border-gray-100">
          <img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105" 
          />
        </div>
        
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-3 group-hover:text-[#86c05a] transition-colors duration-300">
            {project.title}
          </h4>
          
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-grow line-clamp-3">
            {project.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button 
              onClick={() => setIsModalOpen(true)} 
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

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)} 
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }} 
              className="bg-white border border-gray-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{project.title}</h4>
                <button 
                  className="text-gray-500 hover:text-black transition-colors p-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer" 
                  onClick={() => setIsModalOpen(false)}
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
                    <span className="text-sm font-bold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200">{project.dateCreated}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-3">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tech, i) => (
                        <span key={i} className="text-xs font-bold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-4">Description</span>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>

                {project.gallery && project.gallery.length > 0 && (
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase block mb-4">Gallery</span>
                    <div className="grid grid-cols-2 gap-4">
                      {project.gallery.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          alt={`${project.title} - Image ${i + 1}`} 
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
    </>
  );
}