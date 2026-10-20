"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { framebreedProjects } from "./framebreedProjects";
import { digitalstageProjects } from "./digitalstageProjects";
import { imageDimensions, optimizedSource } from "./imageDimensions";
import { useReducedMotion } from "./useReducedMotion";

const projects = [...framebreedProjects, ...digitalstageProjects];
const initialIds = ["raye", "new-balance", "digitalstage-virgin-media", "digitalstage-heineken"];
const positions = ["One", "Two", "Three", "Four"];
const initial = initialIds.map(id => projects.findIndex(project => project.id === id));

/** A brief introduction, then direct hover/press feedback. No endless motion without controls. */
export default function HeroProjectBubbles({ children, language, onSelect, obscured }: {
  children: ReactNode;
  language: "en" | "ro";
  onSelect: (id: string) => void;
  obscured: boolean;
}) {
  const [selection, setSelection] = useState(initial);
  const [entering, setEntering] = useState(false);
  const reducedMotion = useReducedMotion();
  const copy = useRef<HTMLDivElement>(null);
  const selected = useRef(initial);
  const started = useRef(false);

  useEffect(() => {
    if (reducedMotion || obscured || started.current) return;
    const hero = copy.current?.closest("section");
    if (!hero) return;
    let stopped = false;
    let pending = false;
    let deadline = 0;
    const timers: number[] = [];
    const stop = () => {
      stopped = true;
      timers.forEach(window.clearTimeout);
      setEntering(false);
    };
    const replace = async (slot: number) => {
      if (stopped || pending) return;
      pending = true;
      const candidates = projects.map((_, index) => index).filter(index => !selected.current.includes(index));
      const candidate = candidates[Math.floor(Math.random() * candidates.length)];
      const picture = new Image();
      const attributes = imageDimensions(projects[candidate].image);
      picture.sizes = "280px";
      picture.srcset = attributes.srcSet ?? "";
      picture.src = optimizedSource(projects[candidate].image);
      try {
        await picture.decode();
        // A slow network must not restart motion long after the opening sequence.
        if (!stopped && performance.now() < deadline) {
          const next = [...selected.current];
          next[slot] = candidate;
          selected.current = next;
          setSelection(next);
        }
      } catch {
        // Keep the previous picture if its replacement cannot load.
      } finally { pending = false; }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (stopped) return;
      if (started.current) {
        if (!entry.isIntersecting) stop();
        return;
      }
      if (!entry.isIntersecting || document.hidden || hero.contains(document.activeElement)) return;
      started.current = true;
      deadline = performance.now() + 2000;
      setEntering(true);
      timers.push(window.setTimeout(() => { void replace(0); }, 500));
      timers.push(window.setTimeout(() => { void replace(3); }, 1100));
      timers.push(window.setTimeout(stop, 4600));
    }, { threshold: .25 });
    const visibility = () => { if (document.hidden) stop(); };
    observer.observe(hero);
    hero.addEventListener("pointerenter", stop);
    hero.addEventListener("pointerdown", stop);
    hero.addEventListener("focusin", stop);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      stopped = true;
      setEntering(false);
      timers.forEach(window.clearTimeout);
      observer.disconnect();
      hero.removeEventListener("pointerenter", stop);
      hero.removeEventListener("pointerdown", stop);
      hero.removeEventListener("focusin", stop);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reducedMotion, obscured]);

  return <>
    {selection.map((projectIndex, slot) => {
      const project = projects[projectIndex];
      return <button className={`cleanHeroImage cleanHeroImage${positions[slot]}${entering && !reducedMotion && !obscured ? " isEntering" : ""}`} key={slot} type="button"
        data-hero-project={project.id} aria-label={`${language === "ro" ? "Vezi proiectul" : "View project"}: ${project.title}`}
        onClick={() => onSelect(project.id)}>
        <span className="heroBubbleFrame" key={project.id} style={{ "--hero-blur-image": `image-set(url("${optimizedSource(project.image, 480)}") 1x, url("${optimizedSource(project.image, 960)}") 2x)` } as CSSProperties}>
          <img className="cleanHeroPicture" {...imageDimensions(project.image)} sizes="280px" src={project.image} alt="" fetchPriority={slot === 0 ? "high" : "auto"} />
        </span>
      </button>;
    })}
    <div className="cleanHeroCopy" ref={copy}>{children}</div>
  </>;
}
