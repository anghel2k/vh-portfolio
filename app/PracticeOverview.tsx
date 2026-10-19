"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowTopRightIcon, CubeIcon, MagicWandIcon, Component1Icon } from "@radix-ui/react-icons";
import { imageDimensions } from "./imageDimensions";

const practices = [
  {
    id: "cgi", icon: CubeIcon, image: "/projects/new-balance/egg-hatch.jpg", logo: "/identity/framebreed-logo.png", company: "FrameBreed Studio", href: "#framebreed-studio",
    en: { tab: "CGI / VFX", title: "Traditional craft.\nTechnical direction.", detail: "Previs, rigging and CGI workflows, with the team from first idea to final delivery.", role: "Technical Director", action: "Explore CGI & VFX" },
    ro: { tab: "CGI / VFX", title: "Producție tradițională.\nDirecție tehnică.", detail: "Previs, rigging și fluxuri CGI, alături de echipă de la idee la livrarea finală.", role: "Director tehnic", action: "Vezi CGI & VFX" },
  },
  {
    id: "hybrid", icon: MagicWandIcon, image: "/projects/heineken/heineken-blue.jpg", logo: "/identity/digitalstage-logo.svg", company: "Digital Stage", href: "#digitalstage",
    en: { tab: "AI / Hybrid", title: "New tools.\nReal production.", detail: "Producing AI and hybrid campaigns with teams across retouch, video and VFX.", role: "Producer", action: "Explore AI & hybrid" },
    ro: { tab: "AI / Hybrid", title: "Instrumente noi.\nProducție reală.", detail: "Producție de campanii AI și hibride, cu echipe de retuș, video și VFX.", role: "Producer", action: "Vezi AI & hybrid" },
  },
  {
    id: "products", icon: Component1Icon, image: "/side-projects/speta-home.png", company: "SPETA / Independent work", href: "#side-projects",
    en: { tab: "Products", title: "Ideas, made\ninto working tools.", detail: "Independent products and experiments, from legal technology to creative workflows.", role: "Independent product development", action: "Explore products" },
    ro: { tab: "Produse", title: "Idei transformate\nîn instrumente utile.", detail: "Produse și experimente independente, de la tehnologie juridică la fluxuri creative.", role: "Dezvoltare independentă de produs", action: "Vezi produsele" },
  },
];

export default function PracticeOverview({ language }: { language: "en" | "ro" }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const practice = practices[active];
  const copy = practice[language];
  return <section className="practiceOverview" id="intro" aria-label={language === "en" ? "Profile and capabilities" : "Profil și capabilități"}>
    <div className="practiceTablist" style={{ "--practice-index": active } as CSSProperties} role="tablist" aria-label={language === "en" ? "Areas of work" : "Domenii de lucru"}>
      <span className="practiceTabIndicator" aria-hidden="true" />
      {practices.map((item, index) => <button key={item.id} type="button" role="tab" id={`practice-tab-${item.id}`} aria-selected={index === active}
        aria-controls="practice-panel" tabIndex={index === active ? 0 : -1} ref={node => { tabs.current[index] = node; }}
        onClick={() => setActive(index)} onKeyDown={event => {
          let next = active;
          if (event.key === "ArrowRight") next = (index + 1) % practices.length;
          else if (event.key === "ArrowLeft") next = (index + practices.length - 1) % practices.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = practices.length - 1;
          else return;
          event.preventDefault(); setActive(next); tabs.current[next]?.focus();
        }}><item.icon aria-hidden="true" /><span>{item[language].tab}</span></button>)}
    </div>
    <div className="practicePanel" id="practice-panel" role="tabpanel" aria-labelledby={`practice-tab-${practice.id}`} tabIndex={0} data-practice={practice.id}>
      <div className="practiceCopy" key={`copy-${practice.id}`}>
        <div className="practiceIdentity">
          {"logo" in practice && practice.logo ? <img {...imageDimensions(practice.logo)} src={practice.logo} alt={practice.company} loading="lazy" decoding="async" /> : <span className="practiceSpeta" translate="no">SPETA</span>}
          <span>{copy.role}</span>
        </div>
        <h2>{copy.title.split("\n").map((line, index) => <span key={index}>{line}</span>)}</h2>
        <p>{copy.detail}</p>
        <a href={practice.href}>{copy.action}<ArrowTopRightIcon className="uiArrow" aria-hidden="true" /></a>
      </div>
      <div className="practiceMedia" key={`media-${practice.id}`}>
        <img {...imageDimensions(practice.image)} src={practice.image} alt={active === 2 ? (language === "en" ? "SPETA legal workspace" : "Workspace-ul juridic SPETA") : ""} loading="lazy" decoding="async" />
      </div>
    </div>
  </section>;
}
