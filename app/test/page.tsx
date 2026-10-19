import type { Metadata } from "next";
import Portfolio from "../page";
import "./clean.css";

export const metadata: Metadata = {
  title: "Robert Anghel | Clean design study",
  robots: { index: false, follow: false },
};

export default function CleanDesignStudy() {
  return <div className="cleanPreview"><Portfolio cleanPreview /></div>;
}
