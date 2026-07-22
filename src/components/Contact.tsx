import React, { useState } from "react";
import { Github, Linkedin, Copy, Check, MessageSquare, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data";

export default function Contact() {
  const { email, whatsapp, github, linkedin } = portfolioData.personalInfo;

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    "Halo Emir, saya melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek / peluang kerja sama."
  );
  const whatsappUrl = `${whatsapp}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 bg-navy border-b border-hairline relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading matching editorial aesthetic */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs text-white/50 tracking-[0.4em] uppercase block">
            03 / CONNECTION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Get In Touch
          </h2>
          <div className="h-[2px] w-12 bg-white mt-4 mx-auto" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Information card (left) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-surface/40 border border-hairline space-y-8 rounded-none">
            <div className="space-y-4">
              <h3 className="font-display text-xl font-light text-white leading-tight">
                Let&apos;s build something <span className="italic font-serif text-white font-semibold">exceptional</span> together.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed text-justify">
                I am always open to discussing frontend engineering roles, innovative web animations consultancy, full-stack app setups, or open-source collaborations. Feel free to drop a message or reach out on my socials!
              </p>
            </div>

            {/* Email copying action */}
            <div className="space-y-3">
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 block font-bold">
                Direct Email
              </span>
              <div className="flex items-center justify-between p-3 bg-black/40 border border-hairline rounded-none">
                <span className="font-mono text-xs text-white mr-2 select-all overflow-hidden text-ellipsis whitespace-nowrap">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-accent text-navy hover:bg-accent/80 transition-colors flex-shrink-0 cursor-pointer rounded-none border-none"
                  title="Copy Email to Clipboard"
                  id="email-copy-btn"
                >
                  {copied ? <Check size={12} className="text-black font-bold" /> : <Copy size={12} />}
                </button>
              </div>
            </div>

            {/* Social channels in monochrome grids */}
            <div className="space-y-3">
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 block font-bold">
                Social Networks
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-hairline bg-black/40 hover:bg-accent hover:text-navy hover:border-accent transition-all text-white rounded-none"
                  id="contact-github"
                >
                  <Github size={13} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold">GitHub</span>
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-hairline bg-black/40 hover:bg-accent hover:text-navy hover:border-accent transition-all text-white rounded-none"
                  id="contact-linkedin"
                >
                  <Linkedin size={13} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Access (right) */}
          <div className="lg:col-span-7 p-8 bg-surface/40 border border-hairline relative flex flex-col justify-center rounded-none min-h-[320px]">
            <div className="space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 block font-bold">
                03.1 / INSTANT CHANNELS
              </span>
              <h3 className="font-display text-2xl font-light text-white leading-tight">
                Preferred method: <span className="italic font-serif text-white font-semibold">Direct Message</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                For rapid response, project briefing, or immediate availability queries, click below to initiate a chat with me directly on WhatsApp.
              </p>
              
              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-accent text-navy font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-accent/80 active:scale-[0.99] transition-all cursor-pointer rounded-none"
                  id="whatsapp-contact-btn"
                >
                  <MessageSquare size={13} />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-muted uppercase tracking-wider">
                  Typically active: 09:00 - 21:00 (GMT+7)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
