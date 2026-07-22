import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Sparkles, MessageSquare, ArrowDown } from "lucide-react";
import { portfolioData } from "../data";

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const { name, title, subtitle, location, github, linkedin, email, whatsapp } = portfolioData.personalInfo;
  const spotlightProject = portfolioData.projects[0]; // Spotlight the first project

  // Real-time Jakarta clock
  const [jakartaTime, setJakartaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      setJakartaTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    setActiveSection("about");
    const element = document.getElementById("about");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToProjects = () => {
    setActiveSection("projects");
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen border-b border-white/10 flex flex-col justify-between pt-24 pb-8 overflow-hidden"
    >
      {/* High-tech ambient grid/globe background (De-noised, subtle, blended, and textured) */}
      <div className="absolute right-[-8%] top-[12%] w-[580px] h-[580px] pointer-events-none select-none opacity-[0.06] mix-blend-screen blur-[0.5px] z-0 hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#00F0FF]">
          {/* Cybernetic Wireframe Globe */}
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.2" />
          
          {/* Meridians / Lines */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.15" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.15" />
          <path d="M14.6 25 C 25 35, 75 35, 85.4 25" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" />
          <path d="M14.6 75 C 25 65, 75 65, 85.4 75" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" />
          
          {/* Rotating matrix coordinate points */}
          <circle cx="50" cy="10" r="0.6" fill="currentColor" />
          <circle cx="90" cy="50" r="0.6" fill="currentColor" />
          <circle cx="10" cy="50" r="0.6" fill="currentColor" />
          <circle cx="50" cy="90" r="0.6" fill="currentColor" />
          <circle cx="21.7" cy="21.7" r="0.4" fill="currentColor" />
          <circle cx="78.3" cy="21.7" r="0.4" fill="currentColor" />
          <circle cx="21.7" cy="78.3" r="0.4" fill="currentColor" />
          <circle cx="78.3" cy="78.3" r="0.4" fill="currentColor" />
          
          {/* Tech HUD circles */}
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.08" strokeDasharray="5 15" />
          <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.05" />
        </svg>
      </div>

      {/* Decorative vertical running text banner */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 rotate-90 hidden xl:block select-none pointer-events-none z-0">
        <span className="font-mono text-[9px] tracking-[1.2em] uppercase opacity-20 text-white">
          PORTFOLIO / REVAMP / V.04
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch mt-4 sm:mt-8">
        
        {/* Left Side: Massive Editorial Core Title (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between relative py-6"
        >
          {/* Subtle grey MIND watermark behind text (Heavily de-noised to sit deep in background) */}
          <div className="absolute -top-8 -left-4 sm:-top-16 text-[#141417] font-black text-[100px] sm:text-[180px] leading-none select-none z-0 tracking-tighter">
            CODE
          </div>

          <div className="relative z-10 space-y-8 my-auto">
            <div className="space-y-2">
              {/* Professional name kicker overline in accent color */}
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-[#00F0FF] block font-bold mb-1">
                MUHAMMAD EMIRZAKI
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/60 block">
                00 / INTRODUCTION
              </span>
              <h1 className="text-[52px] sm:text-[72px] md:text-[88px] font-extrabold leading-[0.9] tracking-tighter text-white">
                EMIR<br/>
                <span className="text-transparent text-stroke-white text-stroke-width-1 select-none">
                  ZAKI
                </span>
              </h1>
            </div>

            <div className="max-w-md">
              <div className="h-[2px] w-16 bg-[#00F0FF] mb-6" />
              <p className="text-xl sm:text-[22px] font-light text-white leading-relaxed tracking-wide">
                Frontend Engineer & Software Developer building{" "}
                <span className="italic font-serif font-bold text-[#00F0FF]">high-performance</span>{" "}
                web applications, robust systems, and clean code solutions that scale.
              </p>
            </div>

            {/* Quick Actions for Hero left block */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`${whatsapp}?text=${encodeURIComponent("Halo Emir, saya melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek / peluang kerja sama.")}`}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#00F0FF] text-black font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center gap-2.5 cursor-pointer rounded-none"
                id="hero-btn-whatsapp"
              >
                <MessageSquare size={13} className="stroke-[2.5px]" />
                WhatsApp Me
              </a>
              <button
                onClick={scrollToAbout}
                className="px-6 py-3.5 border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-colors flex items-center gap-2.5 cursor-pointer rounded-none"
                id="hero-btn-explore"
              >
                About Me
                <ArrowDown size={12} className="text-white/60" />
              </button>
            </div>
          </div>

          {/* Context bottom row: Jakarta location & availability states */}
          <div className="border-t border-white/10 pt-6 mt-12 grid grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/60 mb-1">
                Currently Based
              </span>
              <span className="text-[#D0D0D0] font-sans flex items-center gap-1.5">
                <MapPin size={12} className="text-white/60" />
                Jakarta, ID — {jakartaTime || "07:30 PM"} GMT+7
              </span>
            </div>
            <div className="flex flex-col text-right sm:text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/60 mb-1">
                Availability
              </span>
              <span className="text-[#00FF66] font-mono tracking-wide flex items-center justify-end sm:justify-start gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                AVAILABLE FOR ROLES 2026
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Split Info Card Deck (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between mt-8 lg:mt-0"
        >
          
          {/* Top Panel: Selected Spotlight Project Work */}
          <div 
            onClick={scrollToProjects}
            className="p-8 border-b border-hairline flex flex-col justify-end flex-1 group hover:brightness-110 transition-all cursor-pointer relative min-h-[280px] bg-neutral-900 overflow-hidden"
          >
            {/* Project Background Image */}
            {spotlightProject?.image && (
              <Image
                src={spotlightProject.image}
                alt={spotlightProject.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            )}
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            
            <span className="relative z-10 text-white/50 text-[10px] font-mono uppercase tracking-[0.4em] mb-4 block">
              01 / SELECTED WORK
            </span>
            <p className="relative z-10 text-3xl font-light text-white tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
              {spotlightProject?.title || "Lumina.OS"}
            </p>
            <p className="relative z-10 text-xs sm:text-sm text-white/70 leading-relaxed italic font-serif mb-6">
              {spotlightProject?.description || "A dynamic analytics platform concept engineered with high visual standards."}
            </p>
            <div className="relative z-10 w-9 h-9 border border-white/30 rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-navy transition-all">
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </div>
          </div>

          {/* Bottom Panel: Quick Tech Matrix & Social anchors */}
          <div className="p-8 flex flex-col justify-between bg-black/20">
            <div className="space-y-4 mb-8">
              <span className="text-white/50 text-[10px] font-mono uppercase tracking-[0.4em] block">
                02 / CORE TOOLKIT
              </span>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex justify-between border-b border-white/5 pb-1.5 text-[#D0D0D0]">
                  <span className="text-white/60">Framework</span>
                  <span className="text-white">React / TypeScript</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5 text-[#D0D0D0]">
                  <span className="text-white/60">Styling</span>
                  <span className="text-white">Tailwind / Motion</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1.5 text-[#D0D0D0]">
                  <span className="text-white/60">Interactivity</span>
                  <span className="text-white">Framer Motion / GSAP</span>
                </li>
              </ul>
            </div>

            {/* Solid Minimal Black/White Social Blocks */}
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={github}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="py-2.5 bg-white/5 border border-white/15 text-white hover:bg-white hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-1.5"
                id="hero-github-link"
              >
                <Github size={11} />
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="py-2.5 bg-white/5 border border-white/15 text-white hover:bg-white hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-1.5"
                id="hero-linkedin-link"
              >
                <Linkedin size={11} />
                LinkedIn
              </a>
              <a
                href={`mailto:${email}`}
                className="py-2.5 bg-white/5 border border-white/15 text-white hover:bg-white hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-1.5"
                id="hero-mail-link"
              >
                <Mail size={11} />
                Email
              </a>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Awwwards-style Horizontal Infinite Text Marquee */}
      <div className="w-full bg-[#161616]/30 border-y border-white/5 py-4 overflow-hidden select-none pointer-events-none mt-12 relative z-10">
        <div className="flex whitespace-nowrap min-w-full">
          <motion.div
            animate={{ x: [0, "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
            className="flex items-center gap-12 text-white/50 font-mono text-[9px] tracking-[0.3em] uppercase shrink-0 pr-12"
          >
            <span>SOFTWARE ENGINEER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>FRONTEND ENGINEER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>FULLSTACK DEVELOPER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>CLEAN CODE & SCALABLE ARCHITECTURE</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ x: [0, "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
            className="flex items-center gap-12 text-white/50 font-mono text-[9px] tracking-[0.3em] uppercase shrink-0 pr-12"
          >
            <span>SOFTWARE ENGINEER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>FRONTEND ENGINEER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>FULLSTACK DEVELOPER</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            <span>CLEAN CODE & SCALABLE ARCHITECTURE</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Elegant horizontal divider with fade */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </section>
  );
}
