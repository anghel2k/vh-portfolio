import type { Metadata } from "next";
import LegalPage from "../LegalPage";
export const metadata: Metadata = {
  title: "Termeni și drepturi de autor — Robert Anghel / Veliumin SRL",
  description: "Termeni de utilizare a portofoliului, drepturi de autor, credite și permisiuni. Servicii creative prin Veliumin SRL.",
  alternates: { canonical: "/termeni", languages: { en: "/terms", ro: "/termeni" } },
  openGraph: { title: "Termeni și drepturi de autor — Veliumin SRL", url: "/termeni", locale: "ro_RO", description: "Termeni, drepturi de autor, credite și permisiuni pentru portofoliu.", images: [{ url: "/og-portfolio.png", width: 1200, height: 630 }] },
};
export default function TermsRomanian() { return <LegalPage language="ro" />; }
