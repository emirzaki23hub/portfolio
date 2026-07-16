import React, { useEffect, useState } from "react";

const links = [
  { href: "#About", id: "About", label: "Profile" },
  { href: "#Projects", id: "Projects", label: "Garage" },
  { href: "#Experience", id: "Experience", label: "Service Log" },
  { href: "#Repository", id: "Repository", label: "Telemetry" },
];

const Navbar = ({ isDay, onToggleMode }) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(links[0].id);

  const bg = isDay ? "bg-day/90" : "bg-asphalt/90";
  const text = isDay ? "text-asphalt" : "text-paper";
  const border = isDay ? "border-asphalt/10" : "border-hairline";
  const muted = isDay ? "text-asphalt/60" : "text-muted";

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur border-b ${bg} ${border} font-mono`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className={`flex items-center gap-2 text-xs tracking-[0.3em] ${text}`}>
          <span className="w-2 h-2 rounded-full bg-redline" />
          M.EMIRZAKI
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-[11px] tracking-[0.2em] uppercase transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-redline after:transition-all after:duration-300 ${
                  isActive
                    ? `${text} after:w-full`
                    : `${muted} hover:${isDay ? "text-asphalt" : "text-paper"} after:w-0 hover:after:w-full`
                }`}
              >
                <span className={isActive ? "text-lime mr-1" : "text-redline mr-1"}>·</span>
                {link.label}
              </a>
            );
          })}
          <HeadlightToggle isDay={isDay} onToggle={onToggleMode} />
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <HeadlightToggle isDay={isDay} onToggle={onToggleMode} compact />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`p-2 border rounded ${border} ${text}`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              {open ? (
                <path d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className={`lg:hidden border-t ${border} px-6 py-4 flex flex-col gap-4`}>
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-xs tracking-[0.2em] uppercase ${isActive ? text : muted}`}
              >
                <span className={isActive ? "text-lime mr-2" : "text-redline mr-2"}>·</span>
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

const HeadlightToggle = ({ isDay, onToggle, compact }) => (
  <button
    onClick={onToggle}
    aria-label="Toggle day/night mode"
    title={isDay ? "Switch to night mode" : "Switch to day mode"}
    className={`relative flex items-center ${compact ? "w-11 h-6" : "w-12 h-6"} rounded-full border transition-colors ${
      isDay ? "border-asphalt/20 bg-asphalt/5" : "border-hairline bg-surface"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform flex items-center justify-center text-[8px] ${
        isDay ? "translate-x-0 bg-redline" : "translate-x-5 bg-lime"
      }`}
    >
      {isDay ? "LO" : "HI"}
    </span>
  </button>
);

export default Navbar;