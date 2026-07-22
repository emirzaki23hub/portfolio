import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X, Code2, Layers, Cpu, ArrowUpRight } from "lucide-react";
import { portfolioData, Project } from "../data";

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"All" | "Frontend" | "Fullstack" | "Creative">("All");

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter;
  });

  const categories: ("All" | "Frontend" | "Fullstack" | "Creative")[] = [
    "All",
    "Frontend",
    "Fullstack",
    "Creative",
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Layers size={11} />;
      case "Fullstack":
        return <Cpu size={11} />;
      default:
        return <Code2 size={11} />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-navy border-b border-hairline relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading in Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <span className="font-mono text-xs text-white/50 tracking-[0.4em] uppercase block">
              02 / SHOWCASE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Featured Projects
            </h2>
            <div className="h-[2px] w-12 bg-white mt-4 mx-auto md:mx-0" />
          </div>

          {/* Filtering tabs in sharp structural layout */}
          <div className="flex flex-wrap items-center justify-center gap-1 bg-surface/60 p-1 border border-hairline self-center md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 font-mono text-[9px] tracking-widest uppercase font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-accent text-navy font-bold"
                    : "text-white/60 hover:text-white"
                }`}
                id={`filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="project-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout={false}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col h-full bg-surface/30 border border-hairline hover:border-accent/30 hover:bg-surface/70 transition-all duration-300 cursor-pointer overflow-hidden relative"
                id={`project-card-${project.id}`}
              >
                {/* Project Image */}
                <div className="h-44 bg-neutral-900 relative flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Code2 className="w-12 h-12 text-white/5" />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-white/15 font-mono text-[8px] font-bold text-white/80 uppercase tracking-widest">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-white group-hover:underline transition-all line-clamp-1">
                        {project.title}
                      </h3>
                      <ArrowUpRight size={14} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] font-medium text-white/50 bg-black/40 border border-hairline/40 px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="font-mono text-[9px] font-medium text-white/30 bg-black/40 border border-hairline/40 px-2 py-0.5">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <Code2 size={40} className="text-white/10 mb-4" />
              <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-1">
                No projects found
              </p>
              <p className="font-sans text-sm text-muted">
                No projects match the selected filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Drawer detailing selected project in sharp editorial layout */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/90 backdrop-blur-md"
            id="project-modal"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-2xl bg-navy border border-hairline/60 overflow-hidden shadow-2xl flex flex-col rounded-none"
            >
              {/* Modal header with project image */}
              <div className="h-44 bg-neutral-900 relative overflow-hidden border-b border-hairline">
                {selectedProject.image ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end">
                  <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 border border-white/15 bg-black/50 flex items-center justify-center text-white/60 hover:text-white hover:bg-black transition-all cursor-pointer"
                  title="Close Dialog"
                  id="modal-close"
                >
                  <X size={14} />
                </button>
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/60 border border-hairline font-mono text-[8px] font-bold text-white/80 uppercase tracking-widest mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            </div>

              {/* Content body */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[50vh]">
                <div className="space-y-3">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-white/60 font-bold">
                    01 / Project Overview
                  </h4>
                  <p className="font-sans text-sm text-muted leading-relaxed text-justify">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-white/60 font-bold">
                    02 / Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] font-bold text-white bg-white/5 border border-hairline px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions inside sharp border blocks */}
              <div className="p-6 border-t border-hairline  flex items-center justify-end gap-3.5">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="px-4.5 py-2.5 border border-white/15 text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accent hover:text-navy transition-colors"
                    id="modal-btn-github"
                  >
                    <Github size={12} />
                    View Source
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-accent text-navy font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#D0D0D0] transition-colors"
                    id="modal-btn-live"
                  >
                    <ExternalLink size={12} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
