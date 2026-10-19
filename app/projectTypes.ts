export type CreditPerson = {
  name: string;
  handle?: string;
  href?: string;
};

type ProjectCopy = {
  projectType: string;
  outcome: string;
  note: string;
  role: string;
  discipline: string;
  work: readonly string[];
  credits: readonly (readonly [string, string | readonly CreditPerson[]])[];
  creditScope?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  classification: string;
  studio: string;
  image: string;
  logo: string;
  tileLogo?: string;
  year?: string | number;
  media: readonly ({ type: "video"; src: string; poster?: string; label?: string } | { type: "image"; src: string; label?: string })[];
  en: ProjectCopy;
  ro: ProjectCopy;
};
