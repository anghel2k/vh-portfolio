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
  useEffect(() => {
    const viewport = region.current?.querySelector<HTMLElement>(".clientLogoViewport");
    if (!viewport || reduced || !visible || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const logos = [...viewport.querySelectorAll<HTMLElement>(".clientLogo")];
    const pictures = logos.map(logo => logo.querySelector<HTMLImageElement>("img")!);
    let pointerX = 0;
    let frame = 0;
    const draw = () => {
      // Read the fixed slots, then write only image transforms. The moving track
      // keeps the Dock effect responsive even when the pointer stays still.
      const width = viewport.clientWidth;
      const radius = Math.min(220, width * .42);
      const strength = width < 700 ? .4 : .65;
      const weights = logos.map(logo => {
        const box = logo.getBoundingClientRect();
        const distance = Math.abs(pointerX - (box.left + box.width / 2));
        return distance < radius ? (Math.cos(Math.PI * distance / radius) + 1) / 2 : 0;
      });
      pictures.forEach((picture, index) => {
        const weight = weights[index];
        picture.style.setProperty("--dock-scale", String(1 + strength * weight));
        picture.style.setProperty("--dock-lift", `${-8 * weight}px`);
        picture.style.setProperty("--dock-opacity", String(.28 + .34 * weight));
      });
      frame = window.requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      pictures.forEach(picture => {
        picture.style.removeProperty("--dock-scale");
        picture.style.removeProperty("--dock-lift");
        picture.style.removeProperty("--dock-opacity");
      });
    };
    viewport.addEventListener("pointerenter", move);
    viewport.addEventListener("pointermove", move);
    viewport.addEventListener("pointerleave", reset);
    viewport.addEventListener("pointercancel", reset);
    return () => {
      reset();
      viewport.removeEventListener("pointerenter", move);
      viewport.removeEventListener("pointermove", move);
      viewport.removeEventListener("pointerleave", reset);
      viewport.removeEventListener("pointercancel", reset);
    };
  }, [reduced, visible]);
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
