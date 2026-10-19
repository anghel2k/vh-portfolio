"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ShuffleIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { framebreedProjects } from "./framebreedProjects";
import { digitalstageProjects } from "./digitalstageProjects";
import { imageDimensions } from "./imageDimensions";
import { useReducedMotion } from "./useReducedMotion";

const projects = [...framebreedProjects, ...digitalstageProjects];
const initialIds = ["raye", "new-balance", "digitalstage-virgin-media", "digitalstage-heineken"];
const positions = ["One", "Two", "Three", "Four"];
const initial = initialIds.map(id => projects.findIndex(project => project.id === id));

export default function HeroProjectBubbles({ children, language, onSelect, obscured }: {
  children: ReactNode;
  language: "en" | "ro";
  onSelect: (id: string) => void;
  obscured: boolean;
}) {
  const [selection, setSelection] = useState(initial);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useReducedMotion();
  const copy = useRef<HTMLDivElement>(null);
  const selected = useRef(initial);
  const pending = useRef(false);
  const generation = useRef(0);
  const nextSlot = useRef(0);

  useEffect(() => {
    const hero = copy.current?.closest("section");
    if (!hero) return;
    let visible = false;
    const updateVisibility = () => setAvailable(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateVisibility();
    }, { threshold: .25 });
    const updateInteraction = () => setInteracting(hero.matches(":hover") || hero.contains(document.activeElement));
    observer.observe(hero);
    document.addEventListener("visibilitychange", updateVisibility);
    hero.addEventListener("pointerenter", updateInteraction);
    hero.addEventListener("pointerleave", updateInteraction);
    hero.addEventListener("focusin", updateInteraction);
    hero.addEventListener("focusout", updateInteraction);
    return () => {
      generation.current++;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      hero.removeEventListener("pointerenter", updateInteraction);
      hero.removeEventListener("pointerleave", updateInteraction);
      hero.removeEventListener("focusin", updateInteraction);
      hero.removeEventListener("focusout", updateInteraction);
    };
  }, []);

  const shuffle = useCallback(async (all = false) => {
    if (pending.current) return;
    pending.current = true;
    const run = generation.current;
    const previous = selected.current;
    const candidates = projects.map((_, index) => index).filter(index => !previous.includes(index));
    // Draw without replacement so the four bubbles always show different projects.
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    const next = [...previous];
    const slots = all ? [0, 1, 2, 3] : [nextSlot.current++ % 4];
    await Promise.all(slots.map(async (slot, index) => {
      const candidate = candidates[index];
      const image = new Image();
      image.src = projects[candidate].image;
      try {
        await image.decode();
        next[slot] = candidate;
      } catch {
        // Keep the existing picture when a replacement cannot load.
      }
    }));
    if (generation.current === run) {
      selected.current = next;
      setSelection(next);
    }
    pending.current = false;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !available || interacting || obscured) return;
    const timer = window.setInterval(() => { void shuffle(); }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, available, interacting, obscured, shuffle]);

  const ro = language === "ro";
  return <>
    {selection.map((projectIndex, slot) => {
      const project = projects[projectIndex];
      return <button className={`cleanHeroImage cleanHeroImage${positions[slot]}`} key={slot} type="button"
        data-hero-project={project.id} aria-label={`${ro ? "Vezi proiectul" : "View project"}: ${project.title}`}
        onClick={() => onSelect(project.id)}>
        <span className="heroBubbleFrame" key={project.id}>
          <img className="cleanHeroBlur" {...imageDimensions(project.image)} src={project.image} alt="" aria-hidden="true" />
          <img className="cleanHeroPicture" {...imageDimensions(project.image)} src={project.image} alt="" fetchPriority={slot === 0 ? "high" : "auto"} />
        </span>
      </button>;
    })}
    <div className="cleanHeroCopy" ref={copy}>
      {children}
      <div className="heroBubbleControls" role="group" aria-label={ro ? "Previzualizări proiecte" : "Project previews"}>
        <button type="button" onClick={() => { void shuffle(true); }}><ShuffleIcon aria-hidden="true" /><span>{ro ? "Amestecă" : "Shuffle"}</span></button>
        {!reducedMotion && <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} aria-label={paused ? (ro ? "Reia schimbarea imaginilor" : "Resume changing previews") : (ro ? "Oprește schimbarea imaginilor" : "Pause changing previews")}>
          {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
        </button>}
      </div>
    </div>
  </>;
}
