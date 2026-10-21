import { ArrowLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import "./legal.css";

const content = {
  en: {
    back: "Back to portfolio", label: "Veliumin SRL · Legal", title: "Terms & copyright.",
    intro: "A few simple rules for viewing, sharing and using the work in this portfolio.",
    updated: "Updated 21 October 2026", onPage: "On this page", contact: "Questions about usage or credits?",
    email: "Contact Veliumin", footer: "Selected work by Robert Anghel. Creative services through Veliumin SRL.",
    sections: [
      { id: "about", title: "About this website", paragraphs: ["This is the professional portfolio of Robert Anghel, who operates through Veliumin SRL, Romania. It presents selected work, contributions and experience. Company identification: CUI 49709618 · Trade Register J2024000739135. Contact: hello@veliumin.com.", "The website is for information and portfolio presentation. It does not offer online checkout. The scope, fees and usage rights for commissioned work are agreed separately in writing."] },
      { id: "rights", title: "Copyright & ownership", paragraphs: ["Original website content is protected by copyright where applicable. Rights may belong to Robert Anghel, Veliumin SRL or the relevant rights holders, according to the work and the agreements that apply.", "Campaigns, films, photography, music, logos and trademarks shown here may belong to clients, studios, agencies or other contributors. Project credits describe Robert’s contribution; inclusion does not imply sole authorship, ownership, endorsement or a direct client relationship."] },
      { id: "usage", title: "Viewing & sharing", paragraphs: ["You may browse the portfolio, share links to its public pages and download the CVs for recruitment or professional evaluation.", "Reusing, modifying, republishing, selling or commercially distributing project media or brand assets requires permission from the relevant rights holder, unless permitted by law. Access to the website does not itself grant a licence to the displayed work."] },
      { id: "credits", title: "Credits & corrections", paragraphs: ["The portfolio aims to describe each collaboration accurately. If you own rights to displayed material, or believe a credit or description needs correcting, email hello@veliumin.com with the project name, relevant link and details. The request will be reviewed and the material corrected or removed where appropriate."] },
      { id: "links", title: "External links & contact", paragraphs: ["Links to studios, brands and social platforms lead to independent websites governed by their own terms and privacy policies. Contacting an email address or telephone number opens your chosen application. This portfolio does not collect enquiry-form submissions or process payments."] },
      { id: "terms", title: "Scope of these terms", paragraphs: ["These terms concern use of this website. They do not replace signed project agreements or limit rights that cannot lawfully be excluded. Romanian law applies where applicable, without restricting mandatory legal protections. Changes to these terms will be reflected in the update date above."] },
    ],
  },
  ro: {
    back: "Înapoi la portofoliu", label: "Veliumin SRL · Informații legale", title: "Termeni și drepturi de autor.",
    intro: "Câteva reguli simple pentru vizualizarea, distribuirea și utilizarea lucrărilor din acest portofoliu.",
    updated: "Actualizat la 21 octombrie 2026", onPage: "Pe această pagină", contact: "Întrebări despre utilizare sau credite?",
    email: "Contactează Veliumin", footer: "Proiecte selectate de Robert Anghel. Servicii creative prin Veliumin SRL.",
    sections: [
      { id: "about", title: "Despre acest site", paragraphs: ["Acesta este portofoliul profesional al lui Robert Anghel, care își desfășoară activitatea prin Veliumin SRL, România. Prezintă proiecte selectate, contribuții și experiență. Date de identificare: CUI 49709618 · Registrul Comerțului J2024000739135. Contact: hello@veliumin.com.", "Site-ul are scop informativ și de prezentare. Nu permite comenzi sau plăți online. Obiectul, tarifele și drepturile de utilizare pentru proiectele contractate se stabilesc separat, în scris."] },
      { id: "rights", title: "Drepturi de autor și titulari", paragraphs: ["Conținutul original al site-ului este protejat prin drepturi de autor, acolo unde legea prevede această protecție. Drepturile pot aparține lui Robert Anghel, Veliumin SRL sau titularilor relevanți, în funcție de lucrare și de acordurile aplicabile.", "Campaniile, filmele, fotografiile, muzica, logo-urile și mărcile prezentate pot aparține clienților, studiourilor, agențiilor sau altor colaboratori. Creditele descriu contribuția lui Robert; includerea unui proiect nu presupune autorat exclusiv, proprietate, recomandare sau o relație directă cu brandul."] },
      { id: "usage", title: "Vizualizare și distribuire", paragraphs: ["Poți consulta portofoliul, distribui linkuri către paginile publice și descărca CV-urile pentru recrutare sau evaluare profesională.", "Reutilizarea, modificarea, republicarea, vânzarea sau distribuirea comercială a materialelor din proiecte ori a elementelor de brand necesită acordul titularului relevant, cu excepția utilizărilor permise de lege. Accesul la site nu acordă, în sine, o licență asupra lucrărilor prezentate."] },
      { id: "credits", title: "Credite și corecturi", paragraphs: ["Portofoliul urmărește descrierea corectă a fiecărei colaborări. Dacă deții drepturi asupra unui material sau consideri că un credit ori o descriere trebuie corectate, scrie la hello@veliumin.com, indicând proiectul, linkul și detaliile relevante. Solicitarea va fi analizată, iar materialul corectat sau eliminat, după caz."] },
      { id: "links", title: "Linkuri externe și contact", paragraphs: ["Linkurile către studiouri, branduri și platforme sociale duc la site-uri independente, cu propriii termeni și politici de confidențialitate. Contactarea unei adrese de email sau a unui număr de telefon deschide aplicația aleasă de tine. Acest portofoliu nu colectează cereri prin formulare și nu procesează plăți."] },
      { id: "terms", title: "Domeniul acestor termeni", paragraphs: ["Acești termeni privesc utilizarea site-ului. Nu înlocuiesc contractele de proiect semnate și nu limitează drepturile care nu pot fi excluse legal. Se aplică legea română, după caz, fără restrângerea protecțiilor legale obligatorii. Modificările vor fi reflectate în data actualizării de mai sus."] },
    ],
  },
};

export default function LegalPage({ language }: { language: "en" | "ro" }) {
  const t = content[language];
  return <div className="legalPage" lang={language}>
    <a className="legalSkip" href="#legal-main">{language === "en" ? "Skip to content" : "Sari la conținut"}</a>
    <header className="legalHeader"><a className="legalBack" href="/"><ArrowLeftIcon aria-hidden="true" />{t.back}</a><nav aria-label={language === "en" ? "Language" : "Limbă"}><a href="/terms" hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined}>EN</a><a href="/termeni" hrefLang="ro" lang="ro" aria-current={language === "ro" ? "page" : undefined}>RO</a></nav></header>
    <main id="legal-main">
      <div className="legalIntro"><p className="legalEyebrow" translate="no">{t.label}</p><h1>{t.title}</h1><p>{t.intro}</p><time dateTime="2026-10-21">{t.updated}</time></div>
      <div className="legalLayout"><nav className="legalContents" aria-label={t.onPage}><span>{t.onPage}</span>{t.sections.map((section, i) => <a key={section.id} href={`#${section.id}`}><small>{String(i + 1).padStart(2,"0")}</small>{section.title}</a>)}</nav>
        <article>{t.sections.map((section, i) => <section id={section.id} key={section.id} aria-labelledby={`legal-${section.id}`}><span className="legalNumber" aria-hidden="true">{String(i + 1).padStart(2,"0")}</span><div><h2 id={`legal-${section.id}`}>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div></section>)}
          <aside className="legalContact"><p>{t.contact}</p><a href="mailto:hello@veliumin.com">{t.email}<ArrowTopRightIcon aria-hidden="true" /></a></aside>
        </article>
      </div>
    </main><footer><span>© 2026 Veliumin SRL</span><p>{t.footer}</p></footer>
  </div>;
}
