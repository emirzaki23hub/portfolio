import React from "react";
import userData from "@/constant/data";
import useReveal from "@/lib/useReveal";

export default function Experience({ isDay }) {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";

  const [headerRef, headerVisible] = useReveal();

  return (
    <section id="Experience" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className={`font-mono text-[11px] tracking-[0.3em] mb-2 ${muted}`}>
            SERVICE LOG
          </p>
          <h2 className={`font-display font-bold text-4xl md:text-5xl mb-16 ${text}`}>
            Experience
          </h2>
        </div>

        <div className={`relative max-w-2xl border-l-2 ${border} pl-8 md:pl-10 space-y-14`}>
          {userData.experience.map((exp, idx) => (
            <ExperienceRow key={exp.id} exp={exp} isDay={isDay} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ExperienceRow = ({ exp, isDay, index }) => {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";
  const surface = isDay ? "bg-white" : "bg-surface";

  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
      className={`relative transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
      }`}
    >
      <span
        className={`absolute -left-[calc(2rem+5px)] md:-left-[calc(2.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-redline ring-4 transition-transform duration-500 ${
          isDay ? "ring-day" : "ring-asphalt"
        } ${visible ? "scale-100" : "scale-0"}`}
      />
      <div className={`font-mono text-xs tracking-[0.2em] ${muted} mb-2`}>
        {exp.year}
      </div>
      <div className={`border ${border} ${surface} p-6 transition-colors hover:border-redline/50`}>
        <h3 className={`font-display font-bold text-2xl ${text}`}>{exp.title}</h3>
        <a
          href={exp.companyLink}
          target="_blank"
          rel="noreferrer"
          className={`font-mono text-xs tracking-wide ${muted} hover:text-redline transition-colors`}
        >
          {exp.company}
        </a>
        <p className={`mt-3 leading-relaxed ${isDay ? "text-asphalt/80" : "text-paper/80"}`}>
          {exp.desc}
        </p>
      </div>
    </div>
  );
};