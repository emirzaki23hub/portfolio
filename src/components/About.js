import React from "react";
import userData from "@/constant/data";
import SpeedGauge from "@/components/SpeedGauge";

const About = ({ isDay, introReady = true }) => {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";

  return (
    <section id="About" className="relative py-20 md:py-28 overflow-hidden dash-grid">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className={`font-mono text-[11px] tracking-[0.3em] mb-6 reveal-up ${muted}`}>
            RIDER PROFILE
          </p>
          <h1
            className={`font-display font-bold text-5xl md:text-7xl leading-[0.95] reveal-up ${text}`}
            style={{ animationDelay: "80ms" }}
          >
            Muhammad
            <br />
            Emirzaki
          </h1>
          <h2
            className={`font-mono text-sm md:text-base tracking-[0.15em] uppercase mt-4 reveal-up ${muted}`}
            style={{ animationDelay: "180ms" }}
          >
            {userData.designation} · {userData.base}
          </h2>

          <p
            className={`mt-8 max-w-lg leading-relaxed reveal-up ${isDay ? "text-asphalt/80" : "text-paper/80"}`}
            style={{ animationDelay: "280ms" }}
          >
            {userData.about.description}
          </p>

          <dl
            className={`mt-10 grid grid-cols-2 gap-y-4 max-w-md border-t ${border} pt-6 reveal-up`}
            style={{ animationDelay: "380ms" }}
          >
            <dt className={`font-mono text-[10px] tracking-[0.2em] ${muted}`}>BASE</dt>
            <dd className={`font-mono text-sm ${text}`}>{userData.base}</dd>
            <dt className={`font-mono text-[10px] tracking-[0.2em] ${muted}`}>STACK</dt>
            <dd className={`font-mono text-sm ${text} col-span-1`}>
              {userData.stack.slice(0, 3).join(" / ")}
            </dd>
          </dl>

          <a
            href="/cv.pdf"
            download="cv"
            style={{ animationDelay: "480ms" }}
            className={`inline-flex items-center gap-3 mt-10 px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase border transition-colors reveal-up ${
              isDay
                ? "border-asphalt/20 text-asphalt hover:bg-asphalt hover:text-day"
                : "border-hairline text-paper hover:bg-paper hover:text-asphalt"
            }`}
          >
            Download CV
            <span className="text-redline">→</span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SpeedGauge
            isDay={isDay}
            start={introReady}
            value={userData.yearsExperience * 25}
            max={100}
            unit=""
            label={`${userData.yearsExperience}+ YRS EXPERIENCE`}
          />
          <div className="w-full max-w-xs aspect-square rounded-full overflow-hidden border-2 border-hairline">
            <img
              src="/me.png"
              alt="Muhammad Emirzaki"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;