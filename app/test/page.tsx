import type { Metadata, Viewport } from "next";
import Portfolio from "../Portfolio";
import "../portfolio.css";

export const metadata: Metadata = {
  title: "Robert Anghel | Clean design study",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f2f2f2", colorScheme: "light", viewportFit: "cover" };

export default function CleanDesignStudy() {
  return <div className="cleanPreview"><Portfolio cleanPreview /></div>;
}
