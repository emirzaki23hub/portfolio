import React from "react";
import userData from "@/constant/data";
import useReveal from "@/lib/useReveal";

const Projects = ({ isDay }) => {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";

  const [headerRef, headerVisible] = useReveal();

  return (
    <section id="Projects" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`flex items-end justify-between border-b ${border} pb-6 mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className={`font-mono text-[11px] tracking-[0.3em] mb-2 ${muted}`}>
              BUILD LOG
            </p>
            <h2 className={`font-display font-bold text-4xl md:text-5xl ${text}`}>
              Garage
            </h2>
          </div>
          <span className={`font-mono text-xs ${muted} hidden md:block`}>
            {String(userData.projects.length).padStart(2, "0")} ENTRIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userData.projects.map((proj, idx) => (
            <ProjectCard key={proj.title} {...proj} isDay={isDay} plate={idx + 1} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, link, imgUrl, spec, isDay, plate, index }) => {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";
  const surface = isDay ? "bg-white" : "bg-surface";

  const [ref, visible] = useReveal();

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
      className={`group block border ${border} ${surface} overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_0_0_1px] ${
        isDay ? "hover:shadow-asphalt/10" : "hover:shadow-hairline"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-redline/0 group-hover:bg-redline/10 transition-colors duration-300" />
        <span className="absolute top-3 left-3 bg-redline text-day font-mono text-[10px] font-medium px-2 py-1 rounded-sm tracking-wider">
          №{String(plate).padStart(2, "0")}
        </span>
      </div>
      <div className="p-5">
        <h3 className={`font-display font-bold text-xl ${text}`}>{title}</h3>
        <p className={`font-mono text-[11px] tracking-wide mt-1 ${muted}`}>{spec}</p>
        <span className={`inline-flex items-center gap-2 mt-4 font-mono text-[11px] tracking-[0.15em] uppercase ${text}`}>
          View build
          <span className="text-lime group-hover:translate-x-1 transition-transform inline-block">→</span>
        </span>
      </div>
    </a>
  );
};

export default Projects;