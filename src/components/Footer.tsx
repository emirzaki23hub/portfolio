import React from "react";
import { portfolioData } from "../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { name } = portfolioData.personalInfo;

  return (
    <footer className="py-12 bg-navy border-t border-hairline text-center relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 font-mono text-[10px] uppercase tracking-widest">
        <p className="text-white/50 tracking-wider">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
        <p className="tracking-[0.2em] text-white/50">
          Designed &amp; Developed by Muhammad Emirzaki
        </p>
      </div>
    </footer>
  );
}
