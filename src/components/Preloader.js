import { useEffect, useState } from "react";

/**
 * Full-screen intro transition: an "ignition" loading readout, then the
 * overlay splits into two panels that slide apart — top and bottom — like
 * a garage door lifting, revealing the page underneath.
 */
export default function Preloader({ isDay, onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> revealing -> done

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const duration = 1400;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const linear = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 2);
      setProgress(Math.round(eased * 100));
      if (linear < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("revealing"), 200);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    document.body.style.overflow = "";
    const t = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 950);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (phase === "done") return null;

  const bg = isDay ? "bg-day" : "bg-asphalt";
  const text = isDay ? "text-asphalt" : "text-paper";
  const muted = isDay ? "text-asphalt/50" : "text-muted";
  const revealing = phase === "revealing";

  return (
    <div
      className={`fixed inset-0 z-[100] ${revealing ? "pointer-events-none" : "pointer-events-auto"}`}
      aria-hidden={revealing}
    >
      {/* Top panel */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 ${bg} flex items-end justify-center overflow-hidden transition-transform duration-[900ms] ${
          revealing ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        <span className={`pb-6 font-mono text-xs tracking-[0.35em] ${muted}`}>
          IGNITION
        </span>
      </div>

      {/* Bottom panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 ${bg} flex items-start justify-center overflow-hidden transition-transform duration-[900ms] ${
          revealing ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        <div className="pt-6 flex flex-col items-center gap-4 w-56">
          <span className={`font-mono text-4xl tabular-nums ${text}`}>{progress}%</span>
          <div className={`w-full h-px relative overflow-hidden ${isDay ? "bg-asphalt/15" : "bg-hairline"}`}>
            <div
              className="absolute inset-y-0 left-0 bg-redline"
              style={{ width: `${progress}%`, transition: "width 120ms linear" }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}