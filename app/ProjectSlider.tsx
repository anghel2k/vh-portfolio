"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";

type Position = { first: number; last: number; total: number; previous: boolean; next: boolean };

/** A native scroll rail: swipe on touch, drag with a mouse, or use the labelled controls. */
export default function ProjectSlider({ active, label, previousLabel, nextLabel, children }: { active: boolean; label: string; previousLabel: string; nextLabel: string; children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState<Position>({ first: 1, last: 1, total: 0, previous: false, next: true });

  useEffect(() => {
    if (!active || !viewport.current) return;
    const rail = viewport.current;
    const update = () => {
      const cards = [...rail.querySelectorAll<HTMLElement>(".projectLoopCard")];
      if (!cards.length) return;
      const railBox = rail.getBoundingClientRect();
      const visible = cards.map((card, index) => ({ index, box: card.getBoundingClientRect() }))
        .filter(({ box }) => box.right > railBox.left + 20 && box.left < railBox.right - 20);
      const next = { first: (visible[0]?.index ?? 0) + 1, last: (visible.at(-1)?.index ?? 0) + 1, total: cards.length,
        previous: rail.scrollLeft > 4, next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4 };
      setPosition(old => Object.keys(next).every(key => old[key as keyof Position] === next[key as keyof Position]) ? old : next);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    return () => { rail.removeEventListener("scroll", update); observer.disconnect(); };
  }, [active]);

  const move = (direction: number) => {
    const rail = viewport.current;
    const card = rail?.querySelector<HTMLElement>(".projectLoopCard");
    if (!rail || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: reduced ? "instant" : "smooth" });
  };
  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.moved) {
      suppressClick.current = true;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    event.currentTarget.classList.remove("isDragging");
  };
  if (!active) return <>{children}</>;
  return (
    <div className="cleanSlider">
      <div className="cleanSliderHeader">
        <span>{label}</span>
        <div className="cleanSliderControls">
          <span className="cleanSliderCount" aria-live="polite">{String(position.first).padStart(2, "0")}–{String(position.last).padStart(2, "0")} / {String(position.total).padStart(2, "0")}</span>
          <button type="button" aria-label={`${previousLabel} / ${label}`} disabled={!position.previous} onClick={() => move(-1)}><ArrowLeftIcon className="uiArrow" aria-hidden="true" /></button>
          <button type="button" aria-label={`${nextLabel} / ${label}`} disabled={!position.next} onClick={() => move(1)}><ArrowRightIcon className="uiArrow" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="cleanSliderViewport" ref={viewport}
        onPointerDown={event => {
          suppressClick.current = false;
          if (event.pointerType === "mouse" && event.button === 0) drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={event => {
          if (!drag.current) return;
          const distance = event.clientX - drag.current.x;
          if (Math.abs(distance) > 7) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.classList.add("isDragging");
          }
          if (drag.current.moved) { event.preventDefault(); event.currentTarget.scrollLeft = drag.current.scroll - distance; }
        }}
        onPointerUp={release} onPointerCancel={release}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onDragStart={event => event.preventDefault()}>
        {children}
      </div>
    </div>
  );
}
