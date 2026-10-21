import { ArrowLeftIcon } from "@radix-ui/react-icons";
import "./legal.css";
export default function NotFound() {
  return <div className="legalPage"><main className="legalIntro"><p className="legalEyebrow">404 · Robert Anghel</p><h1>This page has moved.</h1><p>The link may be outdated. You can find the selected projects and contact details in the portfolio.</p><a className="legalBack" href="/"><ArrowLeftIcon aria-hidden="true" />Back to portfolio</a></main></div>;
}
