"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import BouncingMark from "./BouncingMark";

type Language = "en" | "ro";

const framebreedProjects = [
  {
    id: "san-pellegrino",
    title: "San Pellegrino — Ciao! Paris",
    classification: "COMMERCIAL",
    studio: "Frame23 Studio / Everything is Computer",
    image: "/projects/san-pellegrino/pool-still.jpg",
    logo: "/projects/san-pellegrino/san-pellegrino-logo.png",
    media: [
      { type: "video", src: "/projects/san-pellegrino/arc-de-triomphe.mp4", poster: "/projects/san-pellegrino/arc-de-triomphe-poster.jpg" },
      { type: "video", src: "/projects/san-pellegrino/jardin.mp4", poster: "/projects/san-pellegrino/jardin-poster.jpg" },
      { type: "video", src: "/projects/san-pellegrino/opera.mp4", poster: "/projects/san-pellegrino/opera-poster.jpg" },
      { type: "image", src: "/projects/san-pellegrino/cherry-still.jpg" },
      { type: "image", src: "/projects/san-pellegrino/lemon-still.jpg" },
    ],
    en: {
      projectType: "Social campaign films",
      outcome: "Three six-second social films delivered for the campaign.",
      note: "Three six-second social films turning Paris landmarks into oversized Italian gifts, produced through Frame23 Studio and Everything is Computer.",
      role: "Client and agency communication, keyframe creation, Photoshop retouching and AI video generation, working closely with Serj Zarnescu and Andrei Brovcenco.",
      discipline: "Keyframes / Retouch / Video generation",
      work: ["Team, client and agency communication", "Keyframe creation", "Photoshop retouching", "AI-assisted video generation"],
      credits: [
        ["Frame23 / FrameBreed Studio", "VFX and production"],
        ["Everything is Computer", "Agency"],
        ["John Nakamura Whitehouse", "Creative Director / Producer"],
        ["Erfan Saadati", "Executive Producer"],
        ["Andrei Brovcenco", "FrameBreed Founder / Producer / Creative support"],
        ["Serj Zarnescu", "Main graphics / Keyframe collaboration"],
        ["Robert Anghel", "Communication / Keyframes / Retouching / AI video generation"],
      ],
    },
    ro: {
      projectType: "Filme de campanie pentru social",
      outcome: "Trei filme de câte șase secunde livrate pentru campanie.",
      note: "Trei filme sociale de câte șase secunde, în care repere pariziene devin cadouri italiene supradimensionate, produse prin Frame23 Studio și Everything is Computer.",
      role: "Comunicare cu clientul și agenția, creare de keyframe-uri, retuș în Photoshop și generare video cu AI, lucrând îndeaproape cu Serj Zarnescu și Andrei Brovcenco.",
      discipline: "Keyframes / Retuș / Generare video",
      work: ["Comunicare între echipă, client și agenție", "Creare de keyframe-uri", "Retuș în Photoshop", "Generare video asistată de AI"],
      credits: [
        ["Frame23 / FrameBreed Studio", "VFX și producție"],
        ["Everything is Computer", "Agenție"],
        ["John Nakamura Whitehouse", "Director de creație / Producător"],
        ["Erfan Saadati", "Producător executiv"],
        ["Andrei Brovcenco", "Fondator FrameBreed / Producător / Suport creativ"],
        ["Serj Zarnescu", "Grafică principală / Colaborare la keyframe-uri"],
        ["Robert Anghel", "Comunicare / Keyframe-uri / Retuș / Generare video AI"],
      ],
    },
  },
  {
    id: "heineken",
    title: "Heineken — Fans Have More Friends",
    classification: "COMMERCIAL",
    studio: "FrameBreed Studio",
    image: "/projects/heineken/heineken-blue.jpg",
    logo: "/projects/heineken/heineken-logo.png",
    media: [
      { type: "image", src: "/projects/heineken/heineken-blue.jpg" },
      { type: "image", src: "/projects/heineken/heineken-day.jpg" },
    ],
    en: {
      projectType: "Commercial campaign / On-set VFX",
      outcome: "LED-ready campaign environments and final photographic assets.",
      note: "For “Fans Have More Friends”, AI, 3D and VFX were combined into LED-ready campaign environments matched to the talent, lighting and photographic setup.",
      role: "VFX supervision with Andrei Brovcenco, technical previs setups, AI tests and live Photoshop retouching for client and agency presentations on set.",
      discipline: "VFX supervision / Previs / On-set retouch",
      work: ["On-set VFX supervision with Andrei Brovcenco", "Technical previsualization setups", "AI workflow tests", "Live Photoshop retouching for client and agency presentations"],
      credits: [
        ["Client", [
          { name: "Heineken", handle: "@heineken", href: "https://www.instagram.com/heineken/" },
        ]],
        ["Agency", [
          { name: "LePub Worldwide", handle: "@lepub_worldwide", href: "https://www.instagram.com/lepub_worldwide/" },
        ]],
        ["Photographer", [
          { name: "Justin Bettman", handle: "@justinbettman", href: "https://www.instagram.com/justinbettman/" },
        ]],
        ["Production", [
          { name: "Bread.TheMakery", handle: "@bread.themakery", href: "https://www.instagram.com/bread.themakery/" },
          { name: "Bread.Service", handle: "@bread.service", href: "https://www.instagram.com/bread.service/" },
        ]],
        ["FrameBreed Studio", "VFX / Technical production"],
        ["Andrei Brovcenco", "VFX supervision / Technical collaboration"],
        ["Robert Anghel", "VFX supervision / Technical previs / AI tests / Live on-set Photoshop"],
      ],
    },
    ro: {
      projectType: "Campanie comercială / VFX pe platou",
      outcome: "Medii de campanie pregătite pentru LED și asset-uri fotografice finale.",
      note: "Pentru „Fans Have More Friends”, AI, 3D și VFX au fost combinate în medii de campanie pregătite pentru LED, adaptate talentului, luminii și setup-ului fotografic.",
      role: "Supervizare VFX alături de Andrei Brovcenco, setup-uri tehnice de previz, teste AI și retuș live în Photoshop pentru prezentările către client și agenție pe platou.",
      discipline: "Supervizare VFX / Previz / Retuș pe platou",
      work: ["Supervizare VFX pe platou alături de Andrei Brovcenco", "Setup-uri tehnice de pre-vizualizare", "Teste de fluxuri AI", "Retuș live în Photoshop pentru prezentările către client și agenție"],
      credits: [
        ["Client", [
          { name: "Heineken", handle: "@heineken", href: "https://www.instagram.com/heineken/" },
        ]],
        ["Agenție", [
          { name: "LePub Worldwide", handle: "@lepub_worldwide", href: "https://www.instagram.com/lepub_worldwide/" },
        ]],
        ["Fotograf", [
          { name: "Justin Bettman", handle: "@justinbettman", href: "https://www.instagram.com/justinbettman/" },
        ]],
        ["Producție", [
          { name: "Bread.TheMakery", handle: "@bread.themakery", href: "https://www.instagram.com/bread.themakery/" },
          { name: "Bread.Service", handle: "@bread.service", href: "https://www.instagram.com/bread.service/" },
        ]],
        ["FrameBreed Studio", "VFX / Producție tehnică"],
        ["Andrei Brovcenco", "Supervizare VFX / Colaborare tehnică"],
        ["Robert Anghel", "Supervizare VFX / Previz tehnic / Teste AI / Photoshop live pe platou"],
      ],
    },
  },
  {
    id: "house-of-errors",
    title: "House of Errors — Selected Campaigns",
    classification: "COMMERCIAL",
    studio: "Frame23 / FrameBreed",
    image: "/projects/house-of-errors/ss25-02.jpg",
    logo: "/projects/house-of-errors/logo.svg",
    media: [
      { type: "video", src: "/projects/house-of-errors/moss.mp4", poster: "/projects/house-of-errors/moss-poster.jpg" },
      { type: "video", src: "/projects/house-of-errors/ss25.mp4", poster: "/projects/house-of-errors/ss25-poster.jpg" },
      { type: "image", src: "/projects/house-of-errors/ss25-01.jpg" },
      { type: "image", src: "/projects/house-of-errors/ss25-03.jpg" },
      { type: "image", src: "/projects/house-of-errors/ss25-04.jpg" },
    ],
    en: {
      projectType: "Fashion campaign / VFX",
      outcome: "Transition film work and final SS25 lighting and render assets.",
      note: "Two House of Errors campaigns produced through Frame23 / FrameBreed: the Embroidered Moss Denim transition and the surreal SS25 paint-bucket assets.",
      role: "For Embroidered Moss Denim: keyframe creation and video generation for the transition. For SS25: technical render setup, lighting and final bucket renders.",
      discipline: "Keyframes / Generation / Lighting / Render",
      work: ["Keyframe creation for the Embroidered Moss Denim transition", "AI-assisted video generation for the transition", "Technical render setup for the SS25 bucket assets", "Lighting and final bucket renders"],
      creditScope: "Credits are grouped by production. Robert's exact contribution to each film is recorded above.",
      credits: [
        ["Project — House of Errors SS25", [
          { name: "House of Errors", handle: "@houseoferrors", href: "https://www.instagram.com/houseoferrors/" },
          { name: "fullyfullyfully", handle: "@fullyfullyfully", href: "https://www.instagram.com/fullyfullyfully/" },
        ]],
        ["Creative Director & Director", [
          { name: "Tom Emmerson", handle: "@tom.emmerson", href: "https://www.instagram.com/tom.emmerson/" },
        ]],
        ["Agency", [
          { name: "Red Buoy", handle: "@redbuoy.studio", href: "https://www.instagram.com/redbuoy.studio/" },
        ]],
        ["Producer", [
          { name: "Maggie Curwin", handle: "@maggiecurwin", href: "https://www.instagram.com/maggiecurwin/" },
        ]],
        ["Production Manager", [
          { name: "Peggy DiGioia Davies", handle: "@pdigioia_", href: "https://www.instagram.com/pdigioia_/" },
        ]],
        ["Light", [
          { name: "Jjay Johnson", handle: "@jjay_johnson_", href: "https://www.instagram.com/jjay_johnson_/" },
        ]],
        ["Digi Op", [
          { name: "Giorgio Lattanzi", handle: "@george_giorgio", href: "https://www.instagram.com/george_giorgio/" },
        ]],
        ["DOP", [
          { name: "Sam Kinsella", handle: "@kinsellas", href: "https://www.instagram.com/kinsellas/" },
        ]],
        ["Production Designer", [
          { name: "Naomi Feld", handle: "@naomifeldstudio", href: "https://www.instagram.com/naomifeldstudio/" },
        ]],
        ["Art Assistant", [{ name: "Eli Parkinson" }]],
        ["Model", [
          { name: "Randy", handle: "@raaandy.zip", href: "https://www.instagram.com/raaandy.zip/" },
        ]],
        ["VFX Supervisor", [{ name: "Lewis Ball" }]],
        ["Post", [
          { name: "Frame 23", handle: "@frame23.studio", href: "https://www.instagram.com/frame23.studio/" },
        ]],
        ["Frame 23 Executive Producers", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
          { name: "Erfan Saadati", handle: "@erfanzugram", href: "https://www.instagram.com/erfanzugram/" },
        ]],
        ["3D Modelling", [
          { name: "Mădălin Teletin", handle: "@teletinmadalin", href: "https://www.instagram.com/teletinmadalin/" },
        ]],
        ["Lighting & Render", [
          { name: "Robert Anghel", handle: "@anghel.w", href: "https://www.instagram.com/anghel.w/" },
        ]],
        ["Compositing & Retouch", [
          { name: "Marius Iftimie" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["Sound Designer", [
          { name: "I Need Sound", handle: "@ineedsound.co", href: "https://www.instagram.com/ineedsound.co/" },
        ]],
        ["Colour", [
          { name: "Mara Ciorba", handle: "@maraciorba", href: "https://www.instagram.com/maraciorba/" },
          { name: "Harbor Picture Company", handle: "@harborpictureco", href: "https://www.instagram.com/harborpictureco/" },
        ]],
        ["Special Thanks", [
          { name: "London Film Studios", handle: "@londonfilmstudios", href: "https://www.instagram.com/londonfilmstudios/" },
          { name: "SHL London", handle: "@shl.london", href: "https://www.instagram.com/shl.london/" },
          { name: "Luluz Catering", handle: "@luluzcatering", href: "https://www.instagram.com/luluzcatering/" },
          { name: "The Unit Bag", handle: "@theunitbag", href: "https://www.instagram.com/theunitbag/" },
        ]],
        ["Project — Embroidered Moss Denim", [
          { name: "House of Errors", handle: "@houseoferrors", href: "https://www.instagram.com/houseoferrors/" },
        ]],
        ["Creative Studio", [
          { name: "Red Buoy", handle: "@redbuoy.studio", href: "https://www.instagram.com/redbuoy.studio/" },
        ]],
        ["Creative Director, Director & Photographer", [
          { name: "Tom Emmerson", handle: "@tom.emmerson", href: "https://www.instagram.com/tom.emmerson/" },
        ]],
        ["Production", [
          { name: "Business Club", handle: "@businessclub.tv", href: "https://www.instagram.com/businessclub.tv/" },
        ]],
        ["Executive Producer", [{ name: "Jason Lovelock" }]],
        ["Producer", [
          { name: "Brooklyn Adebowale", handle: "@Brooklynade", href: "https://www.instagram.com/Brooklynade/" },
        ]],
        ["DOP", [
          { name: "Jack Maddison", handle: "@jackmaddisondop", href: "https://www.instagram.com/jackmaddisondop/" },
        ]],
        ["Model", [
          { name: "Cheikh Diaw", handle: "@cheikh.ad", href: "https://www.instagram.com/cheikh.ad/" },
        ]],
        ["VFX", [
          { name: "Frame 23", handle: "@frame23.studio", href: "https://www.instagram.com/frame23.studio/" },
        ]],
        ["Grade", [
          { name: "Rascal Post", handle: "@RASCALSTUDIO_", href: "https://www.instagram.com/RASCALSTUDIO_/" },
        ]],
        ["Colourist", [
          { name: "Dan Levy", handle: "@danmaxlevy", href: "https://www.instagram.com/danmaxlevy/" },
        ]],
        ["Sound", [
          { name: "Cameron Byrom", handle: "@cbav_productions", href: "https://www.instagram.com/cbav_productions/" },
        ]],
        ["Local Crew — Production", [
          { name: "Hawai", handle: "@hawaifilms", href: "https://www.instagram.com/hawaifilms/" },
        ]],
        ["Local Executive Producer", [{ name: "Ana Gil" }]],
        ["Production Coordinator Madrid", [{ name: "Marta Gómez" }]],
        ["Locations", [
          { name: "Two Sisters", handle: "@twosisterslocations", href: "https://www.instagram.com/twosisterslocations/" },
        ]],
        ["Fixer", [{ name: "Rosa Cosmelli" }]],
        ["Production Assistants", [
          { name: "Laura Abadia" },
          { name: "Giacomo Neri" },
          { name: "Jeremy Blackwood", handle: "@jerryjblackwood", href: "https://www.instagram.com/jerryjblackwood/" },
        ]],
        ["Assistant Camera", [
          { name: "Gabi Simo", handle: "@gabisimoig", href: "https://www.instagram.com/gabisimoig/" },
        ]],
        ["Prop Stylist", [{ name: "Laura Ques" }]],
        ["Atrezzo", [{ name: "Killian Irz" }]],
        ["Hair & Make-up Artist", [
          { name: "Isabel Esteban", handle: "@isabelestebanmakeup", href: "https://www.instagram.com/isabelestebanmakeup/" },
        ]],
        ["Casting Director", [{ name: "Mar Clar" }]],
        ["Cast", [
          { name: "Begoña Paredes Gonzalez" },
          { name: "Jose Ma Susacasa" },
        ]],
        ["Stunt", [{ name: "Marc Trilla" }]],
        ["Hero Boat", [{ name: "Alcatraz" }]],
        ["Boat Captain", [{ name: "Miguel" }]],
        ["Safety Deckhand", [{ name: "Nerea" }]],
        ["Marine Crew Coordination", [{ name: "Marine Tramuntana Diving and Film Services" }]],
        ["Safety Boat", [{ name: "Smile II" }]],
        ["Safety Boat Deckhand", [{ name: "Joad Sanchez" }]],
        ["Office Coordination", [{ name: "Cata Vives" }]],
      ],
    },
    ro: {
      projectType: "Campanie fashion / VFX",
      outcome: "Lucru pentru filmul de tranziție și asset-uri finale de lighting și render pentru SS25.",
      note: "Două campanii House of Errors produse prin Frame23 / FrameBreed: tranziția Embroidered Moss Denim și elementele suprarealiste cu găleți de vopsea pentru SS25.",
      role: "Pentru Embroidered Moss Denim: creare de keyframe-uri și generare video pentru tranziție. Pentru SS25: setup tehnic de render, lighting și randările finale ale găleților.",
      discipline: "Keyframes / Generare / Lighting / Render",
      work: ["Creare de keyframe-uri pentru tranziția Embroidered Moss Denim", "Generare video asistată de AI pentru tranziție", "Setup tehnic de render pentru asset-urile SS25", "Lighting și randările finale ale găleților"],
      creditScope: "Creditele sunt grupate pe producții. Contribuția exactă a lui Robert pentru fiecare film este prezentată mai sus.",
      credits: [
        ["Proiect — House of Errors SS25", [
          { name: "House of Errors", handle: "@houseoferrors", href: "https://www.instagram.com/houseoferrors/" },
          { name: "fullyfullyfully", handle: "@fullyfullyfully", href: "https://www.instagram.com/fullyfullyfully/" },
        ]],
        ["Director de creație & Regizor", [
          { name: "Tom Emmerson", handle: "@tom.emmerson", href: "https://www.instagram.com/tom.emmerson/" },
        ]],
        ["Agenție", [
          { name: "Red Buoy", handle: "@redbuoy.studio", href: "https://www.instagram.com/redbuoy.studio/" },
        ]],
        ["Producător", [
          { name: "Maggie Curwin", handle: "@maggiecurwin", href: "https://www.instagram.com/maggiecurwin/" },
        ]],
        ["Manager de producție", [
          { name: "Peggy DiGioia Davies", handle: "@pdigioia_", href: "https://www.instagram.com/pdigioia_/" },
        ]],
        ["Light", [
          { name: "Jjay Johnson", handle: "@jjay_johnson_", href: "https://www.instagram.com/jjay_johnson_/" },
        ]],
        ["Digi Op", [
          { name: "Giorgio Lattanzi", handle: "@george_giorgio", href: "https://www.instagram.com/george_giorgio/" },
        ]],
        ["DOP", [
          { name: "Sam Kinsella", handle: "@kinsellas", href: "https://www.instagram.com/kinsellas/" },
        ]],
        ["Production Designer", [
          { name: "Naomi Feld", handle: "@naomifeldstudio", href: "https://www.instagram.com/naomifeldstudio/" },
        ]],
        ["Asistent artă", [{ name: "Eli Parkinson" }]],
        ["Model", [
          { name: "Randy", handle: "@raaandy.zip", href: "https://www.instagram.com/raaandy.zip/" },
        ]],
        ["Supervizor VFX", [{ name: "Lewis Ball" }]],
        ["Post-producție", [
          { name: "Frame 23", handle: "@frame23.studio", href: "https://www.instagram.com/frame23.studio/" },
        ]],
        ["Producători executivi Frame 23", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
          { name: "Erfan Saadati", handle: "@erfanzugram", href: "https://www.instagram.com/erfanzugram/" },
        ]],
        ["Modelare 3D", [
          { name: "Mădălin Teletin", handle: "@teletinmadalin", href: "https://www.instagram.com/teletinmadalin/" },
        ]],
        ["Lighting & Render", [
          { name: "Robert Anghel", handle: "@anghel.w", href: "https://www.instagram.com/anghel.w/" },
        ]],
        ["Compositing & Retuș", [
          { name: "Marius Iftimie" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["Sound Designer", [
          { name: "I Need Sound", handle: "@ineedsound.co", href: "https://www.instagram.com/ineedsound.co/" },
        ]],
        ["Culoare", [
          { name: "Mara Ciorba", handle: "@maraciorba", href: "https://www.instagram.com/maraciorba/" },
          { name: "Harbor Picture Company", handle: "@harborpictureco", href: "https://www.instagram.com/harborpictureco/" },
        ]],
        ["Mulțumiri speciale", [
          { name: "London Film Studios", handle: "@londonfilmstudios", href: "https://www.instagram.com/londonfilmstudios/" },
          { name: "SHL London", handle: "@shl.london", href: "https://www.instagram.com/shl.london/" },
          { name: "Luluz Catering", handle: "@luluzcatering", href: "https://www.instagram.com/luluzcatering/" },
          { name: "The Unit Bag", handle: "@theunitbag", href: "https://www.instagram.com/theunitbag/" },
        ]],
        ["Proiect — Embroidered Moss Denim", [
          { name: "House of Errors", handle: "@houseoferrors", href: "https://www.instagram.com/houseoferrors/" },
        ]],
        ["Studio de creație", [
          { name: "Red Buoy", handle: "@redbuoy.studio", href: "https://www.instagram.com/redbuoy.studio/" },
        ]],
        ["Director de creație, Regizor & Fotograf", [
          { name: "Tom Emmerson", handle: "@tom.emmerson", href: "https://www.instagram.com/tom.emmerson/" },
        ]],
        ["Producție", [
          { name: "Business Club", handle: "@businessclub.tv", href: "https://www.instagram.com/businessclub.tv/" },
        ]],
        ["Producător executiv", [{ name: "Jason Lovelock" }]],
        ["Producător", [
          { name: "Brooklyn Adebowale", handle: "@Brooklynade", href: "https://www.instagram.com/Brooklynade/" },
        ]],
        ["DOP", [
          { name: "Jack Maddison", handle: "@jackmaddisondop", href: "https://www.instagram.com/jackmaddisondop/" },
        ]],
        ["Model", [
          { name: "Cheikh Diaw", handle: "@cheikh.ad", href: "https://www.instagram.com/cheikh.ad/" },
        ]],
        ["VFX", [
          { name: "Frame 23", handle: "@frame23.studio", href: "https://www.instagram.com/frame23.studio/" },
        ]],
        ["Grade", [
          { name: "Rascal Post", handle: "@RASCALSTUDIO_", href: "https://www.instagram.com/RASCALSTUDIO_/" },
        ]],
        ["Colorist", [
          { name: "Dan Levy", handle: "@danmaxlevy", href: "https://www.instagram.com/danmaxlevy/" },
        ]],
        ["Sunet", [
          { name: "Cameron Byrom", handle: "@cbav_productions", href: "https://www.instagram.com/cbav_productions/" },
        ]],
        ["Echipă locală — Producție", [
          { name: "Hawai", handle: "@hawaifilms", href: "https://www.instagram.com/hawaifilms/" },
        ]],
        ["Producător executiv local", [{ name: "Ana Gil" }]],
        ["Coordonator producție Madrid", [{ name: "Marta Gómez" }]],
        ["Locații", [
          { name: "Two Sisters", handle: "@twosisterslocations", href: "https://www.instagram.com/twosisterslocations/" },
        ]],
        ["Fixer", [{ name: "Rosa Cosmelli" }]],
        ["Asistenți producție", [
          { name: "Laura Abadia" },
          { name: "Giacomo Neri" },
          { name: "Jeremy Blackwood", handle: "@jerryjblackwood", href: "https://www.instagram.com/jerryjblackwood/" },
        ]],
        ["Asistent cameră", [
          { name: "Gabi Simo", handle: "@gabisimoig", href: "https://www.instagram.com/gabisimoig/" },
        ]],
        ["Prop Stylist", [{ name: "Laura Ques" }]],
        ["Atrezzo", [{ name: "Killian Irz" }]],
        ["Hair & Make-up Artist", [
          { name: "Isabel Esteban", handle: "@isabelestebanmakeup", href: "https://www.instagram.com/isabelestebanmakeup/" },
        ]],
        ["Director casting", [{ name: "Mar Clar" }]],
        ["Distribuție", [
          { name: "Begoña Paredes Gonzalez" },
          { name: "Jose Ma Susacasa" },
        ]],
        ["Cascador", [{ name: "Marc Trilla" }]],
        ["Ambarcațiune principală", [{ name: "Alcatraz" }]],
        ["Căpitan ambarcațiune", [{ name: "Miguel" }]],
        ["Marinar de siguranță", [{ name: "Nerea" }]],
        ["Coordonare echipă marină", [{ name: "Marine Tramuntana Diving and Film Services" }]],
        ["Ambarcațiune de siguranță", [{ name: "Smile II" }]],
        ["Marinar ambarcațiune de siguranță", [{ name: "Joad Sanchez" }]],
        ["Coordonare office", [{ name: "Cata Vives" }]],
      ],
    },
  },
  {
    id: "new-balance",
    title: "New Balance — Gator Run",
    classification: "COMMERCIAL",
    studio: "Frame23 Studio",
    image: "/projects/new-balance/egg-hatch.jpg",
    logo: "/projects/new-balance/new-balance-logo.png",
    media: [
      { type: "video", src: "/projects/new-balance/egg-hatch.mp4", poster: "/projects/new-balance/egg-hatch.jpg" },
      { type: "video", src: "/projects/new-balance/croc-insert.mp4", poster: "/projects/new-balance/croc-insert.jpg" },
      { type: "video", src: "/projects/new-balance/follow-leader.mp4", poster: "/projects/new-balance/follow-leader.jpg" },
      { type: "video", src: "/projects/new-balance/mama-croc.mp4", poster: "/projects/new-balance/mama-croc.jpg" },
    ],
    en: {
      projectType: "Full-CGI campaign",
      outcome: "Four full-CGI campaign films and a suite of campaign stills.",
      note: "“Gator Run” introduces a baby gator through four full-CGI campaign films and a suite of stills, produced through Frame23 Studio.",
      role: "Previsualization with Andrei Brovcenco, team communication, agency delivery preparation and selected retouching support.",
      discipline: "Previs / Coordination / Delivery / Retouch",
      work: ["Previsualization with Andrei Brovcenco", "Production team communication", "Preparing versions and deliverables for the agency", "Selected Photoshop retouching"],
      credits: [
        ["Client", [{ name: "New Balance" }]],
        ["Creative Agency", [{ name: "Red Buoy" }]],
        ["Director / Photographer", [{ name: "Tom Emmerson" }]],
        ["Production Company", [{ name: "Business Club" }]],
        ["VFX / Full CGI", [{ name: "Frame23 Studio" }]],
        ["3D Modelling & Texturing", [
          { name: "Anastasia Bîdiliță", handle: "@anastasia.bidilita", href: "https://www.instagram.com/anastasia.bidilita/" },
          { name: "Mădălin Teletin", handle: "@teletinmadalin", href: "https://www.instagram.com/teletinmadalin/" },
          { name: "Salo Bohuslav" },
        ]],
        ["3D Animation", [
          { name: "Călin Ivașcu" },
          { name: "Filip Rădulescu", handle: "@filipu", href: "https://www.instagram.com/filipu/" },
          { name: "Ramzan Mulani" },
        ]],
        ["Technical Direction", [
          { name: "Cristian Afteni", handle: "@cristi_rdi", href: "https://www.instagram.com/cristi_rdi/" },
          { name: "Ciprian Dumitru", handle: "@cipry16", href: "https://www.instagram.com/cipry16/" },
          { name: "Robert Anghel", handle: "@anghel.w", href: "https://www.instagram.com/anghel.w/" },
        ]],
        ["Character Rigging", [
          { name: "Alexandru Gonța", handle: "@aiex_gz", href: "https://www.instagram.com/aiex_gz/" },
        ]],
        ["Compositing", [
          { name: "Laura Maria Mihăilă", handle: "@l.a.u.r.a.m.m", href: "https://www.instagram.com/l.a.u.r.a.m.m/" },
          { name: "Marius Iftimie" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["VFX & 3D Animation Supervision", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
        ]],
        ["VFX Producers", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
          { name: "Raluca Platon", handle: "@ralucaaaaip", href: "https://www.instagram.com/ralucaaaaip/" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["Executive Producer", [
          { name: "Erfan Saadati" },
        ]],
      ],
    },
    ro: {
      projectType: "Campanie full-CGI",
      outcome: "Patru filme de campanie full-CGI și o serie de still-uri de campanie.",
      note: "„Gator Run” prezintă un pui de aligator prin patru filme de campanie full-CGI și o serie de still-uri, produse prin Frame23 Studio.",
      role: "Pre-vizualizare alături de Andrei Brovcenco, comunicarea cu echipa, pregătirea livrabilelor pentru agenție și suport punctual de retuș.",
      discipline: "Previz / Coordonare / Livrare / Retuș",
      work: ["Pre-vizualizare alături de Andrei Brovcenco", "Comunicare cu echipa de producție", "Pregătirea versiunilor și livrabilelor pentru agenție", "Retuș punctual în Photoshop"],
      credits: [
        ["Client", [{ name: "New Balance" }]],
        ["Agenție de creație", [{ name: "Red Buoy" }]],
        ["Regizor / Fotograf", [{ name: "Tom Emmerson" }]],
        ["Companie de producție", [{ name: "Business Club" }]],
        ["VFX / Full CGI", [{ name: "Frame23 Studio" }]],
        ["Modelare 3D & texturare", [
          { name: "Anastasia Bîdiliță", handle: "@anastasia.bidilita", href: "https://www.instagram.com/anastasia.bidilita/" },
          { name: "Mădălin Teletin", handle: "@teletinmadalin", href: "https://www.instagram.com/teletinmadalin/" },
          { name: "Salo Bohuslav" },
        ]],
        ["Animație 3D", [
          { name: "Călin Ivașcu" },
          { name: "Filip Rădulescu", handle: "@filipu", href: "https://www.instagram.com/filipu/" },
          { name: "Ramzan Mulani" },
        ]],
        ["Direcție tehnică", [
          { name: "Cristian Afteni", handle: "@cristi_rdi", href: "https://www.instagram.com/cristi_rdi/" },
          { name: "Ciprian Dumitru", handle: "@cipry16", href: "https://www.instagram.com/cipry16/" },
          { name: "Robert Anghel", handle: "@anghel.w", href: "https://www.instagram.com/anghel.w/" },
        ]],
        ["Rigging personaje", [
          { name: "Alexandru Gonța", handle: "@aiex_gz", href: "https://www.instagram.com/aiex_gz/" },
        ]],
        ["Compositing", [
          { name: "Laura Maria Mihăilă", handle: "@l.a.u.r.a.m.m", href: "https://www.instagram.com/l.a.u.r.a.m.m/" },
          { name: "Marius Iftimie" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["Supervizare VFX & animație 3D", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
        ]],
        ["Producători VFX", [
          { name: "Andrei Brovcenco", handle: "@tractoraptor", href: "https://www.instagram.com/tractoraptor/" },
          { name: "Raluca Platon", handle: "@ralucaaaaip", href: "https://www.instagram.com/ralucaaaaip/" },
          { name: "Cosmin Moldovan", handle: "@cosm_o_gram", href: "https://www.instagram.com/cosm_o_gram/" },
        ]],
        ["Producător executiv", [
          { name: "Erfan Saadati" },
        ]],
      ],
    },
  },
  {
    id: "kaufland",
    title: "Kaufland — AI Film",
    classification: "COMMERCIAL",
    year: "2026",
    studio: "FrameBreed Studio",
    image: "/projects/kaufland/kaufland-poster.jpg",
    logo: "/projects/kaufland/kaufland-logo.png",
    tileLogo: "/projects/kaufland/kaufland-logo-white.png",
    media: [
      { type: "video", src: "/projects/kaufland/kaufland-film.mp4", poster: "/projects/kaufland/kaufland-poster.jpg" },
    ],
    en: {
      projectType: "AI-assisted campaign film",
      outcome: "A 90-second master film generated, composited and graded for final delivery.",
      note: "A 90-second AI film built scene by scene from designed keyframes, then generated, composited and graded into one continuous edit through FrameBreed Studio.",
      role: "Keyframe creation and video generation together with Andrei Brovcenco, who developed the story, script and creative direction.",
      discipline: "Keyframes / AI video generation",
      work: ["Keyframe creation together with Andrei Brovcenco", "AI-assisted video generation", "Visual development support based on the approved story and script"],
      credits: [
        ["Client", [{ name: "Kaufland Romania" }]],
        ["Agency", [{ name: "Saga Film" }]],
        ["FrameBreed Studio", "VFX / AI production"],
        ["Andrei Brovcenco", "Story / Script / Creative Direction / Keyframe and generation collaboration"],
        ["Robert Anghel", "Keyframes / AI video generation"],
      ],
    },
    ro: {
      projectType: "Film de campanie asistat de AI",
      outcome: "Un master de 90 de secunde generat, compozitat și gradat pentru livrarea finală.",
      note: "Un film AI de 90 de secunde construit scenă cu scenă din keyframe-uri, apoi generat, compozitat și gradat într-un montaj continuu prin FrameBreed Studio.",
      role: "Creare de keyframe-uri și generare video împreună cu Andrei Brovcenco, care a dezvoltat povestea, scenariul și direcția creativă.",
      discipline: "Keyframes / Generare video AI",
      work: ["Creare de keyframe-uri împreună cu Andrei Brovcenco", "Generare video asistată de AI", "Suport de dezvoltare vizuală pe baza poveștii și scenariului aprobate"],
      credits: [
        ["Client", [{ name: "Kaufland Romania" }]],
        ["Agenție", [{ name: "Saga Film" }]],
        ["FrameBreed Studio", "VFX / Producție AI"],
        ["Andrei Brovcenco", "Poveste / Scenariu / Direcție creativă / Colaborare la keyframe-uri și generare"],
        ["Robert Anghel", "Keyframe-uri / Generare video AI"],
      ],
    },
  },
];

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
  { company: { en: "FrameBreed Studio", ro: "FrameBreed Studio" }, years: { en: "Nov 2025 — Present", ro: "nov. 2025 — Prezent" }, role: { en: "Technical Director", ro: "Director tehnic" }, engagement: { en: "Independent contractor", ro: "Colaborator independent" }, href: "#framebreed-studio", logo: "/identity/framebreed-logo-timeline.png" },
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
    heroRole: "Creative Technical Director",
    heroCapabilities: "3D · VFX · AI · Creative Technology",
    heroWork: "Creative Work",
    scrollPrompt: "Scroll to explore",
    heroBriefLabel: "Profile / Capabilities",
    heroBrief: "Technical Director working across 3D, VFX and AI-assisted production, with hands-on experience in editing, graphics and retouching, and direct coordination between creative teams, clients and agencies.",
    experienceEyebrow: "Experience",
    experienceTitle: <>Work<br />timeline.</>,
    roadmapLabel: "Career roadmap / Latest first",
    roadmapHint: "Select a role to open the full section",
    framebreedEyebrow: "Mar 2024 — Present",
    framebreedSummary: [
      "Technical Director with a background in 3D production, coordinating teams, clients and agencies while supporting estimates, deliverables, editing, graphics, AI workflows, 3D and on-set VFX supervision.",
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
    cvLead: "A concise one-page overview of my experience, tools and technical production background.",
    cvPreview: "Preview Robert Anghel resume",
    cvOpen: "Open PDF",
    cvDownload: "Download PDF",
    cvFileName: "Robert_Anghel_Resume.pdf",
    contactEyebrow: "Contact",
    contactTitle: <>Let&apos;s<br />connect.</>,
    contactLead: "Available for selected long-term remote collaborations.",
    availabilityMeta: "Contract · Retainer · Remote",
    contactLabels: ["Name", "Based", "Phone", "Languages", "LinkedIn"],
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
    heroRole: "Director tehnic creativ",
    heroCapabilities: "3D · VFX · AI · Tehnologie creativă",
    heroWork: "Creative Work",
    scrollPrompt: "Derulează pentru a explora",
    heroBriefLabel: "Profil / Competențe",
    heroBrief: "Director tehnic activ în 3D, VFX și producție asistată de AI, cu experiență hands-on în editare, grafică și retuș, precum și coordonare directă între echipe creative, clienți și agenții.",
    experienceEyebrow: "Experiență",
    experienceTitle: <>Cronologie<br />profesională.</>,
    roadmapLabel: "Parcurs profesional / Cel mai recent primul",
    roadmapHint: "Selectează un rol pentru secțiunea completă",
    framebreedEyebrow: "mart. 2024 — Prezent",
    framebreedSummary: [
      "Director tehnic cu experiență în producție 3D, coordonând echipe, clienți și agenții și contribuind la estimări, livrabile, editare, grafică, fluxuri AI, 3D și supervizare VFX pe platou.",
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
    cvLead: "O prezentare concisă, de o pagină, a experienței, instrumentelor și pregătirii mele tehnice.",
    cvPreview: "Previzualizare CV Robert Anghel",
    cvOpen: "Deschide PDF",
    cvDownload: "Descarcă PDF",
    cvFileName: "Robert_Anghel_CV.pdf",
    contactEyebrow: "Contact",
    contactTitle: <>Hai să<br />discutăm.</>,
    contactLead: "Disponibil pentru colaborări remote selectate, pe termen lung.",
    availabilityMeta: "Contract · Retainer · Remote",
    contactLabels: ["Nume", "Locație", "Telefon", "Limbi", "LinkedIn"],
    based: "București, România",
    languages: "Română / Engleză",
    backTop: "Înapoi sus ↑",
  },
} as const;

function ProjectPreviewVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <video ref={videoRef} loop muted playsInline preload="none" poster={poster} aria-label={label}>
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeProjectMediaIndex, setActiveProjectMediaIndex] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeSpetaImage, setActiveSpetaImage] = useState<number | null>(null);
  const [selectedSpetaPreview, setSelectedSpetaPreview] = useState(0);
  const carouselResumeTimers = useRef(new Map<HTMLElement, number>());
  const projectDetailRef = useRef<HTMLElement>(null);
  const t = copy[language];
  const activeProject = framebreedProjects.find((project) => project.id === activeProjectId) ?? null;
  const activeProjectIndex = framebreedProjects.findIndex((project) => project.id === activeProjectId);
  const spetaLabels = [t.spetaAlt, ...t.spetaGallery];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("robert-portfolio-language");
    if (savedLanguage === "ro") setLanguage("ro");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => () => {
    carouselResumeTimers.current.forEach((timer) => window.clearTimeout(timer));
    carouselResumeTimers.current.clear();
  }, []);

  useEffect(() => {
    projectDetailRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [activeProjectId]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const desktopQuery = window.matchMedia("(min-width: 701px)");
    const closeMenu = () => setMobileMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
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
    window.localStorage.setItem("robert-portfolio-language", nextLanguage);
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
          <img src="/brand/vh_mark_ink.svg" alt="" width={36} height={36} />
        </a>
        <div className="headerActions">
          <nav aria-label={t.navLabel}>
            <a className="workNav" href="#experience">{t.nav[0]}</a>
            <a className="contactNav" href="#contact">{t.nav[1]}</a>
          </nav>
          <div className="languageSwitch" role="group" aria-label={t.languageLabel}>
            <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} aria-label={t.languageNames.en} title={t.languageNames.en} onClick={() => changeLanguage("en")}><span aria-hidden="true">🇬🇧</span><small>EN</small></button>
            <button type="button" className={language === "ro" ? "active" : ""} aria-pressed={language === "ro"} aria-label={t.languageNames.ro} title={t.languageNames.ro} onClick={() => changeLanguage("ro")}><span aria-hidden="true">🇷🇴</span><small>RO</small></button>
          </div>
        </div>
        <button className={`mobileMenuToggle${mobileMenuOpen ? " isOpen" : ""}`} type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen} onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        {mobileMenuOpen && (
          <div className="mobileMenu" id="mobile-menu">
            <nav aria-label={t.navLabel}>
              <a className="workNav" href="#experience" onClick={() => setMobileMenuOpen(false)}>{t.nav[0]}</a>
              <a className="contactNav" href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.nav[1]}</a>
            </nav>
            <div className="languageSwitch" role="group" aria-label={t.languageLabel}>
              <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} aria-label={t.languageNames.en} onClick={() => { changeLanguage("en"); setMobileMenuOpen(false); }}><span aria-hidden="true">🇬🇧</span><small>EN</small></button>
              <button type="button" className={language === "ro" ? "active" : ""} aria-pressed={language === "ro"} aria-label={t.languageNames.ro} onClick={() => { changeLanguage("ro"); setMobileMenuOpen(false); }}><span aria-hidden="true">🇷🇴</span><small>RO</small></button>
            </div>
          </div>
        )}
      </header>

      <main id="main" tabIndex={-1}>
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

        <section className="heroBrief" id="intro" aria-label={t.heroBriefLabel}>
          <p className="eyebrow">{t.heroBriefLabel}</p><p>{t.heroBrief}</p>
        </section>

        <section className="experienceIndex" id="experience" aria-labelledby="experience-title">
          <header className="experienceHeader">
            <div className="experienceHeading"><p className="eyebrow">{t.experienceEyebrow}</p><h2 id="experience-title">{t.experienceTitle}</h2></div>
            <div className="experienceGuide"><span>{t.roadmapLabel}</span><p>{t.roadmapHint}</p></div>
          </header>
          <div className="chapterList">
            {chapters.map((chapter) => (
              <a href={chapter.href} className="chapterRow" key={chapter.href} aria-label={`${chapter.company[language]} — ${chapter.role[language]}`}>
                <span className="roadmapNode" aria-hidden="true" />
                <span className="chapterIdentity"><span className="chapterLogo"><img src={chapter.logo} alt={chapter.company[language]} /></span></span>
                <span className="chapterWork"><strong>{chapter.role[language]}</strong><small>{chapter.engagement[language]}</small></span>
                <span className="chapterYears">{chapter.years[language]}</span><span className="chapterArrow" aria-hidden="true">↘</span>
              </a>
            ))}
          </div>
        </section>

        <section className="careerChapter framebreedChapter" id="framebreed-studio" aria-label="FrameBreed Studio">
          <header className="careerHeader">
            <div><span className="careerLogo brandLogoHero"><img src="/identity/framebreed-logo.png" alt="FrameBreed Studio" /></span><p className="eyebrow">{t.framebreedEyebrow}</p></div>
            <div className="careerSummary">
              {t.framebreedSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ol className="framebreedRoleRoadmap" aria-label={t.roleProgressionLabel}>
                <li><span className="roleRoadmapNode" aria-hidden="true" /><time>Mar 2024 — Nov 2025</time><strong>3D Generalist</strong><small>{t.framebreedContract}</small></li>
                <li className="isCurrent"><span className="roleRoadmapNode" aria-hidden="true" /><time>Nov 2025 — {t.present}</time><strong>{language === "en" ? "Technical Director" : "Director tehnic"}</strong><small>{t.currentPosition} / {t.framebreedContract}</small></li>
              </ol>
            </div>
          </header>
          <div className="projectLoop" id="selected-work" aria-label={t.selectedProjects} onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
            <div className="projectLoopTrack">
              {[0, 1].map((copyIndex) => (
                <div className="projectLoopGroup" aria-hidden={copyIndex === 1} key={copyIndex}>
                  {framebreedProjects.map((project) => {
                    const projectCopy = project[language];
                    const tileLogo = "tileLogo" in project ? project.tileLogo : project.logo;
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
                        <img className="projectLoopPreview" src={project.image} alt="" />
                        <span className="projectLoopTint" aria-hidden="true" />
                        <span className="projectLoopLogo"><img src={tileLogo} alt={copyIndex === 0 ? project.title : ""} /></span>
                        <span className="projectLoopMeta">
                          <small>{project.classification} · {projectCopy.discipline}</small>
                          <strong>{t.seeProject}<span aria-hidden="true">↗</span></strong>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="projectDirectoryToggleRow">
            <span>{framebreedProjects.length.toString().padStart(2, "0")} / {t.selectedProjects}</span>
            <button type="button" aria-expanded={showAllProjects} aria-controls="framebreed-project-directory" onClick={() => setShowAllProjects((isOpen) => !isOpen)}>
              {showAllProjects ? t.hideAllProjects : t.seeAllProjects}<span aria-hidden="true">{showAllProjects ? "−" : "+"}</span>
            </button>
          </div>
          {showAllProjects && (
            <section className="projectDirectory" id="framebreed-project-directory" aria-labelledby="project-directory-title">
              <header><p className="eyebrow">{t.selectedProjects}</p><h3 id="project-directory-title">{t.allProjectsTitle}</h3></header>
              <div className="projectDirectoryGrid">
                {framebreedProjects.map((project) => {
                  const projectCopy = project[language];
                  const tileLogo = "tileLogo" in project ? project.tileLogo : project.logo;
                  return (
                    <button className="projectLoopCard projectGridCard" data-project={project.id} type="button" onClick={() => setActiveProjectId(project.id)} key={`grid-${project.id}`} aria-label={`${t.seeProject}: ${project.title}`}>
                      <img className="projectLoopPreview" src={project.image} alt="" />
                      <span className="projectLoopTint" aria-hidden="true" />
                      <span className="projectLoopLogo"><img src={tileLogo} alt={project.title} /></span>
                      <span className="projectLoopMeta"><small>{project.classification} · {projectCopy.discipline}</small><strong>{project.title}<span aria-hidden="true">↗</span></strong></span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </section>

        {activeProject && (() => {
          const projectCopy = activeProject[language];
          const previousProject = framebreedProjects[(activeProjectIndex - 1 + framebreedProjects.length) % framebreedProjects.length];
          const nextProject = framebreedProjects[(activeProjectIndex + 1) % framebreedProjects.length];
          return (
            <div className="projectDetailLayer" onMouseDown={() => { setActiveProjectMediaIndex(null); setActiveProjectId(null); }}>
              <article ref={projectDetailRef} className="projectDetail" data-project={activeProject.id} role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onMouseDown={(event) => event.stopPropagation()}>
                <header className="projectDetailHeader">
                  <span>{t.selectedProjects} / {activeProject.title}</span>
                  <button className="projectCloseButton" type="button" autoFocus onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(null); }} aria-label={t.closeProject}>{t.closeProject} <span aria-hidden="true">×</span></button>
                </header>
                <div className="projectDetailIntro">
                  <div className="projectDetailIdentity">
                    <span className="projectDetailLogo"><img src={activeProject.logo} alt={`${activeProject.title} logo`} /></span>
                    <p className="eyebrow">{projectCopy.discipline}</p>
                    <h2 id="project-detail-title">{activeProject.title}</h2>
                  </div>
                  <div className="projectDetailContext">
                    <dl className="projectQuickFacts">
                      <div><dt>{t.projectType}</dt><dd>{activeProject.classification} / {projectCopy.projectType}</dd></div>
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
                    <ul>{projectCopy.work.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <aside className="projectOutcome"><span>{t.projectOutcome}</span><p>{projectCopy.outcome}</p></aside>
                </section>
                <section className="projectMedia" aria-label={t.projectMedia}>
                  {activeProject.media.map((item, index) => (
                    <figure key={`${item.src}-${index}`}>
                      <button className="projectMediaPreview" type="button" onClick={() => setActiveProjectMediaIndex(index)} aria-label={`${t.openMedia}: ${activeProject.title} ${index + 1}`}>
                        {item.type === "video" ? (
                          <ProjectPreviewVideo src={item.src} poster={"poster" in item ? item.poster : undefined} label={`${activeProject.title} ${t.motionPreview} ${index + 1}`} />
                        ) : <img src={item.src} alt={`${activeProject.title} ${t.projectStill} ${index + 1}`} loading="lazy" decoding="async" />}
                        <span className="projectMediaHint" aria-hidden="true">{t.openMedia} ↗</span>
                      </button>
                      <figcaption><span>{item.type === "video" ? t.motionPreview : t.imagePreview}</span><span>0{index + 1}</span></figcaption>
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
                                  <a href={person.href} target="_blank" rel="noreferrer"><span>{person.name}</span>{"handle" in person && <small>{person.handle} ↗</small>}</a>
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
                  <button type="button" onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(previousProject.id); }}><span>← {t.previousProject}</span><strong>{previousProject.title}</strong></button>
                  <button type="button" onClick={() => { setActiveProjectMediaIndex(null); setActiveProjectId(nextProject.id); }}><span>{t.nextProject} →</span><strong>{nextProject.title}</strong></button>
                </nav>
              </article>
            </div>
          );
        })()}

        {activeProject && activeProjectMediaIndex !== null && (() => {
          const media = activeProject.media[activeProjectMediaIndex];
          return (
            <div className="projectMediaLightboxLayer" onMouseDown={() => setActiveProjectMediaIndex(null)}>
              <article className="projectMediaLightbox" role="dialog" aria-modal="true" aria-labelledby="project-media-lightbox-title" onMouseDown={(event) => event.stopPropagation()}>
                <header><span id="project-media-lightbox-title">{activeProject.title} / 0{activeProjectMediaIndex + 1}</span><button type="button" autoFocus onClick={() => setActiveProjectMediaIndex(null)} aria-label={t.closeMedia}>{t.closeMedia} <span aria-hidden="true">×</span></button></header>
                <div>
                  {media.type === "video" ? (
                    <video key={media.src} controls autoPlay muted playsInline poster={"poster" in media ? media.poster : undefined}>
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : <img src={media.src} alt={`${activeProject.title} ${t.projectStill} ${activeProjectMediaIndex + 1}`} />}
                </div>
              </article>
            </div>
          );
        })()}

        {activeSpetaImage !== null && (() => {
          const imageLabel = activeSpetaImage === 0 ? t.spetaAlt : t.spetaGallery[activeSpetaImage - 1];
          return (
            <div className="spetaLightboxLayer" onMouseDown={() => setActiveSpetaImage(null)}>
              <article className="spetaLightbox" role="dialog" aria-modal="true" aria-labelledby="speta-lightbox-title" onMouseDown={(event) => event.stopPropagation()}>
                <header className="spetaLightboxHeader">
                  <span>SPETA / 0{activeSpetaImage + 1} — 0{spetaImages.length}</span>
                  <button type="button" autoFocus onClick={() => setActiveSpetaImage(null)} aria-label={t.closeImage}>{t.closeImage} <span aria-hidden="true">×</span></button>
                </header>
                <div className="spetaLightboxMedia"><img src={spetaImages[activeSpetaImage]} alt={imageLabel} /></div>
                <div className="spetaLightboxControls">
                  <button type="button" onClick={() => setActiveSpetaImage((activeSpetaImage - 1 + spetaImages.length) % spetaImages.length)} aria-label={t.previousImage}><span aria-hidden="true">←</span> {t.previousImage}</button>
                  <strong id="speta-lightbox-title">{imageLabel}</strong>
                  <button type="button" onClick={() => setActiveSpetaImage((activeSpetaImage + 1) % spetaImages.length)} aria-label={t.nextImage}>{t.nextImage} <span aria-hidden="true">→</span></button>
                </div>
              </article>
            </div>
          );
        })()}

        <section className="careerChapter veliuminChapter" id="veliumin" aria-label="VELIUMIN">
          <header className="careerHeader inverse">
            <div><span className="careerLogo careerLogoWide veliuminLogoHero"><img src="/identity/veliumin-logo.svg" alt="VELIUMIN" /></span><p className="eyebrow">{t.veliuminEyebrow}</p></div>
            <div className="careerSummary">
              {t.veliuminSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <dl className="roleProgression light"><div><dt>{t.role}</dt><dd>{t.veliuminRole}</dd></div></dl>
            </div>
          </header>
          <div className="veliuminShowcase" aria-label={t.veliuminShowcaseLabel}>
            <header className="veliuminShowcaseHeader"><span>{t.veliuminShowcaseTitle}</span><span>2023 — 2025</span></header>
            <div className="veliuminArchiveViewport" onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
              <div className="veliuminArchiveTrack">
                {[0, 1].map((groupIndex) => (
                  <div className="veliuminArchiveGroup" aria-hidden={groupIndex === 1} key={groupIndex}>
                    {veliuminArchive.map((item) => (
                      <figure className="veliuminArchiveCard" data-format={item.format} key={`${groupIndex}-${item.id}`}>
                        <img src={item.image} alt={groupIndex === 0 ? `${item.title[language]} — ${item.scope[language]}` : ""} loading={groupIndex === 0 ? "eager" : "lazy"} decoding="async" />
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="careerChapter trandingChapter" id="tranding-social-media" aria-label="Tranding Social Media">
          <header className="careerHeader compact">
            <div><span className="careerLogo brandLogoHero"><img src="/identity/tranding-logo.png" alt="Tranding Social Media" /></span><p className="eyebrow">{t.trandingEyebrow}</p></div>
            <div className="careerSummary"><p>{t.trandingSummary}</p><dl className="roleProgression"><div><dt>{t.role}</dt><dd>{t.trandingRole}</dd></div><div><dt>{t.contract}</dt><dd>{t.trandingContract}</dd></div><div><dt>{t.formats}</dt><dd>Product vis / CGI reels / 3D / VFX</dd></div></dl></div>
          </header>
          <div className="trandingShowcase" aria-label={t.trandingMediaLabel} onPointerDown={pauseCarousel} onPointerUp={resumeCarousel} onPointerCancel={resumeCarousel} onPointerLeave={resumeCarousel}>
            <div className="trandingProjectTrack">
              {[0, 1].map((groupIndex) => (
                <div className="trandingProjectGroup" aria-hidden={groupIndex === 1} key={groupIndex}>
                  {trandingProjects.map((project) => (
                    <a className="trandingProjectCard" data-format={project.format} href={project.href} target="_blank" rel="noreferrer" key={`${groupIndex}-${project.id}`} tabIndex={groupIndex === 1 ? -1 : undefined}>
                      <img src={project.image} alt={groupIndex === 0 ? `${project.title[language]} — ${project.scope[language]}` : ""} />
                      <span className="trandingProjectMeta"><small>{project.scope[language]}</small><strong>{project.title[language]}</strong><em>{t.sourceProject} ↗</em></span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sideProjectsSection" id="side-projects" aria-labelledby="side-projects-title">
          <header className="sideProjectsHeader"><p className="eyebrow">{t.sideEyebrow}</p><h2 id="side-projects-title">{t.sideTitle}</h2><p>{t.sideIntro}</p></header>
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
              <a className="externalProjectLink" href="https://www.speta.io/" target="_blank" rel="noreferrer">{t.visitSpeta} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
          <section className="spetaShowcase" aria-label={t.spetaWalkthrough}>
            <header className="spetaShowcaseHeader"><p className="eyebrow">{t.spetaWalkthrough}</p><span>0{selectedSpetaPreview + 1} / 0{spetaImages.length}</span></header>
            <figure className="spetaShowcaseStage">
              <div className="spetaWindowBar" aria-hidden="true"><span><i></i><i></i><i></i></span><strong>speta.io</strong><small>PRODUCT / BETA</small></div>
              <button className="spetaImageButton" type="button" onClick={() => setActiveSpetaImage(selectedSpetaPreview)} aria-label={`${t.openImage}: ${spetaLabels[selectedSpetaPreview]}`}>
                <img src={spetaImages[selectedSpetaPreview]} alt={spetaLabels[selectedSpetaPreview]} />
                <span className="spetaExpandHint" aria-hidden="true">{t.openImage} ↗</span>
              </button>
              <figcaption><strong>{spetaLabels[selectedSpetaPreview]}</strong><span>SPETA / 0{selectedSpetaPreview + 1}</span></figcaption>
            </figure>
            <div className="spetaThumbnailRail" aria-label={t.spetaWalkthrough}>
              {spetaImages.map((image, index) => (
                <button className={selectedSpetaPreview === index ? "isActive" : undefined} type="button" aria-pressed={selectedSpetaPreview === index} onClick={() => setSelectedSpetaPreview(index)} key={image}>
                  <span>0{index + 1}</span><img src={image} alt="" /><strong>{spetaLabels[index]}</strong>
                </button>
              ))}
            </div>
          </section>
          <section className="sideSkillsBlock" aria-labelledby="side-skills-title">
            <header><p className="eyebrow">{t.skillsEyebrow}</p><h3 id="side-skills-title">{t.skillsTitle}</h3></header>
            <div className="skillGroups">
              {t.skillGroups.map(([group, capabilities, tools], index) => (
                <details className="skillGroup" key={group}>
                  <summary>
                    <span className="skillIndex">0{index + 1}</span>
                    <div><h4>{group}</h4><ul className="skillCapabilities">{capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>
                    <small>{t.skillsExpand}</small><i aria-hidden="true">+</i>
                  </summary>
                  <div className="skillTools"><p>{t.skillsTools}</p><ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
                </details>
              ))}
            </div>
          </section>
        </section>

        <section className="cvSection" id="cv" aria-labelledby="cv-title">
          <header className="cvHeader">
            <div><p className="eyebrow">{t.cvEyebrow}</p><h2 id="cv-title">{t.cvTitle}</h2></div>
            <div className="cvIntro">
              <p>{t.cvLead}</p>
              <div className="cvActions">
                <a href="/cv/robert-anghel-cv.pdf" target="_blank" rel="noreferrer">{t.cvOpen} <span aria-hidden="true">↗</span></a>
                <a href="/cv/robert-anghel-cv.pdf" download={t.cvFileName}>{t.cvDownload} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </header>
          <div className="cvPreview">
            <object data="/cv/robert-anghel-cv.pdf#view=FitH&toolbar=0" type="application/pdf" aria-label={t.cvPreview}>
              <p><a href="/cv/robert-anghel-cv.pdf" target="_blank" rel="noreferrer">{t.cvOpen}</a></p>
            </object>
          </div>
        </section>

        <section className="contactSection" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">{t.contactEyebrow}</p><h2 id="contact-title">{t.contactTitle}</h2>
          <div className="contactAvailability"><p className="contactLead">{t.contactLead}</p><span>{t.availabilityMeta}</span></div>
          <a className="contactEmail" href="mailto:anghel@vellumhaus.studio"><span>anghel@vellumhaus.studio</span><span aria-hidden="true">↗</span></a>
          <div className="contactGrid"><div><span>{t.contactLabels[0]}</span><strong>Robert Anghel</strong></div><div><span>{t.contactLabels[1]}</span><strong>{t.based}</strong></div><div><span>{t.contactLabels[2]}</span><a href="tel:+40722905095">+40 722 905 095</a></div><div><span>{t.contactLabels[3]}</span><strong>{t.languages}</strong></div><div><span>{t.contactLabels[4]}</span><a href="https://www.linkedin.com/in/robert-anghel18/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
          <div className="contactMark" aria-hidden="true"><img src="/brand/vh_mark_paper.svg" alt="" /></div>
        </section>
      </main>

      <footer><span>Robert Anghel / Vellumhaus© 2026</span><a href="#top">{t.backTop}</a></footer>
    </>
  );
}
