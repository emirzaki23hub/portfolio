import { useEffect, useRef, useState } from "react";

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Builds a "throttle blip" motion curve: two quick revs toward redline
 * with drops in between, then a settle into the final value — like
 * blipping the throttle before riding off, not a single smooth sweep.
 */
function buildKeyframes(target, max) {
  const redline = max * 0.94;
  return [
    { t: 0, v: 0, ease: easeOutCubic },
    { t: 0.14, v: max * 0.5, ease: easeOutCubic }, // first blip
    { t: 0.26, v: max * 0.12, ease: easeInOutQuad }, // release
    { t: 0.42, v: redline, ease: easeOutCubic }, // second blip, near redline
    { t: 0.56, v: Math.max(max * 0.2, target * 0.35), ease: easeInOutQuad }, // release
    { t: 0.76, v: Math.min(max, target * 1.12 || max * 0.3), ease: easeOutCubic }, // rev toward target, slight overshoot
    { t: 1, v: target, ease: easeOutCubic }, // settle
  ];
}

function valueAt(progress, keyframes) {
  for (let i = 1; i < keyframes.length; i++) {
    const prev = keyframes[i - 1];
    const curr = keyframes[i];
    if (progress <= curr.t) {
      const span = curr.t - prev.t || 1;
      const local = curr.ease((progress - prev.t) / span);
      return prev.v + (curr.v - prev.v) * local;
    }
  }
  return keyframes[keyframes.length - 1].v;
}

/**
 * Analog gauge, styled after a motorcycle tachometer.
 * On mount, blips the throttle — two quick revs toward redline before
 * settling on `value` — rather than a single smooth sweep.
 */
export default function SpeedGauge({
  value = 78,
  max = 100,
  label = "COMMIT RATE",
  unit = "%",
  isDay = false,
  start = true,
}) {
  const [liveValue, setLiveValue] = useState(0);
  const [revving, setRevving] = useState(true);
  const keyframesRef = useRef(buildKeyframes(value, max));

  useEffect(() => {
    if (!start) return;
    keyframesRef.current = buildKeyframes(value, max);
    const kick = setTimeout(() => {
      const duration = 1900;
      const startTime = performance.now();
      let frame;
      setRevving(true);
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setLiveValue(valueAt(progress, keyframesRef.current));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setRevving(false);
        }
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, 250);
    return () => clearTimeout(kick);
  }, [value, max, start]);

  const angle = -120 + (liveValue / max) * 240;
  const displayValue = Math.round(liveValue);
  const ticks = Array.from({ length: 13 }, (_, i) => i);

  const faceColor = isDay ? "#F1EEE6" : "#15181B";
  const ringColor = isDay ? "#0B0D0F1a" : "#2A2E32";
  const dimTick = isDay ? "#0B0D0F66" : "#8B9198";
  const textColor = isDay ? "#0B0D0F" : "#E8E6E1";
  const isRedlining = liveValue / max > 0.85;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <circle cx="100" cy="100" r="94" fill={faceColor} stroke={ringColor} strokeWidth="1.5" />
        {ticks.map((i) => {
          const tickAngle = -120 + i * 20;
          const isRedline = i >= 10;
          const major = i % 2 === 0;
          const rad = (tickAngle * Math.PI) / 180;
          const outer = 84;
          const inner = major ? 70 : 76;
          const x1 = 100 + outer * Math.sin(rad);
          const y1 = 100 - outer * Math.cos(rad);
          const x2 = 100 + inner * Math.sin(rad);
          const y2 = 100 - inner * Math.cos(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isRedline ? "#FF4D23" : dimTick}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}
        <line
          x1="100"
          y1="100"
          x2={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          y2={100 - 60 * Math.cos((angle * Math.PI) / 180)}
          stroke={revving && isRedlining ? "#FF4D23" : "#C9FF3D"}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="6" fill={textColor} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-9 md:pb-11 pointer-events-none">
        <span
          className="font-mono text-3xl md:text-4xl tabular-nums"
          style={{ color: revving && isRedlining ? "#FF4D23" : textColor }}
        >
          {displayValue}
          {unit}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.3em] mt-1"
          style={{ color: isDay ? "#0B0D0F99" : "#8B9198" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}