import type { Metadata } from "next";
import LegalPage from "../LegalPage";
export const metadata: Metadata = {
  title: "Terms & copyright — Robert Anghel / Veliumin SRL",
  description: "Portfolio terms, copyright, project credits and usage permissions. Creative services through Veliumin SRL.",
  alternates: { canonical: "/terms", languages: { en: "/terms", ro: "/termeni" } },
  openGraph: { title: "Terms & copyright — Veliumin SRL", url: "/terms", locale: "en_GB", description: "Portfolio terms, copyright, project credits and usage permissions.", images: [{ url: "/og-portfolio.png", width: 1200, height: 630 }] },
};
export default function Terms() { return <LegalPage language="en" />; }
