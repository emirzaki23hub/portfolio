import React, { useState } from "react";
import userData from "@/constant/data";
import useReveal from "@/lib/useReveal";

export default function LatestCode({ repositories, isDay }) {
  const [repos] = useState(repositories);
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";
  const border = isDay ? "border-asphalt/10" : "border-hairline";
  const surface = isDay ? "bg-white" : "bg-surface";

  const [headerRef, headerVisible] = useReveal();
  const [feedRef, feedVisible] = useReveal();

  return (
    <section id="Repository" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b ${border} pb-6 mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className={`font-mono text-[11px] tracking-[0.3em] mb-2 ${muted}`}>
              TELEMETRY FEED
            </p>
            <h2 className={`font-display font-bold text-4xl md:text-5xl ${text}`}>
              Latest Repositories
            </h2>
          </div>
          <a
            href={`https://github.com/${userData.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className={`font-mono text-xs tracking-[0.15em] uppercase inline-flex items-center gap-2 ${text} hover:text-redline transition-colors`}
          >
            View full log
            <span className="text-lime">→</span>
          </a>
        </div>

        <div
          ref={feedRef}
          className={`border ${border} ${surface} font-mono text-sm overflow-hidden transition-all duration-700 ${
            feedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${border}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-redline" />
            <span className="w-2.5 h-2.5 rounded-full bg-lime/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted/50" />
            <span className={`ml-3 text-[11px] tracking-wide ${muted}`}>
              git log --latest
            </span>
          </div>
          <div>
            {repos &&
              repos.map((repo, idx) => (
                <RepoRow key={repo.name} repo={repo} idx={idx} isDay={isDay} border={border} feedVisible={feedVisible} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const RepoRow = ({ repo, idx, isDay, border, feedVisible }) => {
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/60" : "text-muted";

  return (
    <a
      href={repo.clone_url}
      target="_blank"
      rel="noreferrer"
      style={{ transitionDelay: feedVisible ? `${200 + idx * 70}ms` : "0ms" }}
      className={`flex flex-col md:flex-row md:items-center gap-1 md:gap-4 px-4 py-4 border-b ${border} last:border-b-0 transition-all duration-500 hover:${
        isDay ? "bg-day/50" : "bg-surface2"
      } ${feedVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <span className="text-lime shrink-0">$</span>
      <span className={`font-medium shrink-0 ${text}`}>{repo.name}</span>
      <span className={`truncate ${muted}`}>{repo.description || "no description"}</span>
      <span className={`md:ml-auto text-xs shrink-0 ${muted} group-hover:text-redline`}>→ clone</span>
    </a>
  );
};