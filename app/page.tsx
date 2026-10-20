import type { Metadata, Viewport } from "next";
import Portfolio from "./Portfolio";
import "./portfolio.css";
import "./constellation.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f5f6f8", colorScheme: "light", viewportFit: "cover" };

export default function Home() {
  return <div className="cleanPreview orbitalPreview"><Portfolio cleanPreview heroStudy /></div>;
}
