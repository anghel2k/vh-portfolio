"use client";
import "./legal.css";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="legalPage"><main className="legalIntro"><p className="legalEyebrow">Robert Anghel · Portfolio</p><h1>Something didn’t load.</h1><p>Please try again, or return to the portfolio.</p><div className="legalRecovery"><button className="legalBack" type="button" onClick={reset}>Try again</button><a className="legalBack" href="/">Back to portfolio</a></div></main></div>;
}
