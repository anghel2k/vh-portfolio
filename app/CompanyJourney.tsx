"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon, LayersIcon, PlusIcon, TargetIcon } from "@radix-ui/react-icons";
import { imageDimensions } from "./imageDimensions";

type Local = { en: string; ro: string };
type Stage = { period: Local; role: Local; scope: Local; current?: boolean };
type Company = { logo: string; name: string; period: Local; title: Local; intro: Local; steps: Local[]; stages: Stage[] };
const companies: Record<string, Company> = {
  framebreed: {
    logo: "/identity/framebreed-logo.png", name: "FrameBreed Studio",
    period: { en: "Mar 2024 — Present", ro: "mar. 2024 — Prezent" },
    title: { en: "Traditional CGI & VFX.", ro: "CGI și VFX tradițional." },
    intro: { en: "Hands-on production, growing into technical direction and team coordination.", ro: "De la producție directă la direcție tehnică și coordonarea echipei." },
    steps: [{ en: "Previs", ro: "Previs" }, { en: "CGI / VFX", ro: "CGI / VFX" }, { en: "Delivery", ro: "Livrare" }],
    stages: [
      { period: { en: "Mar 2024 — Nov 2025", ro: "mar. 2024 — nov. 2025" }, role: { en: "3D Generalist", ro: "3D Generalist" }, scope: { en: "Previsualization, animation pipelines, lighting, rendering and compositing. Independent contractor.", ro: "Previsualizare, fluxuri de animație, iluminare, randare și compositing. Colaborator independent." } },
      { period: { en: "Nov 2025 — Present", ro: "nov. 2025 — Prezent" }, role: { en: "Technical Director", ro: "Director tehnic" }, scope: { en: "Technical direction, on-set supervision and coordination between teams, clients and agencies. Independent contractor.", ro: "Direcție tehnică, supervizare pe platou și coordonare între echipe, clienți și agenții. Colaborator independent." }, current: true },
    ],
  },
  digitalstage: {
    logo: "/identity/digitalstage-logo.svg", name: "Digital Stage",
    period: { en: "Aug 2025 — Present", ro: "aug. 2025 — Prezent" },
    title: { en: "AI & hybrid production.", ro: "Producție AI și hibridă." },
    intro: { en: "Producing campaigns with a team across retouch, video and hybrid visual effects.", ro: "Producție de campanii cu o echipă de retuș, video și efecte vizuale hibride." },
    steps: [{ en: "Planning", ro: "Planificare" }, { en: "Production", ro: "Producție" }, { en: "Delivery", ro: "Livrare" }],
    stages: [{ period: { en: "Aug 2025 — Present", ro: "aug. 2025 — Prezent" }, role: { en: "Producer", ro: "Producer" }, scope: { en: "AI commercials, hybrid VFX and production coordination across the team.", ro: "Reclame AI, VFX hibrid și coordonarea producției în echipă." }, current: true }],
  },
  veliumin: {
    logo: "/identity/veliumin-logo-blue.svg", name: "VELIUMIN",
    period: { en: "Mar 2023 — Present", ro: "mar. 2023 — Prezent" },
    title: { en: "From identity to product.", ro: "De la identitate la produs." },
    intro: { en: "An independent fashion and creative project, built from the first idea to retail.", ro: "Un proiect independent de modă și creație, construit de la prima idee până la retail." },
    steps: [{ en: "Identity", ro: "Identitate" }, { en: "Product", ro: "Produs" }, { en: "Campaign", ro: "Campanie" }],
    stages: [{ period: { en: "Mar 2023 — Present", ro: "mar. 2023 — Prezent" }, role: { en: "Founder / Creative Director", ro: "Fondator / Director creativ" }, scope: { en: "Brand systems, product development, tech packs, Shopify, campaign production and physical retail.", ro: "Sisteme de brand, dezvoltare de produs, tech packs, Shopify, producție de campanie și retail fizic." }, current: true }],
  },
  tranding: {
    logo: "/identity/tranding-logo.png", name: "Tranding Social Media",
    period: { en: "Sep 2023 — Aug 2025", ro: "sept. 2023 — aug. 2025" },
    title: { en: "Visuals built for products.", ro: "Vizualuri pentru produse." },
    intro: { en: "Independent CGI, product visualization and visual effects for social campaigns.", ro: "CGI independent, vizualizare de produs și efecte vizuale pentru campanii social media." },
    steps: [{ en: "Product vis", ro: "Vizualizare" }, { en: "CGI / VFX", ro: "CGI / VFX" }, { en: "Delivery", ro: "Livrare" }],
    stages: [{ period: { en: "Sep 2023 — Aug 2025", ro: "sept. 2023 — aug. 2025" }, role: { en: "Visual Effects Artist", ro: "Artist de efecte vizuale" }, scope: { en: "Project-based independent work: product visualization, CGI reels, editing and 3D/VFX integrations.", ro: "Colaborare independentă per proiect: vizualizare de produs, reels CGI, editare și integrări 3D/VFX." } }],
  },
};
const workflowDetails: Record<string, Local[]> = {
  framebreed: [
    { en: "Previsualization and preparing the creative workflow before production.", ro: "Previsualizare și pregătirea fluxului creativ înainte de producție." },
    { en: "Character animation pipelines, lighting, rendering and compositing.", ro: "Fluxuri de animație de personaje, iluminare, randare și compositing." },
    { en: "Team, client and agency coordination through final delivery.", ro: "Coordonarea echipei, clienților și agențiilor până la livrarea finală." },
  ],
  digitalstage: [
    { en: "Production planning and coordination across the team.", ro: "Planificarea producției și coordonarea echipei." },
    { en: "Coordinating retouch, video and AI / hybrid VFX production.", ro: "Coordonarea producției de retuș, video și AI / VFX hibrid." },
    { en: "Following the production process through to campaign delivery.", ro: "Urmărirea procesului de producție până la livrarea campaniei." },
  ],
  veliumin: [
    { en: "Brand systems, identity and graphic direction.", ro: "Sisteme de brand, identitate și direcție grafică." },
    { en: "Product development, tech packs and product drops.", ro: "Dezvoltare de produs, tech packs și lansări de produse." },
    { en: "Campaign production, online commerce and the physical pop-up.", ro: "Producție de campanie, comerț online și pop-up fizic." },
  ],
  tranding: [
    { en: "Independent product visualization and 3D artwork.", ro: "Vizualizare independentă de produs și lucrări 3D." },
    { en: "CGI reels, editing and 3D / VFX integrations.", ro: "Reels CGI, editare și integrări 3D / VFX." },
    { en: "Project-based delivery for social media campaigns.", ro: "Livrare per proiect pentru campanii de social media." },
  ],
};
const processIcons = [TargetIcon, LayersIcon, CheckIcon];

export default function CompanyJourney({ company, language, details }: { company: keyof typeof companies; language: "en" | "ro"; details: readonly string[] }) {
  const data = companies[company];
  const [active, setActive] = useState(data.stages.length - 1);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const stage = data.stages[active];
  const ro = language === "ro";
  return <header className="companyPanel" data-company={company}>
    <div className="companyPanelTop">
      <img className="companyPanelLogo" {...imageDimensions(data.logo)} src={data.logo} alt={data.name} loading="lazy" decoding="async" />
      <span className="companyPeriod">{data.period[language]}</span>
    </div>
    <div className="companyPanelBody">
      <div className="companyIntroduction">
        <h3>{data.title[language]}</h3>
        <p>{data.intro[language]}</p>
        <details className="companyMore"><summary>{ro ? "Despre rol" : "About the role"}<PlusIcon aria-hidden="true" /></summary>
          <div>{details.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </details>
      </div>
      <div className="companyJourney">
        <p className="companyJourneyLabel">{ro ? "Parcursul rolului" : "Role journey"}</p>
        <ol className={`companyMilestones${data.stages.length === 1 ? " singleStage" : ""}`}>
          {data.stages.map((item, index) => <li key={index} className={`${active === index ? "isSelected" : ""}${item.current ? " isCurrent" : ""}`}>
            {data.stages.length > 1 ? <button type="button" aria-pressed={active === index} aria-controls={`journey-scope-${company}`} onClick={() => setActive(index)}>
              <span className="journeyPoint" aria-hidden="true" /><time>{item.period[language]}</time><strong>{item.role[language]}</strong>
              <small>{item.current ? (ro ? "Rol actual" : "Current role") : (ro ? "Etapă anterioară" : "Previous role")}</small>
            </button> : <div className="journeyStage">
              <span className="journeyPoint" aria-hidden="true" /><time>{item.period[language]}</time><strong>{item.role[language]}</strong>
              <small>{item.current ? (ro ? "Rol actual" : "Current role") : (ro ? "Colaborare încheiată" : "Completed engagement")}</small>
            </div>}
          </li>)}
        </ol>
        <p className="companyScope" id={`journey-scope-${company}`} aria-live="polite" aria-atomic="true"><span key={active}>{stage.scope[language]}</span></p>
      </div>
    </div>
    <div className="companyWorkflow" role="group" aria-label={ro ? "Flux de lucru" : "Workflow"}>
      <span className="companyWorkflowLabel">{ro ? "Flux de lucru" : "Workflow"}</span>
      <ol>{data.steps.map((step, index) => { const Icon = processIcons[index]; return <li key={index}>
        <button type="button" className={activePhase === index ? "isActive" : undefined} aria-expanded={activePhase === index} aria-controls={`workflow-detail-${company}`} onClick={() => setActivePhase(value => value === index ? null : index)}><Icon aria-hidden="true" /><span>{step[language]}</span></button>
        {index < data.steps.length - 1 && <ArrowRightIcon className="workflowArrow" aria-hidden="true" />}
      </li>; })}</ol>
    </div>
    <p className="companyWorkflowDetail" id={`workflow-detail-${company}`} aria-live="polite" aria-atomic="true">{activePhase !== null && <span key={activePhase}>{workflowDetails[company][activePhase][language]}</span>}</p>
  </header>;
}
