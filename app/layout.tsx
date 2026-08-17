import type { Metadata } from "next";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.vellumhaus.studio"),
  title: "Robert Anghel — Creative Work",
  description: "Portfolio of Robert Anghel — creative work across 3D, VFX and post-production.",
  icons: { icon: "/brand/vh_favicon.svg", shortcut: "/brand/vh_favicon.svg" },
  openGraph: {
    title: "Robert Anghel — Creative Work",
    description: "Portfolio and selected creative work across 3D, VFX and post-production.",
    url: "https://portfolio.vellumhaus.studio",
    siteName: "Robert Anghel / Vellumhaus",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Robert Anghel — portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Anghel — Creative Work",
    description: "Portfolio and selected creative work across 3D, VFX and post-production.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener("error",function(event){if(event.message==="Script error."&&!event.error&&!event.filename){event.preventDefault();event.stopImmediatePropagation();}},true);` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
