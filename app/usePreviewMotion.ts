"use client";

import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Progressive enhancement: content is visible before JS and when motion is reduced. */
export function usePreviewMotion(enabled: boolean) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!enabled || reduced) return;
    const root = document.querySelector<HTMLElement>(".cleanPreview");
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>(".careerHeader,.sideProjectsHeader,.cvHeader,.contactSection>h2")];
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const animation = entry.target.animate([
          { opacity: .65, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 420, easing: "cubic-bezier(.2,.7,.25,1)" });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      }
    }, { threshold: .12 });
    nodes.forEach(node => observer.observe(node));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [enabled, reduced]);
}
