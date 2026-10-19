import type { Metadata, Viewport } from "next";
import Portfolio from "./Portfolio";
import "./portfolio.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f2f2f2", colorScheme: "light", viewportFit: "cover" };

export default function Home() {
  return <div className="cleanPreview"><Portfolio cleanPreview /></div>;
}
