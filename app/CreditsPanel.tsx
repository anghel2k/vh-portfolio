"use client";

import { useRef } from "react";

type CreditsPanelProps = {
  title: string;
  credits: string[][];
  language: "en" | "ro";
};

export default function CreditsPanel({ title, credits, language }: CreditsPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const labels = language === "ro" ? {
    open: "Vezi creditele",
    eyebrow: "Credite proiect / contribuție",
    close: "Închide",
    closeLabel: "Închide creditele",
    note: "Acest panou separă contribuția mea de munca întregii echipe de producție. Numele și rolurile finale vor fi verificate înainte de publicare.",
  } : {
    open: "View credits",
    eyebrow: "Project credits / contribution record",
    close: "Close",
    closeLabel: "Close credits",
    note: "This panel distinguishes my contribution from the work of the wider production team. Final names and roles will be verified before publication.",
  };

  return (
    <>
      <button className="creditsButton" type="button" onClick={() => dialogRef.current?.showModal()}>
        {labels.open} <span aria-hidden="true">↗</span>
      </button>
      <dialog className="creditsDialog" ref={dialogRef} onClick={(event) => {
        if (event.currentTarget === event.target) dialogRef.current?.close();
      }}>
        <div className="creditsPanel">
          <header>
            <div><p>{labels.eyebrow}</p><h2>{title}</h2></div>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label={labels.closeLabel}>{labels.close} ×</button>
          </header>
          <dl>
            {credits.map(([label, value]) => <div key={`${label}-${value}`}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className="creditsNote">{labels.note}</p>
        </div>
      </dialog>
    </>
  );
}
