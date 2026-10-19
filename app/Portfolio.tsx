"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import BouncingMark from "./BouncingMark";
import ProjectSlider from "./ProjectSlider";
import HeroProjectBubbles from "./HeroProjectBubbles";
import ClientLogoRail from "./ClientLogoRail";
import PracticeOverview from "./PracticeOverview";
import CompanyJourney from "./CompanyJourney";
import { usePreviewMotion } from "./usePreviewMotion";
import { imageDimensions } from "./imageDimensions";
import { useModalFocus } from "./useModalFocus";
import { useReducedMotion } from "./useReducedMotion";
import { ArrowTopRightIcon, ArrowBottomRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, DownloadIcon, GridIcon, EnvelopeClosedIcon, PersonIcon, FileTextIcon, MagicWandIcon, CubeIcon, VideoIcon, ImageIcon, PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { digitalstageProjects } from "./digitalstageProjects";
import { framebreedProjects } from "./framebreedProjects";

type Language = "en" | "ro";

const cvVersions = [
  { language: "ro", pdf: "/cv/Robert_Anghel_CV_RO.pdf?v=84251e4d1443", preview: "/cv/Robert_Anghel_CV_RO-preview.png?v=84251e4d1443", fileName: "Robert_Anghel_CV_RO.pdf" },
  { language: "en", pdf: "/cv/Robert_Anghel_CV_EN.pdf?v=c3aaba5056ea", preview: "/cv/Robert_Anghel_CV_EN-preview.png?v=c3aaba5056ea", fileName: "Robert_Anghel_CV_EN.pdf" },
] as const;

const trandingProjects = [
  {
    id: "product-visualization-01",
    image: "/tranding/product-01.jpg",
    href: "https://www.instagram.com/p/C--pfpgtcxQ/?img_index=1",
    format: "square",
    title: { en: "Product visualization", ro: "Vizualizare de produs" },
    scope: { en: "3D / Product", ro: "3D / Produs" },
  },
  {
    id: "product-visualization-02",
    image: "/tranding/product-02.jpg",
    href: "https://www.instagram.com/p/C-8ZhmBqgJW/?img_index=3",
    format: "square",
    title: { en: "Product visualization", ro: "Vizualizare de produs" },
    scope: { en: "3D / Product", ro: "3D / Produs" },
  },
  {
    id: "product-visualization-03",
    image: "/tranding/product-03.jpg",
    href: "https://www.instagram.com/p/DBYeSrhqyaf/?img_index=1",
    format: "square",
    title: { en: "Product visualization", ro: "Vizualizare de produs" },
    scope: { en: "3D / Product", ro: "3D / Produs" },
  },
  {
    id: "cgi-reel-01",
    image: "/tranding/reel-01.jpg",
    href: "https://www.instagram.com/p/DB9IAJliQy4/",
    format: "reel",
    title: { en: "CGI reel ad", ro: "Reclamă CGI pentru reel" },
    scope: { en: "CGI / Social", ro: "CGI / Social" },
  },
  {
    id: "cgi-reel-02",
    image: "/tranding/reel-02.jpg",
    href: "https://www.instagram.com/p/DCW-QVdq63L/",
    format: "reel",
    title: { en: "CGI reel ad", ro: "Reclamă CGI pentru reel" },
    scope: { en: "CGI / Social", ro: "CGI / Social" },
  },
] as const;

const spetaImages = [
  "/side-projects/speta-home.png",
  "/side-projects/speta-ask-legal.png",
  "/side-projects/speta-answer.png",
  "/side-projects/speta-monitor.png",
] as const;

const veliuminArchive = [
  { id: "early-campaign", image: "/veliumin/IMG_9272.jpg", format: "portrait", title: { en: "Early campaign", ro: "Campanie timpurie" }, scope: { en: "Campaign / Collection", ro: "Campanie / Colecție" } },
  { id: "product-range-2023", image: "/veliumin/IMG_9270.jpg", format: "portrait", title: { en: "Product range", ro: "Gamă de produse" }, scope: { en: "Drop / Product development", ro: "Drop / Dezvoltare de produs" } },
  { id: "size-labels", image: "/veliumin/IMG_9269.jpg", format: "portrait", title: { en: "Garment label system", ro: "Sistem de etichete" }, scope: { en: "Brand system / Production", ro: "Sistem de brand / Producție" } },
  { id: "running-shorts", image: "/veliumin/IMG_9268.jpg", format: "portrait", title: { en: "Running shorts", ro: "Pantaloni scurți running" }, scope: { en: "Product / Art direction", ro: "Produs / Art direction" } },
  { id: "product-graphics", image: "/veliumin/IMG_9267.jpg", format: "portrait", title: { en: "Product graphics", ro: "Grafică de produs" }, scope: { en: "Graphic design / Product", ro: "Design grafic / Produs" } },
  { id: "custom-labels", image: "/veliumin/IMG_9266.jpg", format: "portrait", title: { en: "Custom labels & graphics", ro: "Etichete & grafică custom" }, scope: { en: "Product development", ro: "Dezvoltare de produs" } },
  { id: "collection-lineup", image: "/veliumin/IMG_9264.jpg", format: "portrait", title: { en: "Collection line-up", ro: "Line-up de colecție" }, scope: { en: "Drop / Art direction", ro: "Drop / Art direction" } },
  { id: "sand-stars", image: "/veliumin/IMG_9263.jpg", format: "portrait", title: { en: "Sand Stars / SS25", ro: "Sand Stars / SS25" }, scope: { en: "Collection / Product", ro: "Colecție / Produs" } },
  { id: "popup-poster", image: "/veliumin/IMG_9261.jpg", format: "portrait", title: { en: "VELIUMIN pop-up", ro: "Pop-up VELIUMIN" }, scope: { en: "Physical activation", ro: "Activare fizică" } },
  { id: "ss25-products", image: "/veliumin/IMG_9259.jpg", format: "portrait", title: { en: "SS25 product selection", ro: "Selecție de produse SS25" }, scope: { en: "Product / Photography", ro: "Produs / Fotografie" } },
  { id: "popup-voucher", image: "/veliumin/IMG_9258.jpg", format: "portrait", title: { en: "Pop-up voucher", ro: "Voucher de pop-up" }, scope: { en: "Customer experience", ro: "Experiență de client" } },
  { id: "popup-rack", image: "/veliumin/IMG_9257.jpg", format: "portrait", title: { en: "Retail set-up", ro: "Setup de retail" }, scope: { en: "Pop-up / Physical retail", ro: "Pop-up / Retail fizic" } },
  { id: "popup-menu", image: "/veliumin/IMG_9256.jpg", format: "portrait", title: { en: "Pop-up menu", ro: "Meniu de pop-up" }, scope: { en: "Retail design / Print", ro: "Design de retail / Print" } },
  { id: "campaign-cast", image: "/veliumin/IMG_9255.jpg", format: "portrait", title: { en: "SS25 campaign cast", ro: "Cast campanie SS25" }, scope: { en: "Campaign / Production", ro: "Campanie / Producție" } },
  { id: "studio-campaign", image: "/veliumin/IMG_9254.jpg", format: "portrait", title: { en: "Studio campaign", ro: "Campanie de studio" }, scope: { en: "Creative direction / Shoot", ro: "Direcție creativă / Shooting" } },
  { id: "telephone-product", image: "/veliumin/IMG_9253.jpg", format: "portrait", title: { en: "Telephone T-shirt", ro: "Tricou Telephone" }, scope: { en: "Product photography", ro: "Fotografie de produs" } },
  { id: "couch-campaign", image: "/veliumin/IMG_9252.jpg", format: "portrait", title: { en: "Campaign still", ro: "Cadru de campanie" }, scope: { en: "Campaign / Production", ro: "Campanie / Producție" } },
  { id: "cherry-campaign", image: "/veliumin/IMG_9251.jpg", format: "portrait", title: { en: "Cherry campaign", ro: "Campanie Cherry" }, scope: { en: "Campaign / Product", ro: "Campanie / Produs" } },
  { id: "dj-campaign", image: "/veliumin/IMG_9250.jpg", format: "portrait", title: { en: "DJ campaign", ro: "Campanie DJ" }, scope: { en: "Campaign / Art direction", ro: "Campanie / Art direction" } },
  { id: "flower-products", image: "/veliumin/IMG_9249.jpg", format: "portrait", title: { en: "Flower T-shirts", ro: "Tricouri Flowers" }, scope: { en: "SS25 / Product", ro: "SS25 / Produs" } },
  { id: "campaign-bts", image: "/veliumin/IMG_9248.jpg", format: "portrait", title: { en: "Campaign / Behind the scenes", ro: "Campanie / Behind the scenes" }, scope: { en: "Shoot / Production", ro: "Shooting / Producție" } },
] as const;

const chapters = [
  { company: { en: "FrameBreed Studio", ro: "FrameBreed Studio" }, years: { en: "Mar 2024 — Present", ro: "mart. 2024 — Prezent" }, role: { en: "Technical Director", ro: "Director tehnic" }, engagement: { en: "Independent contractor", ro: "Colaborator independent" }, href: "#framebreed-studio", logo: "/identity/framebreed-logo-timeline.png" },
  { company: { en: "Digital Stage", ro: "Digital Stage" }, years: { en: "Aug 2025 — Present", ro: "aug. 2025 — Prezent" }, role: { en: "Producer", ro: "Producer" }, engagement: { en: "AI / Hybrid VFX production", ro: "Producție AI / VFX hibrid" }, href: "#digitalstage", logo: "/identity/digitalstage-logo.svg" },
  { company: { en: "VELIUMIN", ro: "VELIUMIN" }, years: { en: "Mar 2023 — Present", ro: "mart. 2023 — Prezent" }, role: { en: "Founder / Creative Director", ro: "Fondator / Director de creație" }, engagement: { en: "Founder-led venture", ro: "Proiect propriu / Fondator" }, href: "#veliumin", logo: "/identity/veliumin-logo-blue.svg" },
  { company: { en: "Tranding Social Media", ro: "Tranding Social Media" }, years: { en: "Sep 2023 — Aug 2025", ro: "sept. 2023 — aug. 2025" }, role: { en: "Visual Effects Artist", ro: "Artist efecte vizuale" }, engagement: { en: "Project-based / Independent", ro: "Per proiect / Colaborator independent" }, href: "#tranding-social-media", logo: "/identity/tranding-logo-timeline.png" },
] as const;

const copy = {
  en: {
    skip: "Skip to content",
    homeLabel: "Robert Anghel home",
    navLabel: "Primary navigation",
    nav: ["Work", "Contact"],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Choose website language",
    languageNames: { en: "English", ro: "Romanian" },
    heroRole: "Technical Director",
    heroCapabilities: "3D · VFX · AI · Creative Technology",
    heroWork: "Creative Work",
    scrollPrompt: "Scroll to explore",
    heroBriefLabel: "Profile / Capabilities",
    heroBrief: "Technical Director at FrameBreed Studio for traditional 3D and VFX, and Producer at Digital Stage for AI and hybrid production. Hands-on work across creative pipelines, with direct coordination between teams, clients and agencies.",
    experienceEyebrow: "Experience",
    experienceTitle: <>Work<br />timeline.</>,
    roadmapLabel: "Career roadmap / Latest first",
    roadmapHint: "Select a role to open the full section",
    framebreedEyebrow: "Mar 2024 — Present",
    framebreedSummary: [
      "Technical Director working across traditional CGI and VFX production: previsualization, character animation pipelines, lighting, rendering, compositing and on-set supervision. I coordinate teams, clients and agencies through the production process.",
    ],
    present: "Present",
    currentPosition: "Current position",
    framebreedContract: "Independent contractor",
    roleProgressionLabel: "FrameBreed role progression",
    contribution: "My contribution",
    projectType: "Project type",
    projectYear: "Year",
    projectStudio: "Studio / Collaborators",
    projectOutcome: "Outcome",
    projectContext: "Project context",
    responsibilityRecord: "What I worked on",
    creditRecord: "Team & production credits",
    creditNote: "Only people, companies and roles confirmed from the available project information are listed.",
    projectStill: "project still",
    selectedProjects: "Selected FrameBreed projects",
    seeProject: "See project",
    seeAllProjects: "See all projects",
    hideAllProjects: "Hide all projects",
    allProjectsTitle: "All FrameBreed projects",
    closeProject: "Close project",
    previousProject: "Previous project",
    nextProject: "Next project",
    projectMedia: "Project media",
    openMedia: "Open full media",
    closeMedia: "Close media",
    motionPreview: "Motion preview",
    imagePreview: "Image preview",
    creditsLabel: "Project credits",
    veliuminEyebrow: "Mar 2023 — Present",
    veliuminSummary: [
      "Fashion and creative project built from zero, from the first identity and product drops through campaigns, online commerce and a physical pop-up.",
      "My work covered brand systems and graphic direction, end-to-end product development and tech packs, Shopify and custom themes, campaign production and physical retail.",
    ],
    role: "Role",
    scope: "Scope",
    veliuminRole: "Founder / Creative Director",
    veliuminShowcaseLabel: "Selected VELIUMIN archive",
    veliuminShowcaseTitle: "Website / Drops / Campaigns / Pop-up",
    trandingEyebrow: "Sep 2023 — Aug 2025",
    trandingSummary: "Project-based visual work delivered independently through Tranding: product visualization, CGI reels, editing and 3D/VFX integrations.",
    trandingRole: "Visual Effects Artist",
    contract: "Contract type",
    trandingContract: "Project-based / Independent",
    formats: "Scope",
    trandingMediaLabel: "Selected Tranding project previews",
    sourceProject: "Open source",
    sideEyebrow: "Independent work",
    sideTitle: "SIDE PROJECTS & EXPERIMENTS",
    sideIntro: "Independent products and focused experiments outside my main timeline.",
    spetaAlt: "SPETA legal workspace homepage",
    spetaCaption: ["Live beta / 2026", "Independent product development"],
    spetaTitle: "A Romanian legal workspace built around verifiable sources.",
    spetaBody: "Independent legal-tech product in active beta, using indexed Romanian legislation to answer questions with exact article and source citations.",
    spetaDetails: [["Status", "Beta / active testing"], ["My role", "Independent product development"]],
    spetaGallery: ["Ask Legal / Workspace", "Verified answer / Cited sources", "Legislative Monitor / Indexed corpus"],
    spetaWalkthrough: "Product walkthrough",
    openImage: "Open image",
    closeImage: "Close image",
    previousImage: "Previous image",
    nextImage: "Next image",
    visitSpeta: "Visit speta.io",
    skillsEyebrow: "Capabilities / Technical detail",
    skillsTitle: "Capabilities",
    skillGroups: [
      ["Creative Technology", ["AI-assisted production", "Generative image workflows", "Generative video workflows", "Workflow & pipeline development", "Automation & rapid prototyping", "Creative technical problem solving"], ["Kling", "Higgsfield", "GPT Image", "Google Veo / Flow", "Seedance / Seedream", "AI upscale / retouch", "Linux / servers", "Shopify development"]],
      ["3D & VFX", ["CGI & 3D production", "Look development", "Lighting & rendering", "Compositing & tracking", "Previsualization", "Asset integration & technical visualization"], ["3ds Max", "Maya", "Blender", "After Effects", "Rigging / morph workflows"]],
      ["Post-Production", ["Editorial", "Conform & finishing", "Motion work", "Delivery workflows", "Image finishing", "Commercial post-production"], ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Media conform / versioning", "Export / delivery QA"]],
      ["Design & Image", ["Graphic design", "Image-making", "Retouching", "Layout", "Visual development", "Keyframe creation"], ["Photoshop", "Illustrator", "InDesign"]],
    ],
    skillsExpand: "View tools & technical detail",
    skillsTools: "Tools / Platforms / Workflows",
    cvEyebrow: "Resume / PDF",
    cvTitle: "Resume",
    cvLead: "A concise one-page overview of my experience, available in Romanian and English.",
    cvPreview: "Preview Robert Anghel resume",
    cvOpen: "Open PDF",
    cvDownload: "Download PDF",
    cvLanguageLabels: { ro: "Romanian", en: "English" },
    contactEyebrow: "Contact",
    contactTitle: <>Let&apos;s<br />connect.</>,
    contactLead: "Available for selected long-term remote collaborations.",
    availabilityMeta: "Contract · Retainer · Remote",
    contactLabels: ["Name", "Based", "Phone", "Languages", "LinkedIn"],
    personalEmailLabel: "Personal email",
    workEmailLabel: "Work email",
    based: "Bucharest, Romania",
    languages: "Romanian / English",
    backTop: "Back to top ↑",
  },
  ro: {
    skip: "Sari la conținut",
    homeLabel: "Pagina principală Robert Anghel",
    navLabel: "Navigare principală",
    nav: ["Work", "Contact"],
    menuOpen: "Deschide meniul",
    menuClose: "Închide meniul",
    languageLabel: "Alege limba website-ului",
    languageNames: { en: "Engleză", ro: "Română" },
    heroRole: "Director tehnic",
    heroCapabilities: "3D · VFX · AI · Tehnologie creativă",
    heroWork: "Creative Work",
    scrollPrompt: "Derulează pentru a explora",
    heroBriefLabel: "Profil / Competențe",
    heroBrief: "Director tehnic la FrameBreed Studio pentru 3D și VFX tradițional și Producer la Digital Stage pentru producții AI și hibride. Lucrez direct în fluxurile creative și coordonez echipe, clienți și agenții.",
    experienceEyebrow: "Experiență",
    experienceTitle: <>Cronologie<br />profesională.</>,
    roadmapLabel: "Parcurs profesional / Cel mai recent primul",
    roadmapHint: "Selectează un rol pentru secțiunea completă",
    framebreedEyebrow: "mart. 2024 — Prezent",
    framebreedSummary: [
      "Director tehnic în producție CGI și VFX tradițional: previz, fluxuri de animație de personaje, lighting, render, compositing și supervizare pe platou. Coordonez echipe, clienți și agenții pe parcursul producției.",
    ],
    present: "Prezent",
    currentPosition: "Poziție actuală",
    framebreedContract: "Colaborator independent",
    roleProgressionLabel: "Evoluția rolurilor la FrameBreed",
    contribution: "Contribuția mea",
    projectType: "Tip proiect",
    projectYear: "An",
    projectStudio: "Studio / Colaboratori",
    projectOutcome: "Rezultat",
    projectContext: "Contextul proiectului",
    responsibilityRecord: "Ce am realizat",
    creditRecord: "Echipă & credite de producție",
    creditNote: "Sunt afișate doar persoanele, companiile și rolurile confirmate din informațiile disponibile despre proiect.",
    projectStill: "cadru din proiect",
    selectedProjects: "Proiecte FrameBreed selectate",
    seeProject: "Vezi proiectul",
    seeAllProjects: "Vezi toate proiectele",
    hideAllProjects: "Ascunde toate proiectele",
    allProjectsTitle: "Toate proiectele FrameBreed",
    closeProject: "Închide proiectul",
    previousProject: "Proiectul anterior",
    nextProject: "Proiectul următor",
    projectMedia: "Materiale din proiect",
    openMedia: "Deschide materialul complet",
    closeMedia: "Închide materialul",
    motionPreview: "Preview video",
    imagePreview: "Preview imagine",
    creditsLabel: "Creditele proiectului",
    veliuminEyebrow: "mart. 2023 — Prezent",
    veliuminSummary: [
      "Proiect de fashion și creație construit de la zero, de la prima identitate și primele drop-uri până la campanii, comerț online și un pop-up fizic.",
      "Munca mea a acoperit sisteme de brand și direcție grafică, dezvoltare de produs end-to-end și tech pack-uri, Shopify și teme custom, producție de campanie și retail fizic.",
    ],
    role: "Rol",
    scope: "Arii",
    veliuminRole: "Fondator / Director de creație",
    veliuminShowcaseLabel: "Arhivă VELIUMIN selectată",
    veliuminShowcaseTitle: "Website / Drop-uri / Campanii / Pop-up",
    trandingEyebrow: "sept. 2023 — aug. 2025",
    trandingSummary: "Lucrări vizuale independente livrate per proiect prin Tranding: vizualizare de produs, reels CGI, editare și integrări 3D/VFX.",
    trandingRole: "Artist efecte vizuale",
    contract: "Tip colaborare",
    trandingContract: "Per proiect / Colaborator independent",
    formats: "Arii",
    trandingMediaLabel: "Preview-uri din proiectele Tranding selectate",
    sourceProject: "Deschide sursa",
    sideEyebrow: "Proiecte independente",
    sideTitle: "PROIECTE SECUNDARE & EXPERIMENTE",
    sideIntro: "Produse independente și experimente punctuale din afara parcursului principal.",
    spetaAlt: "Pagina principală a workspace-ului juridic SPETA",
    spetaCaption: ["Beta live / 2026", "Dezvoltare independentă de produs"],
    spetaTitle: "Un workspace juridic românesc construit în jurul surselor verificabile.",
    spetaBody: "Produs legal-tech independent aflat în beta, care folosește legislația românească indexată pentru răspunsuri cu articole și surse citate exact.",
    spetaDetails: [["Status", "Beta / testare activă"], ["Rolul meu", "Dezvoltare independentă de produs"]],
    spetaGallery: ["Ask Legal / Workspace", "Răspuns verificabil / Surse citate", "Legislative Monitor / Corpus indexat"],
    spetaWalkthrough: "Parcursul produsului",
    openImage: "Deschide imaginea",
    closeImage: "Închide imaginea",
    previousImage: "Imaginea anterioară",
    nextImage: "Imaginea următoare",
    visitSpeta: "Vizitează speta.io",
    skillsEyebrow: "Competențe / Detalii tehnice",
    skillsTitle: "Competențe",
    skillGroups: [
      ["Tehnologie creativă", ["Producție asistată de AI", "Fluxuri de imagine generativă", "Fluxuri video generative", "Dezvoltare de workflow-uri și pipeline-uri", "Automatizare și prototipare rapidă", "Problem solving tehnic-creativ"], ["Kling", "Higgsfield", "GPT Image", "Google Veo / Flow", "Seedance / Seedream", "Upscale / retuș AI", "Linux / servere", "Dezvoltare Shopify"]],
      ["3D & VFX", ["CGI și producție 3D", "Look development", "Lighting și rendering", "Compositing și tracking", "Pre-vizualizare", "Integrare de asset-uri și vizualizare tehnică"], ["3ds Max", "Maya", "Blender", "After Effects", "Rigging / fluxuri de morph"]],
      ["Post-producție", ["Montaj", "Conform și finishing", "Motion work", "Fluxuri de livrare", "Finisare de imagine", "Post-producție comercială"], ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Conformare / versionare", "Export / controlul livrării"]],
      ["Design & imagine", ["Design grafic", "Image-making", "Retuș", "Layout", "Dezvoltare vizuală", "Creare de keyframe-uri"], ["Photoshop", "Illustrator", "InDesign"]],
    ],
    skillsExpand: "Vezi instrumentele și detaliile tehnice",
    skillsTools: "Instrumente / Platforme / Workflow-uri",
    cvEyebrow: "CV / PDF",
    cvTitle: "CV",
    cvLead: "O prezentare concisă, de o pagină, a experienței mele, disponibilă în română și engleză.",
    cvPreview: "Previzualizare CV Robert Anghel",
    cvOpen: "Deschide PDF",
    cvDownload: "Descarcă PDF",
    cvLanguageLabels: { ro: "Română", en: "Engleză" },
    contactEyebrow: "Contact",
    contactTitle: <>Hai să<br />discutăm.</>,
    contactLead: "Disponibil pentru colaborări remote selectate, pe termen lung.",
    availabilityMeta: "Contract · Retainer · Remote",
    contactLabels: ["Nume", "Locație", "Telefon", "Limbi", "LinkedIn"],
    personalEmailLabel: "Email personal",
    workEmailLabel: "Email de muncă",
    based: "București, România",
    languages: "Română / Engleză",
    backTop: "Înapoi sus ↑",
  },
} as const;

function ProjectPreviewVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) { video.pause(); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { rootMargin: "280px 0px", threshold: 0.05 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || reducedMotion) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [shouldLoad, reducedMotion]);

  return (
    <video ref={videoRef} loop muted playsInline preload="none" poster={poster} aria-label={label}>
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}

function CapabilitySymbol({ index }: { index: number }) {
  const Icon = [MagicWandIcon, CubeIcon, VideoIcon, ImageIcon][index] ?? CubeIcon;
  return <Icon className="uiSymbol" aria-hidden="true" />;
}

export default function Home({ cleanPreview = false }: { cleanPreview?: boolean } = {}) {
  usePreviewMotion(cleanPreview);
  const [language, setLanguage] = useState<Language>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeProjectMediaIndex, setActiveProjectMediaIndex] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllDigitalstageProjects, setShowAllDigitalstageProjects] = useState(false);
  const [activeSpetaImage, setActiveSpetaImage] = useState<number | null>(null);
  const [selectedSpetaPreview, setSelectedSpetaPreview] = useState(0);
  const carouselResumeTimers = useRef(new Map<HTMLElement, number>());
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useModalFocus(Boolean(activeProjectId), ".projectDetail");
  useModalFocus(activeProjectMediaIndex !== null, ".projectMediaLightbox");
  useModalFocus(activeSpetaImage !== null, ".spetaLightbox");
  const t = copy[language];
  const activeProjects = activeProjectId?.startsWith("digitalstage-") ? digitalstageProjects : framebreedProjects;
  const selectedProjectsLabel = activeProjectId?.startsWith("digitalstage-") ? (language === "en" ? "Selected Digital Stage projects" : "Proiecte Digital Stage selectate") : t.selectedProjects;
  const activeProject = activeProjects.find((project) => project.id === activeProjectId) ?? null;
  const activeProjectIndex = activeProjects.findIndex((project) => project.id === activeProjectId);
  const spetaLabels = [t.spetaAlt, ...t.spetaGallery];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => () => {
    carouselResumeTimers.current.forEach((timer) => window.clearTimeout(timer));
    carouselResumeTimers.current.clear();
  }, []);

  useEffect(() => {
    projectDetailRef.current?.scrollTo({ top: 0, behavior: "auto" });
    projectDetailRef.current?.querySelector<HTMLElement>("[data-modal-close]")?.focus({ preventScroll: true });
  }, [activeProjectId]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const desktopQuery = window.matchMedia("(min-width: 701px)");
    const closeMenu = () => setMobileMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMenu();
      document.querySelector<HTMLButtonElement>(".mobileMenuToggle")?.focus({ preventScroll: true });
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && !target.closest(".mobileMenu,.mobileMenuToggle")) closeMenu();
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => { if (event.matches) closeMenu(); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!activeProject && activeSpetaImage === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeProjectMediaIndex !== null) setActiveProjectMediaIndex(null);
        else {
          setActiveProjectId(null);
          setActiveSpetaImage(null);
        }
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject, activeProjectMediaIndex, activeSpetaImage]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const pauseCarousel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget;
    const pendingResume = carouselResumeTimers.current.get(carousel);
    if (pendingResume) window.clearTimeout(pendingResume);
    carouselResumeTimers.current.delete(carousel);
    carousel.classList.add("isInteracting");
  };

  const resumeCarousel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget;
    const pendingResume = carouselResumeTimers.current.get(carousel);
    if (pendingResume) window.clearTimeout(pendingResume);
    const timer = window.setTimeout(() => {
      carousel.classList.remove("isInteracting");
      carouselResumeTimers.current.delete(carousel);
    }, 2400);
    carouselResumeTimers.current.set(carousel, timer);
  };

  return (
    <>
      <a className="skipLink" href="#main">{t.skip}</a>

      <header className="siteHeader">
        <a className="brandLink" href="#top" aria-label={t.homeLabel} onClick={() => setMobileMenuOpen(false)}>
          <img {...imageDimensions("/brand/vh_mark_ink.svg")} src="/brand/vh_mark_ink.svg" alt="" width={36} height={36} />
          {cleanPreview && <strong translate="no">Robert Anghel</strong>}
        </a>
        <div className="headerActions">
          <nav aria-label={t.navLabel}>
            <a className="workNav" href="#experience">{cleanPreview && <GridIcon className="uiSymbol" aria-hidden="true" />}{t.nav[0]}</a>
            <a className="contactNav" href="#contact">{cleanPreview && <EnvelopeClosedIcon className="uiSymbol" aria-hidden="true" />}{t.nav[1]}</a>
          </nav>
          <div className="languageSwitch" role="group" aria-label={t.languageLabel}>
            <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} aria-label={t.languageNames.en} title={t.languageNames.en} onClick={() => changeLanguage("en")}><span aria-hidden="true">🇬🇧</span><small>EN</small></button>
            <button type="button" className={language === "ro" ? "active" : ""} aria-pressed={language === "ro"} aria-label={t.languageNames.ro} title={t.languageNames.ro} onClick={() => changeLanguage("ro")}><span aria-hidden="true">🇷🇴</span><small>RO</small></button>
          </div>
        </div>
        <button className={`mobileMenuToggle${mobileMenuOpen ? " isOpen" : ""}`} type="button" aria-expanded={mobileMenuOpen} aria-controls={mobileMenuOpen ? "mobile-menu" : undefined} aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen} onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        {mobileMenuOpen && (
          <div className="mobileMenu" id="mobile-menu">
            <nav aria-label={t.navLabel}>
              <a className="workNav" href="#experience" onClick={() => setMobileMenuOpen(false)}>{cleanPreview && <GridIcon className="uiSymbol" aria-hidden="true" />}{t.nav[0]}</a>
              <a className="contactNav" href="#contact" onClick={() => setMobileMenuOpen(false)}>{cleanPreview && <EnvelopeClosedIcon className="uiSymbol" aria-hidden="true" />}{t.nav[1]}</a>
            </nav>
            <div className="languageSwitch" role="group" aria-label={t.languageLabel}>
              <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} aria-label={t.languageNames.en} onClick={() => { changeLanguage("en"); setMobileMenuOpen(false); }}><span aria-hidden="true">🇬🇧</span><small>EN</small></button>
              <button type="button" className={language === "ro" ? "active" : ""} aria-pressed={language === "ro"} aria-label={t.languageNames.ro} onClick={() => { changeLanguage("ro"); setMobileMenuOpen(false); }}><span aria-hidden="true">🇷🇴</span><small>RO</small></button>
            </div>
          </div>
        )}
      </header>

      <main id="main" tabIndex={-1}>
        {cleanPreview ? (
          <section className="cleanHero" id="top" aria-labelledby="clean-hero-title">
            <HeroProjectBubbles language={language} onSelect={setActiveProjectId} obscured={Boolean(activeProjectId)}>
              <p>Robert Anghel — {language === "en" ? "Portfolio" : "Portofoliu"}</p>
              <h1 id="clean-hero-title">{language === "en" ? <>Technical direction.<br />Creative production.</> : <>Direcție tehnică.<br />Producție creativă.</>}</h1>
              <p>{t.heroCapabilities}</p>
              <a href="#experience">{language === "en" ? "Explore my work" : "Descoperă proiectele"} <span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></a>
            </HeroProjectBubbles>
          </section>
        ) : (
        <section className="hero" id="top">
          <BouncingMark />
          <h1 className="heroHeadline">
            <span className="heroName">Robert Anghel</span>
            <span className="heroRole">{t.heroRole}</span>
            <span className="heroCapabilities">{t.heroCapabilities}</span>
            <span className="heroWork">{t.heroWork}</span>
          </h1>
          <a className="heroScrollLink" href="#intro"><span>{t.scrollPrompt}</span><i aria-hidden="true" /></a>
        </section>
        )}

        {cleanPreview ? <>
          <ClientLogoRail language={language} />
          <PracticeOverview language={language} />
        </> : (
          <section className="heroBrief" id="intro" aria-label={t.heroBriefLabel}>
            <p className="eyebrow">{t.heroBriefLabel}</p><p>{t.heroBrief}</p>
          </section>
        )}

        <section className="experienceIndex" id="experience" aria-labelledby="experience-title">
          <header className="experienceHeader">
            <div className="experienceHeading"><p className="eyebrow">{t.experienceEyebrow}</p><h2 id="experience-title">{t.experienceTitle}</h2></div>
            <div className="experienceGuide"><span>{t.roadmapLabel}</span><p>{t.roadmapHint}</p></div>
          </header>
          <div className="chapterList">
            {chapters.map((chapter) => (
              <a href={chapter.href} className="chapterRow" key={chapter.href} aria-label={`${chapter.company[language]} — ${chapter.role[language]}`}>
                <span className="roadmapNode" aria-hidden="true" />
                <span className="chapterIdentity"><span className="chapterLogo"><img {...imageDimensions(chapter.logo)} src={chapter.logo} alt={cleanPreview ? "" : chapter.company[language]} loading="lazy" decoding="async" /></span></span>
                <span className="chapterWork"><strong>{chapter.role[language]}</strong><small>{chapter.engagement[language]}</small></span>
                <span className="chapterYears">{chapter.years[language]}</span><span className="chapterArrow" aria-hidden="true">{cleanPreview ? <ArrowBottomRightIcon className="uiArrow" aria-hidden="true" /> : "↘"}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="careerChapter framebreedChapter" id="framebreed-studio" aria-label="FrameBreed Studio">
          <h2 className="srOnly" translate="no">FrameBreed Studio</h2>
          {cleanPreview ? <CompanyJourney company="framebreed" language={language} details={t.framebreedSummary} /> : (
          <header className="careerHeader">
            <div><span className="careerLogo brandLogoHero"><img {...imageDimensions("/identity/framebreed-logo.png")} src="/identity/framebreed-logo.png" alt="FrameBreed Studio" loading="lazy" decoding="async" /></span><p className="eyebrow">{t.framebreedEyebrow}</p></div>
            <div className="careerSummary">
              {t.framebreedSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ol className="framebreedRoleRoadmap" aria-label={t.roleProgressionLabel}>
                <li><span className="roleRoadmapNode" aria-hidden="true" /><time>Mar 2024 — Nov 2025</time><strong>3D Generalist</strong><small>{t.framebreedContract}</small></li>
                <li className="isCurrent"><span className="roleRoadmapNode" aria-hidden="true" /><time>Nov 2025 — {t.present}</time><strong>{language === "en" ? "Technical Director" : "Director tehnic"}</strong><small>{t.currentPosition} / {t.framebreedContract}</small></li>
              </ol>
            </div>
          </header>
          )}
          <ProjectSlider active={cleanPreview} previousLabel={t.previousProject} nextLabel={t.nextProject} label={t.selectedProjects}>
          <div className="projectLoop" id="selected-work" aria-label={t.selectedProjects} onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
            <div className="projectLoopTrack">
              {(cleanPreview ? [0] : [0, 1]).map((copyIndex) => (
                <div className="projectLoopGroup" aria-hidden={copyIndex === 1} key={copyIndex}>
                  {framebreedProjects.map((project) => {
                    const projectCopy = project[language];
                    const tileLogo = project.logo;
                    return (
                      <button
                        className="projectLoopCard"
                        data-project={project.id}
                        id={copyIndex === 0 ? project.id : undefined}
                        type="button"
                        tabIndex={copyIndex === 1 ? -1 : undefined}
                        onClick={() => setActiveProjectId(project.id)}
                        key={`${copyIndex}-${project.id}`}
                        aria-label={`${t.seeProject}: ${project.title}`}
                      >
                        <img className="projectLoopPreview" {...imageDimensions(project.image)} src={project.image} alt="" loading="lazy" decoding="async" />
                        <span className="projectLoopTint" aria-hidden="true" />
                        <span className="projectLoopLogo">{tileLogo ? <img {...imageDimensions(tileLogo)} src={tileLogo} alt={copyIndex === 0 ? project.title : ""} loading="lazy" decoding="async" /> : <span className="projectBrandName">{project.title.split(" / ")[0]}</span>}</span>
                        <span className="projectLoopMeta">
                          <small>{project.classification} · {projectCopy.discipline}</small>
                          <strong>{cleanPreview ? project.title : t.seeProject}<span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></strong>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          </ProjectSlider>
          <div className="projectDirectoryToggleRow">
            <span>{framebreedProjects.length.toString().padStart(2, "0")} / {t.selectedProjects}</span>
            <button type="button" aria-expanded={showAllProjects} aria-controls={showAllProjects ? "framebreed-project-directory" : undefined} onClick={() => setShowAllProjects((isOpen) => !isOpen)}>
              {showAllProjects ? t.hideAllProjects : t.seeAllProjects}<span aria-hidden="true">{showAllProjects ? "−" : "+"}</span>
            </button>
          </div>
          {showAllProjects && (
            <section className="projectDirectory" id="framebreed-project-directory" aria-labelledby="project-directory-title">
              <header><p className="eyebrow">{t.selectedProjects}</p><h3 id="project-directory-title">{t.allProjectsTitle}</h3></header>
              <div className="projectDirectoryGrid">
                {framebreedProjects.map((project) => {
                  const projectCopy = project[language];
                  const tileLogo = project.logo;
                  return (
                    <button className="projectLoopCard projectGridCard" data-project={project.id} type="button" onClick={() => setActiveProjectId(project.id)} key={`grid-${project.id}`} aria-label={`${t.seeProject}: ${project.title}`}>
                      <img className="projectLoopPreview" {...imageDimensions(project.image)} src={project.image} alt="" loading="lazy" decoding="async" />
                      <span className="projectLoopTint" aria-hidden="true" />
                      <span className="projectLoopLogo">{tileLogo ? <img {...imageDimensions(tileLogo)} src={tileLogo} alt={project.title} loading="lazy" decoding="async" /> : <span className="projectBrandName">{project.title.split(" / ")[0]}</span>}</span>
                      <span className="projectLoopMeta"><small>{project.classification} · {projectCopy.discipline}</small><strong>{project.title}<span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></strong></span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </section>

        <section className="careerChapter digitalstageChapter" id="digitalstage" aria-label="Digital Stage">
          <h2 className="srOnly" translate="no">Digital Stage</h2>
          {cleanPreview ? <CompanyJourney company="digitalstage" language={language} details={[language === "en" ? "Producer at Digital Stage, creating AI commercials and hybrid VFX productions with a team working across retouching, video and visual effects." : "Producer la Digital Stage, unde producem reclame AI și producții VFX hibride cu o echipă de retuș, video și efecte vizuale."]} /> : (
          <header className="careerHeader">
            <div>
              <a className="careerLogo brandLogoHero" href="https://digitalstage.ro" target="_blank" rel="noreferrer" aria-label="Digital Stage website"><img {...imageDimensions("/identity/digitalstage-logo.svg")} src="/identity/digitalstage-logo.svg" alt="Digital Stage" loading="lazy" decoding="async" /></a>
              <p className="eyebrow">{language === "en" ? "Aug 2025 — Present" : "aug. 2025 — Prezent"}</p>
            </div>
            <div className="careerSummary">
              <p>{language === "en" ? "Producer at Digital Stage, creating AI commercials and hybrid VFX productions with a team working across retouching, video and visual effects." : "Producer la Digital Stage, unde producem reclame AI și producții VFX hibride cu o echipă de retuș, video și efecte vizuale."}</p>
              <ol className="framebreedRoleRoadmap" aria-label={language === "en" ? "Digital Stage role" : "Rolul la Digital Stage"}>
                <li className="isCurrent"><span className="roleRoadmapNode" aria-hidden="true" /><time>{language === "en" ? "Aug 2025" : "aug. 2025"} — {t.present}</time><strong>Producer</strong><small>{language === "en" ? "AI commercials / Hybrid VFX / Team coordination" : "Reclame AI / VFX hibrid / Coordonarea echipei"}</small></li>
              </ol>
            </div>
          </header>
          )}
          <ProjectSlider active={cleanPreview} previousLabel={t.previousProject} nextLabel={t.nextProject} label={language === "en" ? "Selected Digital Stage projects" : "Proiecte Digital Stage selectate"}>
          <div className="projectLoop" id="digitalstage-work" aria-label={language === "en" ? "Selected Digital Stage projects" : "Proiecte Digital Stage selectate"} onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
            <div className="projectLoopTrack">
              {(cleanPreview ? [0] : [0, 1]).map((copyIndex) => (
                <div className="projectLoopGroup" aria-hidden={copyIndex === 1} key={copyIndex}>
                  {digitalstageProjects.map((project) => {
                    const projectCopy = project[language];
                    const tileLogo = project.logo;
                    return (
                      <button
                        className="projectLoopCard"
                        data-project={project.id}
                        id={copyIndex === 0 ? project.id : undefined}
                        type="button"
                        tabIndex={copyIndex === 1 ? -1 : undefined}
                        onClick={() => setActiveProjectId(project.id)}
                        key={`${copyIndex}-${project.id}`}
                        aria-label={`${t.seeProject}: ${project.title}`}
                      >
                        <img className="projectLoopPreview" {...imageDimensions(project.image)} src={project.image} alt="" loading="lazy" decoding="async" />
                        <span className="projectLoopTint" aria-hidden="true" />
                        <span className="projectLoopLogo">{tileLogo ? <img {...imageDimensions(tileLogo)} src={tileLogo} alt={copyIndex === 0 ? project.title : ""} loading="lazy" decoding="async" /> : <span className="projectBrandName">{project.title.split(" / ")[0]}</span>}</span>
                        <span className="projectLoopMeta">
                          <small>{project.classification} · {projectCopy.discipline}</small>
                          <strong>{cleanPreview ? project.title : t.seeProject}<span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></strong>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          </ProjectSlider>
          <div className="projectDirectoryToggleRow">
            <span>{digitalstageProjects.length.toString().padStart(2, "0")} / {language === "en" ? "Selected Digital Stage projects" : "Proiecte Digital Stage selectate"}</span>
            <button type="button" aria-expanded={showAllDigitalstageProjects} aria-controls={showAllDigitalstageProjects ? "digitalstage-project-directory" : undefined} onClick={() => setShowAllDigitalstageProjects((isOpen) => !isOpen)}>
              {showAllDigitalstageProjects ? t.hideAllProjects : t.seeAllProjects}<span aria-hidden="true">{showAllDigitalstageProjects ? "−" : "+"}</span>
            </button>
          </div>
          {showAllDigitalstageProjects && (
            <section className="projectDirectory" id="digitalstage-project-directory" aria-labelledby="digitalstage-directory-title">
              <header><p className="eyebrow">{language === "en" ? "Selected Digital Stage projects" : "Proiecte Digital Stage selectate"}</p><h3 id="digitalstage-directory-title">{language === "en" ? "All Digital Stage projects" : "Toate proiectele Digital Stage"}</h3></header>
              <div className="projectDirectoryGrid">
                {digitalstageProjects.map((project) => {
                  const projectCopy = project[language];
                  const tileLogo = project.logo;
                  return (
                    <button className="projectLoopCard projectGridCard" data-project={project.id} type="button" onClick={() => setActiveProjectId(project.id)} key={`grid-${project.id}`} aria-label={`${t.seeProject}: ${project.title}`}>
                      <img className="projectLoopPreview" {...imageDimensions(project.image)} src={project.image} alt="" loading="lazy" decoding="async" />
                      <span className="projectLoopTint" aria-hidden="true" />
                      <span className="projectLoopLogo">{tileLogo ? <img {...imageDimensions(tileLogo)} src={tileLogo} alt={project.title} loading="lazy" decoding="async" /> : <span className="projectBrandName">{project.title.split(" / ")[0]}</span>}</span>
                      <span className="projectLoopMeta"><small>{project.classification} · {projectCopy.discipline}</small><strong>{project.title}<span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></strong></span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </section>

        {activeProject && (() => {
          const projectCopy = activeProject[language];
          const previousProject = activeProjects[(activeProjectIndex - 1 + activeProjects.length) % activeProjects.length];
          const nextProject = activeProjects[(activeProjectIndex + 1) % activeProjects.length];
          return (
            <div className="projectDetailLayer" onMouseDown={() => { setActiveProjectMediaIndex(null); setActiveProjectId(null); }}>
              <div ref={projectDetailRef} className="projectDetail" data-project={activeProject.id} role="dialog" aria-modal="true" tabIndex={-1} aria-labelledby="project-detail-title" onMouseDown={(event) => event.stopPropagation()}>
                <header className="projectDetailHeader">
                  <span>{selectedProjectsLabel} / {activeProject.title}</span>
                  <button className="projectCloseButton" type="button" data-modal-close onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(null); }} aria-label={t.closeProject}><span className="projectCloseLabel">{t.closeProject}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
                </header>
                <div className="projectDetailIntro">
                  <div className="projectDetailIdentity">
                    {activeProject.logo && <span className="projectDetailLogo"><img {...imageDimensions(activeProject.logo)} src={activeProject.logo} alt={`${activeProject.title} logo`} loading="lazy" decoding="async" /></span>}
                    <div className="projectHeadingCopy"><p className="eyebrow">{cleanPreview ? activeProject.classification : projectCopy.discipline}</p>
                    <h2 id="project-detail-title">{activeProject.title}</h2></div>
                  </div>
                  <div className="projectDetailContext">
                    <dl className="projectQuickFacts">
                      <div><dt>{t.projectType}</dt><dd>{cleanPreview ? projectCopy.projectType : `${activeProject.classification} / ${projectCopy.projectType}`}</dd></div>
                      {"year" in activeProject && <div><dt>{t.projectYear}</dt><dd>{activeProject.year}</dd></div>}
                      <div><dt>{t.contribution}</dt><dd>{projectCopy.discipline}</dd></div>
                      <div><dt>{t.projectStudio}</dt><dd>{activeProject.studio}</dd></div>
                    </dl>
                    <span>{t.projectContext}</span>
                    <p>{projectCopy.note}</p>
                  </div>
                </div>
                <section className="projectWorkRecord" aria-labelledby="project-work-title">
                  <header><p className="eyebrow">{t.contribution}</p><h3 id="project-work-title">{t.responsibilityRecord}</h3></header>
                  <div className="projectWorkDetails">
                    <p>{projectCopy.role}</p>
                    <ul>{projectCopy.work.map((item) => <li key={item}>{cleanPreview && <span className="projectWorkIcon" aria-hidden="true"><CheckIcon /></span>}<span>{item}</span></li>)}</ul>
                  </div>
                  <aside className="projectOutcome"><span>{t.projectOutcome}</span><p>{projectCopy.outcome}</p></aside>
                </section>
                <section className="projectMedia" aria-label={t.projectMedia}>
                  {activeProject.media.map((item, index) => (
                    <figure key={`${item.src}-${index}`}>
                      <button className="projectMediaPreview" type="button" onClick={() => setActiveProjectMediaIndex(index)} aria-label={`${t.openMedia}: ${activeProject.title} ${index + 1}`}>
                        {item.type === "video" ? (
                          <ProjectPreviewVideo src={item.src} poster={"poster" in item ? item.poster : undefined} label={`${activeProject.title} ${t.motionPreview} ${index + 1}`} />
                        ) : <img {...imageDimensions(item.src)} src={item.src} alt={`${activeProject.title} ${t.projectStill} ${index + 1}`} loading="lazy" decoding="async" />}
                        <span className="projectMediaHint" aria-hidden="true">{t.openMedia} {cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span>
                      </button>
                      <figcaption><span>{"label" in item ? item.label : item.type === "video" ? t.motionPreview : t.imagePreview}</span><span>0{index + 1}</span></figcaption>
                    </figure>
                  ))}
                </section>
                <section className="projectCredits" aria-label={t.creditsLabel}>
                  <header className="projectCreditsHeading"><p className="eyebrow">{t.creditRecord}</p><h3>{t.creditsLabel}</h3><p>{"creditScope" in projectCopy ? projectCopy.creditScope : t.creditNote}</p></header>
                  <dl>{projectCopy.credits.map((credit, creditIndex) => {
                    const label = credit[0] as string;
                    const value = credit[1];
                    const isCreditSection = label.startsWith("Project —") || label.startsWith("Proiect —") || label.startsWith("Local Crew —") || label.startsWith("Echipă locală —");
                    return (
                      <div className={[label === "Robert Anghel" ? "isSelf" : "", isCreditSection ? "isCreditSection" : ""].filter(Boolean).join(" ") || undefined} key={`${label}-${creditIndex}`}>
                        <dt>{label}</dt>
                        <dd>{typeof value === "string" ? value : (
                          <ul className="projectCreditNames">
                            {value.map((person) => (
                              <li className={person.name === "Robert Anghel" ? "isSelfCredit" : undefined} key={`${label}-${person.name}`}>
                                {"href" in person ? (
                                  <a href={person.href} target="_blank" rel="noreferrer"><span>{person.name}</span>{"handle" in person && <small>{person.handle} {cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</small>}</a>
                                ) : <span>{person.name}</span>}
                              </li>
                            ))}
                          </ul>
                        )}</dd>
                      </div>
                    );
                  })}</dl>
                </section>
                <nav className="projectCaseNavigation" aria-label={`${t.previousProject} / ${t.nextProject}`}>
                  <button type="button" onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(previousProject.id); }}><span>{cleanPreview ? <ArrowLeftIcon className="uiArrow" aria-hidden="true" /> : "←"} {t.previousProject}</span><strong>{previousProject.title}</strong></button>
                  <button type="button" onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(nextProject.id); }}><span>{t.nextProject} {cleanPreview ? <ArrowRightIcon className="uiArrow" aria-hidden="true" /> : "→"}</span><strong>{nextProject.title}</strong></button>
                </nav>
              </div>
            </div>
          );
        })()}

        {activeProject && activeProjectMediaIndex !== null && (() => {
          const media = activeProject.media[activeProjectMediaIndex];
          return (
            <div className="projectMediaLightboxLayer" onMouseDown={() => setActiveProjectMediaIndex(null)}>
              <div className="projectMediaLightbox" role="dialog" aria-modal="true" tabIndex={-1} aria-labelledby="project-media-lightbox-title" onMouseDown={(event) => event.stopPropagation()}>
                <header><span id="project-media-lightbox-title">{activeProject.title} / 0{activeProjectMediaIndex + 1}</span><button type="button" data-modal-close onClick={() => setActiveProjectMediaIndex(null)} aria-label={t.closeMedia}>{t.closeMedia} <span aria-hidden="true">×</span></button></header>
                <div>
                  {media.type === "video" ? (
                    <video key={media.src} controls autoPlay={!reducedMotion} muted playsInline poster={"poster" in media ? media.poster : undefined}>
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : <img {...imageDimensions(media.src)} src={media.src} alt={`${activeProject.title} ${t.projectStill} ${activeProjectMediaIndex + 1}`} />}
                </div>
              </div>
            </div>
          );
        })()}

        {activeSpetaImage !== null && (() => {
          const imageLabel = activeSpetaImage === 0 ? t.spetaAlt : t.spetaGallery[activeSpetaImage - 1];
          return (
            <div className="spetaLightboxLayer" onMouseDown={() => setActiveSpetaImage(null)}>
              <div className="spetaLightbox" role="dialog" aria-modal="true" tabIndex={-1} aria-labelledby="speta-lightbox-title" onMouseDown={(event) => event.stopPropagation()}>
                <header className="spetaLightboxHeader">
                  <span>SPETA / 0{activeSpetaImage + 1} — 0{spetaImages.length}</span>
                  <button type="button" data-modal-close onClick={() => setActiveSpetaImage(null)} aria-label={t.closeImage}>{t.closeImage} <span aria-hidden="true">×</span></button>
                </header>
                <div className="spetaLightboxMedia"><img {...imageDimensions(spetaImages[activeSpetaImage])} src={spetaImages[activeSpetaImage]} alt={imageLabel} /></div>
                <div className="spetaLightboxControls">
                  <button type="button" onClick={() => setActiveSpetaImage((activeSpetaImage - 1 + spetaImages.length) % spetaImages.length)} aria-label={t.previousImage}><span aria-hidden="true">{cleanPreview ? <ArrowLeftIcon className="uiArrow" aria-hidden="true" /> : "←"}</span> {t.previousImage}</button>
                  <strong id="speta-lightbox-title">{imageLabel}</strong>
                  <button type="button" onClick={() => setActiveSpetaImage((activeSpetaImage + 1) % spetaImages.length)} aria-label={t.nextImage}>{t.nextImage} <span aria-hidden="true">{cleanPreview ? <ArrowRightIcon className="uiArrow" aria-hidden="true" /> : "→"}</span></button>
                </div>
              </div>
            </div>
          );
        })()}

        <section className="careerChapter veliuminChapter" id="veliumin" aria-label="VELIUMIN">
          <h2 className="srOnly" translate="no">VELIUMIN</h2>
          {cleanPreview ? <CompanyJourney company="veliumin" language={language} details={t.veliuminSummary} /> : (
          <header className="careerHeader inverse">
            <div><span className="careerLogo careerLogoWide veliuminLogoHero"><img {...imageDimensions("/identity/veliumin-logo.svg")} src="/identity/veliumin-logo.svg" alt="VELIUMIN" loading="lazy" decoding="async" /></span><p className="eyebrow">{t.veliuminEyebrow}</p></div>
            <div className="careerSummary">
              {t.veliuminSummary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <dl className="roleProgression light"><div><dt>{t.role}</dt><dd>{t.veliuminRole}</dd></div></dl>
            </div>
          </header>
          )}
          <ProjectSlider active={cleanPreview} label={t.veliuminShowcaseTitle} previousLabel={t.previousImage} nextLabel={t.nextImage} cardSelector=".veliuminArchiveCard">
          <div className="veliuminShowcase" aria-label={t.veliuminShowcaseLabel}>
            <header className="veliuminShowcaseHeader"><span>{t.veliuminShowcaseTitle}</span><span>2023 — 2025</span></header>
            <div className="veliuminArchiveViewport" onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
              <div className="veliuminArchiveTrack">
                {(cleanPreview ? [0] : [0, 1]).map((groupIndex) => (
                  <div className="veliuminArchiveGroup" aria-hidden={groupIndex === 1} key={groupIndex}>
                    {veliuminArchive.map((item) => (
                      <figure className="veliuminArchiveCard" data-format={item.format} key={`${groupIndex}-${item.id}`}>
                        <img {...imageDimensions(item.image)} src={item.image} alt={groupIndex === 0 ? `${item.title[language]} — ${item.scope[language]}` : ""} loading="lazy" decoding="async" />
                      {cleanPreview && <figcaption><strong>{item.title[language]}</strong><span>{item.scope[language]}</span></figcaption>}</figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ProjectSlider>
        </section>

        <section className="careerChapter trandingChapter" id="tranding-social-media" aria-label="Tranding Social Media">
          <h2 className="srOnly" translate="no">Tranding Social Media</h2>
          {cleanPreview ? <CompanyJourney company="tranding" language={language} details={[t.trandingSummary]} /> : (
          <header className="careerHeader compact">
            <div><span className="careerLogo brandLogoHero"><img {...imageDimensions("/identity/tranding-logo.png")} src="/identity/tranding-logo.png" alt="Tranding Social Media" loading="lazy" decoding="async" /></span><p className="eyebrow">{t.trandingEyebrow}</p></div>
            <div className="careerSummary"><p>{t.trandingSummary}</p><dl className="roleProgression"><div><dt>{t.role}</dt><dd>{t.trandingRole}</dd></div><div><dt>{t.contract}</dt><dd>{t.trandingContract}</dd></div><div><dt>{t.formats}</dt><dd>Product vis / CGI reels / 3D / VFX</dd></div></dl></div>
          </header>
          )}
          <ProjectSlider active={cleanPreview} label={t.trandingMediaLabel} previousLabel={t.previousProject} nextLabel={t.nextProject} cardSelector=".trandingProjectCard">
          <div className="trandingShowcase" aria-label={t.trandingMediaLabel} onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
            <div className="trandingProjectTrack">
              {(cleanPreview ? [0] : [0, 1]).map((groupIndex) => (
                <div className="trandingProjectGroup" aria-hidden={groupIndex === 1} key={groupIndex}>
                  {trandingProjects.map((project) => (
                    <a className="trandingProjectCard" data-format={project.format} href={project.href} target="_blank" rel="noreferrer" key={`${groupIndex}-${project.id}`} tabIndex={groupIndex === 1 ? -1 : undefined}>
                      <img {...imageDimensions(project.image)} src={project.image} alt={groupIndex === 0 ? `${project.title[language]} — ${project.scope[language]}` : ""} loading="lazy" decoding="async" />
                      <span className="trandingProjectMeta"><small>{project.scope[language]}</small><strong>{project.title[language]}</strong><em>{cleanPreview ? (language === "en" ? "View on Instagram" : "Vezi pe Instagram") : t.sourceProject} {cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</em></span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          </ProjectSlider>
        </section>

        <section className="sideProjectsSection" id="side-projects" aria-labelledby="side-projects-title">
          <header className="sideProjectsHeader"><p className="eyebrow">{t.sideEyebrow}</p><h2 id="side-projects-title">{cleanPreview ? (language === "en" ? "Side projects & experiments" : "Proiecte personale & experimente") : t.sideTitle}</h2><p>{t.sideIntro}</p></header>
          <article className="spetaFeature">
            <div className="spetaIdentity">
              <span className="projectClassification">PRODUCT</span>
              <div className="spetaWordmark"><span>S</span><strong>SPETA</strong></div>
              <p className="eyebrow">Software pentru Evidență, Tehnologie și Analiză Juridică</p>
              <div className="spetaStatus"><span>{t.spetaCaption[0]}</span><span>{t.spetaCaption[1]}</span></div>
            </div>
            <div className="spetaCopy">
              <h3>{t.spetaTitle}</h3><p>{t.spetaBody}</p>
              <dl>{t.spetaDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              <a className="externalProjectLink" href="https://www.speta.io/" target="_blank" rel="noreferrer">{t.visitSpeta} <span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></a>
            </div>
          </article>
          <section className="spetaShowcase" aria-label={t.spetaWalkthrough}>
            <header className="spetaShowcaseHeader"><p className="eyebrow">{t.spetaWalkthrough}</p><span>0{selectedSpetaPreview + 1} / 0{spetaImages.length}</span></header>
            <figure className="spetaShowcaseStage">
              <div className="spetaWindowBar" aria-hidden="true"><span><i></i><i></i><i></i></span><strong>speta.io</strong><small>PRODUCT / BETA</small></div>
              <button className="spetaImageButton" type="button" onClick={() => setActiveSpetaImage(selectedSpetaPreview)} aria-label={`${t.openImage}: ${spetaLabels[selectedSpetaPreview]}`}>
                <img {...imageDimensions(spetaImages[selectedSpetaPreview])} src={spetaImages[selectedSpetaPreview]} alt={spetaLabels[selectedSpetaPreview]} loading="lazy" decoding="async" />
                <span className="spetaExpandHint" aria-hidden="true">{t.openImage} {cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span>
              </button>
              <figcaption><strong>{spetaLabels[selectedSpetaPreview]}</strong><span>SPETA / 0{selectedSpetaPreview + 1}</span></figcaption>
            </figure>
            <div className="spetaThumbnailRail" aria-label={t.spetaWalkthrough}>
              {spetaImages.map((image, index) => (
                <button className={selectedSpetaPreview === index ? "isActive" : undefined} type="button" aria-pressed={selectedSpetaPreview === index} onClick={() => setSelectedSpetaPreview(index)} key={image}>
                  <span>0{index + 1}</span><img {...imageDimensions(image)} src={image} alt="" loading="lazy" decoding="async" /><strong>{spetaLabels[index]}</strong>
                </button>
              ))}
            </div>
          </section>
          <section className="sideSkillsBlock" aria-labelledby="side-skills-title">
            <header><p className="eyebrow">{t.skillsEyebrow}</p><h3 id="side-skills-title">{t.skillsTitle}</h3></header>
            <div className="skillGroups">
              {t.skillGroups.map(([group, capabilities, tools], index) => (
                <details className="skillGroup" key={group}>
                  {cleanPreview ? <>
                    <summary className="capabilitySummary">
                      <div className="capabilityHead"><span className="symbolBadge"><CapabilitySymbol index={index} /></span><h4>{group}</h4><span className="capabilityExpand" aria-hidden="true"><PlusIcon /></span></div>
                      <ul className="capabilityPreview">{capabilities.slice(0, 3).map(capability => <li key={capability}>{capability}</li>)}</ul>
                      <span className="capabilityAction">{t.skillsExpand}</span>
                    </summary>
                    <div className="capabilityDetails">
                      <ul className="capabilityPreview">{capabilities.slice(3).map(capability => <li key={capability}>{capability}</li>)}</ul>
                      <div className="skillTools"><p>{t.skillsTools}</p><ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
                    </div>
                  </> : <>
                  <summary>
                    <span className="skillIndex">0{index + 1}</span>
                    <div><h4>{cleanPreview && <span className="symbolBadge"><CapabilitySymbol index={index} /></span>}<span>{group}</span></h4><ul className="skillCapabilities">{capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>
                    <small>{t.skillsExpand}</small><i aria-hidden="true">+</i>
                  </summary>
                  <div className="skillTools"><p>{t.skillsTools}</p><ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
                  </>}
                </details>
              ))}
            </div>
          </section>
        </section>

        <section className="cvSection" id="cv" aria-labelledby="cv-title">
          {cleanPreview ? <>
            <header className="cvHeader resumeHeader"><h2 id="cv-title">{t.cvTitle}</h2><p>{t.cvLead}</p></header>
            <div className="resumeGrid">
              {[...cvVersions].sort((a, b) => a.language === "en" ? -1 : b.language === "en" ? 1 : 0).map(version => (
                <article className="resumeCard" key={version.language} aria-labelledby={`resume-language-${version.language}`}>
                  <header className="resumeCardHeader"><span className="resumeFileIcon"><FileTextIcon aria-hidden="true" /></span><h3 id={`resume-language-${version.language}`}>{t.cvLanguageLabels[version.language]}</h3><span className="resumeFormat">PDF</span></header>
                  <a className="resumePreview" href={version.pdf} target="_blank" rel="noreferrer" aria-label={`${t.cvPreview} — ${t.cvLanguageLabels[version.language]}`}>
                    <img {...imageDimensions(version.preview)} src={version.preview} alt="" loading="lazy" decoding="async" />
                  </a>
                  <div className="resumeCardActions">
                    <a className="resumeOpen" href={version.pdf} target="_blank" rel="noreferrer" aria-label={`${t.cvOpen} — ${t.cvLanguageLabels[version.language]}`}>{language === "en" ? "Open PDF" : "Vezi PDF"}<ArrowTopRightIcon className="uiArrow" aria-hidden="true" /></a>
                    <a className="resumeDownload" href={version.pdf} download={version.fileName} aria-label={`${t.cvDownload} — ${t.cvLanguageLabels[version.language]}`}>{language === "en" ? "Download" : "Descarcă"}<DownloadIcon className="uiArrow" aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
          </> : <>
          <header className="cvHeader">
            <div><p className="eyebrow">{t.cvEyebrow}</p><h2 id="cv-title">{t.cvTitle}</h2></div>
            <div className="cvIntro">
              <p>{t.cvLead}</p>
              <div className="cvActions">
                {cvVersions.map((version) => (
                  <div className="cvVersion" key={version.language}>
                    <strong>{cleanPreview && <FileTextIcon className="uiSymbol" aria-hidden="true" />}{t.cvLanguageLabels[version.language]}</strong>
                    <div className="cvVersionLinks">
                      <a href={version.pdf} target="_blank" rel="noreferrer">{t.cvOpen} <span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></a>
                      <a href={version.pdf} download={version.fileName}>{t.cvDownload} <span aria-hidden="true">{cleanPreview ? <DownloadIcon className="uiArrow" aria-hidden="true" /> : "↓"}</span></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </header>
          <div className="cvPreviews">
            {cvVersions.map((version) => (
              <a className="cvPreviewLink" href={version.pdf} target="_blank" rel="noreferrer" aria-label={`${t.cvPreview} — ${t.cvLanguageLabels[version.language]}`} key={version.language}>
                <img {...imageDimensions(version.preview)} src={version.preview} alt="" loading="lazy" decoding="async" />
                <span>{t.cvLanguageLabels[version.language]} <span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></span>
              </a>
            ))}
          </div>
          </>}
        </section>

        <section className="contactSection" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">{t.contactEyebrow}</p><h2 id="contact-title">{t.contactTitle}</h2>
          <div className="contactAvailability"><p className="contactLead">{t.contactLead}</p><span>{t.availabilityMeta}</span></div>
          {cleanPreview ? (
            <div className="contactEmailGrid">
              <a className="contactEmailCard" href="mailto:anghelrobert18@gmail.com">
                <span><PersonIcon className="uiSymbol" aria-hidden="true" />{t.personalEmailLabel}</span>
                <strong>anghelrobert18@gmail.com</strong>
                <ArrowTopRightIcon className="uiArrow" aria-hidden="true" />
              </a>
              <a className="contactEmailCard" href="mailto:hello@veliumin.com">
                <span><EnvelopeClosedIcon className="uiSymbol" aria-hidden="true" />{t.workEmailLabel}</span>
                <strong>hello@veliumin.com</strong>
                <ArrowTopRightIcon className="uiArrow" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <>
          <a className="contactEmail" href="mailto:anghelrobert18@gmail.com"><span>anghelrobert18@gmail.com</span><span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></a>
          <a className="contactPersonalEmail" href="mailto:hello@veliumin.com"><span>{t.workEmailLabel}</span><strong>hello@veliumin.com</strong><span aria-hidden="true">{cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</span></a>
            </>
          )}
          <div className="contactGrid"><div><span>{t.contactLabels[0]}</span><strong translate="no">Robert Anghel</strong></div><div><span>{t.contactLabels[1]}</span><strong>{t.based}</strong></div><div><span>{t.contactLabels[2]}</span><a href="tel:+40722905095">+40 722 905 095</a></div><div><span>{t.contactLabels[3]}</span><strong>{t.languages}</strong></div><div><span>{t.contactLabels[4]}</span><a href="https://www.linkedin.com/in/robert-anghel18/" target="_blank" rel="noreferrer">LinkedIn {cleanPreview ? <ArrowTopRightIcon className="uiArrow" aria-hidden="true" /> : "↗"}</a></div></div>
          <div className="contactMark" aria-hidden="true"><img {...imageDimensions("/brand/vh_mark_paper.svg")} src="/brand/vh_mark_paper.svg" alt="" loading="lazy" decoding="async" /></div>
        </section>
      </main>

      <footer><span>Robert Anghel / Vellumhaus© 2026</span><a href="#top">{cleanPreview ? <>{t.backTop.replace(" ↑", "")} <ArrowUpIcon className="uiArrow" aria-hidden="true" /></> : t.backTop}</a></footer>
    </>
  );
}
