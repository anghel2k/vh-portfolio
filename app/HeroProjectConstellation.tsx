"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent } from "react";
import { framebreedProjects } from "./framebreedProjects";
import { digitalstageProjects } from "./digitalstageProjects";
import { imageDimensions, optimizedSource } from "./imageDimensions";
import { useReducedMotion } from "./useReducedMotion";

const projects = [...framebreedProjects, ...digitalstageProjects];
const slots = [
  { id: "new-balance", position: "center", angle: -6, drift: 9 },
  { id: "croco", position: "upperLeft", angle: -12, drift: 5 },
  { id: "digitalstage-virgin-media", position: "upperRight", angle: 11, drift: 6 },
  { id: "raye", position: "lowerLeft", angle: -9, drift: 13 },
  { id: "digitalstage-heineken", position: "lowerRight", angle: 12, drift: 12 },
  { id: "digitalstage-san-pellegrino", position: "small", angle: 7, drift: 4 },
];

/** Preview study: spatial project composition with finite entry and pointer-only depth. */
export default function HeroProjectConstellation({ language, onSelect, obscured }: {
  children: ReactNode; language: "en" | "ro"; onSelect: (id: string) => void; obscured: boolean;
}) {
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [arriving, setArriving] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (reduced || obscured) { setArriving(false); return; }
    if (started.current) return;
    started.current = true;
    setArriving(true);
    const stop = () => setArriving(false);
    const timer = window.setTimeout(stop, 1200);
    document.addEventListener("visibilitychange", stop);
    return () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", stop); };
  }, [reduced, obscured]);

  const reset = () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    stage.current?.style.removeProperty("--pointer-x");
    stage.current?.style.removeProperty("--pointer-y");
  };
  useEffect(() => {
    if (reduced || obscured) reset();
    return reset;
  }, [reduced, obscured]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || obscured || event.pointerType !== "mouse" || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5 };
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      stage.current?.style.setProperty("--pointer-x", String(pointer.current.x));
      stage.current?.style.setProperty("--pointer-y", String(pointer.current.y));
      frame.current = 0;
    });
  };

  return <>
    <div ref={stage} className={`constellationStage${arriving && !reduced && !obscured ? " isArriving" : ""}`} onPointerMove={move} onPointerLeave={reset} onPointerEnter={() => setArriving(false)} onFocusCapture={() => setArriving(false)} onPointerDown={() => setArriving(false)}>
      <span className="constellationHaze constellationHazeLeft" aria-hidden="true" style={{ backgroundImage: `url("${optimizedSource("/digitalstage/media/work-thumbnails/emag-wallet-custom.jpg", 480)}")` }} />
      <span className="constellationHaze constellationHazeRight" aria-hidden="true" style={{ backgroundImage: `url("${optimizedSource("/projects/house-of-errors/ss25-02.jpg", 480)}")` }} />
      {slots.map((slot, index) => {
        const project = projects.find(item => item.id === slot.id)!;
        const style = { "--tile-angle": `${slot.angle}deg`, "--tile-drift": `${slot.drift}px`, "--arrival-delay": `${index * 35}ms`, "--tile-glow": `url("${optimizedSource(project.image, 480)}")` } as CSSProperties;
        return <div className={`constellationSlot constellationSlot--${slot.position}`} key={slot.id} style={style}>
          <button className="constellationProject" type="button" data-constellation-project={slot.id} aria-label={`${language === "ro" ? "Vezi proiectul" : "View project"}: ${project.title}`} onClick={() => { setArriving(false); onSelect(slot.id); }}>
            <span className="constellationGlass" aria-hidden="true">
              <img className="constellationPicture" {...imageDimensions(project.image)} sizes={index === 0 ? "(max-width: 700px) 132px, 228px" : "(max-width: 700px) 90px, 160px"} src={project.image} alt="" fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />
              <span className="constellationShade" />
              {project.logo && <img className="constellationLogo" {...imageDimensions(project.logo)} sizes="120px" src={project.logo} alt="" decoding="async" />}
            </span>
          </button>
          <span className="constellationTitle" aria-hidden="true">{project.title.split(" / ")[0].split(" — ")[0]}</span>
        </div>;
      })}
    </div>
  </>;
}
