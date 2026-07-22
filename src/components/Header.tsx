import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Briefcase, User, Layers, Mail } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home", icon: User },
    { id: "about", label: "About", icon: Layers },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-hairline py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (Artistic Flair "EZ." Minimalist styling) */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 group text-left cursor-pointer"
          id="nav-logo"
        >
          <div className="text-xl sm:text-2xl font-black tracking-tighter text-white border border-hairline/60 px-2.5 py-0.5 bg-white/5 group-hover:bg-accent group-hover:text-navy transition-all">
            EZ.
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-extrabold text-xs text-white leading-none tracking-widest uppercase">
              Emirzaki
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted block mt-0.5">
              Jakarta, ID — Web Artisan
            </span>
          </div>
        </button>

        {/* Desktop Navigation in Editorial Style */}
        <nav className="hidden md:flex items-center gap-1 bg-surface2/60 border border-hairline rounded-none px-1.5 py-1 backdrop-blur-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-none font-mono text-[10px] tracking-widest uppercase font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-muted hover:text-white"
                }`}
                id={`nav-item-${item.id}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-accent/10 border-b-2 border-accent -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={11} className={isActive ? "text-white" : "text-muted"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button styled precisely like the Artistic Flair design HTML button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2 bg-accent text-navy text-xs font-bold uppercase tracking-widest hover:bg-accent/80 transition-colors cursor-pointer"
            id="nav-btn-hire"
          >
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 border border-hairline flex items-center justify-center text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
          id="nav-toggle"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-navy border-b border-hairline backdrop-blur-lg overflow-hidden"
            id="mobile-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-none font-mono text-xs tracking-widest uppercase transition-colors text-left cursor-pointer ${
                      isActive
                        ? "bg-accent/10 text-white border-l-2 border-accent"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    }`}
                    id={`mobile-nav-item-${item.id}`}
                  >
                    <Icon size={14} className={isActive ? "text-white" : "text-muted"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 py-3 bg-accent text-navy text-xs font-bold uppercase tracking-widest hover:bg-accent/80 transition-colors cursor-pointer"
                id="mobile-nav-btn-hire"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
