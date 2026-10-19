"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { framebreedProjects } from "./framebreedProjects";
import { digitalstageProjects } from "./digitalstageProjects";
import { imageDimensions } from "./imageDimensions";
import { useReducedMotion } from "./useReducedMotion";

const projects = [...framebreedProjects, ...digitalstageProjects];

export default function ClientLogoRail({ language }: { language: "en" | "ro" }) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const region = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!region.current) return;
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(region.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  const ro = language === "ro";
  return <section className="clientLogoRail" ref={region} aria-label={ro ? "Branduri din proiectele selectate" : "Brands from selected projects"}>
    <div className={`clientLogoViewport${paused || !visible || reduced ? " isPaused" : ""}`} tabIndex={reduced ? 0 : undefined} role={reduced ? "region" : undefined} aria-label={reduced ? (ro ? "Logo-uri proiecte, derulare orizontală" : "Project logos, horizontal scrolling") : undefined}>
      <div className="clientLogoTrack">
        {[0, 1].map(copy => <div className="clientLogoGroup" aria-hidden={copy === 1 ? true : undefined} key={copy}>
          {projects.map(project => <span className="clientLogo" data-brand={project.id} key={project.id}>
            <img {...imageDimensions(project.logo)} src={project.logo} alt={copy === 0 ? project.title : ""} loading="lazy" decoding="async" />
          </span>)}
        </div>)}
      </div>
    </div>
    {!reduced && <button className="clientLogoPause" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}
      aria-label={paused ? (ro ? "Reia animația logo-urilor" : "Resume logo animation") : (ro ? "Oprește animația logo-urilor" : "Pause logo animation")}>
      {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
    </button>}
  </section>;
}
