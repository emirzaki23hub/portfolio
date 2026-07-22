import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { portfolioData, Skill } from "../data";

export default function About() {
  const { detailedBio } = portfolioData.personalInfo;
  const { skills, experiences, education } = portfolioData;

  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  // Dynamic Lucide icon helper with simple styling
  const renderSkillIcon = (iconName?: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-3.5 h-3.5 text-white/60 group-hover:text-black transition-colors" />;
    }
    return <Icons.Code2 className="w-3.5 h-3.5 text-white/60 group-hover:text-black transition-colors" />;
  };

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category))) as Skill["category"][];

  return (
    <section id="about" className="py-24 bg-navy border-b border-hairline relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading matching editorial aesthetic */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <span className="font-mono text-xs text-white/50 tracking-[0.4em] uppercase block">
            01 / BIOGRAPHY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            About Me & Skillset
          </h2>
          <div className="h-[2px] w-12 bg-white mt-4 mx-auto md:mx-0" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Bio Column */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-display text-2xl font-light text-white leading-tight">
              Transforming complex requirements into <span className="italic font-serif text-white font-semibold">high-fidelity</span> interactive code.
            </h3>
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed text-justify">
              {detailedBio}
            </p>
            
            {/* Minimal quote frame */}
            <div className="border-l-2 border-white px-6 py-3 bg-white/5 space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 block font-bold">
                Design Creed
              </span>
              <p className="font-serif text-slate-300 text-sm leading-relaxed italic">
                &ldquo;True digital craft lies in the details—the visual breathing room, the typography rhythms, and the micro-interactions that make code feel like an organic experience.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Skills & Timeline Column */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Skills grid in clean high contrast layout */}
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] uppercase text-white/60 tracking-[0.25em] font-bold">
                01.1 / TECHNICAL MATRIX
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="p-6 bg-surface/40 border border-hairline space-y-4"
                  >
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white font-bold block border-b border-hairline pb-2">
                      {cat}
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {skills
                        .filter((s) => s.category === cat)
                        .map((skill) => (
                          <div
                            key={skill.name}
                            className="group flex items-center gap-2 px-3 py-1.5 border border-hairline bg-navy text-muted hover:bg-accent hover:text-navy hover:border-accent transition-all duration-200 cursor-default"
                            title={`Proficiency: ${skill.level}/5`}
                          >
                            {renderSkillIcon(skill.iconName)}
                            <span className="font-mono text-[10px] tracking-wide font-medium">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Timeline Tabs styled elegantly */}
            <div className="space-y-6">
              <div className="flex border-b border-hairline">
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-5 py-3 font-mono text-[11px] tracking-widest uppercase font-bold border-b-2 transition-all cursor-pointer relative ${
                    activeTab === "experience"
                      ? "border-white text-white"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                  id="tab-experience"
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-5 py-3 font-mono text-[11px] tracking-widest uppercase font-bold border-b-2 transition-all cursor-pointer relative ${
                    activeTab === "education"
                      ? "border-white text-white"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                  id="tab-education"
                >
                  Education
                </button>
              </div>

              {/* Tab Panels with timeline aesthetics */}
              <div className="min-h-[250px] relative">
                <AnimatePresence mode="wait">
                  {activeTab === "experience" ? (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-8"
                      id="panel-experience"
                    >
                      {experiences.map((exp, i) => (
                        <div key={`${exp.company}-${i}`} className="relative pl-6 border-l border-hairline group">
                          {/* Indicator hollow circle */}
                          <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-navy border border-white/30 group-hover:border-accent transition-all duration-300" />
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h5 className="font-display text-base font-bold text-white group-hover:translate-x-0.5 transition-transform duration-200">
                                {exp.role} @ {exp.company}
                              </h5>
                              <span className="font-mono text-[10px] tracking-wider text-white/50 bg-surface px-2.5 py-1 border border-hairline">
                                {exp.period}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider block">
                              {exp.location}
                            </span>
                            <ul className="list-none space-y-2 pt-1">
                              {exp.description.map((desc, idx) => (
                                <li key={idx} className="font-sans text-xs sm:text-sm text-muted flex items-start gap-2 leading-relaxed">
                                  <span className="text-white/60 mt-1.5 shrink-0 block w-1 h-1 bg-white" />
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-8"
                      id="panel-education"
                    >
                      {education.map((edu, i) => (
                        <div key={`${edu.institution}-${i}`} className="relative pl-6 border-l border-hairline group">
                          {/* Indicator hollow circle */}
                          <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-navy border border-white/30 group-hover:border-accent transition-all duration-300" />
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h5 className="font-display text-base font-bold text-white group-hover:translate-x-0.5 transition-transform duration-200">
                                {edu.degree}
                              </h5>
                              <span className="font-mono text-[10px] tracking-wider text-white/50 bg-surface px-2.5 py-1 border border-hairline">
                                {edu.period}
                              </span>
                            </div>
                            <div className="font-mono text-[10px] text-white/60 uppercase tracking-wider block">
                              {edu.institution}, {edu.location}
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed pt-1">
                              {edu.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
