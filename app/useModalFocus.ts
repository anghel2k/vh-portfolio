"use client";

import { useEffect } from "react";

const backgroundLocks = new WeakMap<HTMLElement, { count: number; original: boolean }>();

const focusable = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])';

/** Contain focus in a modal, isolate its background, and restore its opener. */
export function useModalFocus(active: boolean, selector: string) {
  useEffect(() => {
    if (!active) return;
    const modal = document.querySelector<HTMLElement>(selector);
    if (!modal) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const isolated = new Set<HTMLElement>();
    let branch: HTMLElement = modal;
    while (branch.parentElement && branch.parentElement !== document.documentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch && !['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) {
          const lock = backgroundLocks.get(sibling) ?? { count: 0, original: sibling.inert };
          lock.count += 1;
          backgroundLocks.set(sibling, lock);
          isolated.add(sibling);
          sibling.inert = true;
        }
      }
      branch = branch.parentElement;
    }
    const controls = () => [...modal.querySelectorAll<HTMLElement>(focusable)].filter(node => !node.closest('[inert]') && node.getClientRects().length > 0);
    const topmost = () => !modal.closest('[inert]');
    const first = () => (modal.querySelector<HTMLElement>('[data-modal-close]') ?? controls()[0] ?? modal).focus({ preventScroll: true });
    first();
    const containTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !topmost()) return;
      const nodes = controls();
      if (!nodes.length) { event.preventDefault(); modal.focus(); return; }
      const current = document.activeElement;
      if (!modal.contains(current) || (event.shiftKey && current === nodes[0])) {
        event.preventDefault(); (event.shiftKey ? nodes.at(-1)! : nodes[0]).focus();
      } else if (!event.shiftKey && current === nodes.at(-1)) {
        event.preventDefault(); nodes[0].focus();
      }
    };
    document.addEventListener('keydown', containTab);
    return () => {
      document.removeEventListener('keydown', containTab);
      isolated.forEach(node => {
        const lock = backgroundLocks.get(node);
        if (!lock) return;
        lock.count -= 1;
        if (lock.count === 0) { node.inert = lock.original; backgroundLocks.delete(node); }
      });
      if (opener?.isConnected && !opener.closest('[inert]')) opener.focus({ preventScroll: true });
    };
  }, [active, selector]);
}
