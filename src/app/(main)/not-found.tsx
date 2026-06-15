import Link from "next/link";
import { SectionShell } from "@/components/home/SectionShell";

export default function NotFound() {
  return (
    <main className="lr-page lr-v4">
      <SectionShell tone="cream" id="not-found">
        <div className="lr-section-head lr-section-head--center">
          <p className="lr-eyebrow">404</p>
          <h2 className="lr-h2">We couldn&rsquo;t find that page.</h2>
          <p className="lr-body lr-lead">
            The page you are looking for may have moved or no longer exists. Let&rsquo;s get you back on track.
          </p>
        </div>
        <div className="lr-btn-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="lr-btn lr-btn--primary">
            Back to home
          </Link>
          <Link href="/products/eval-path" className="lr-btn lr-btn--ghost">
            Explore Janus
          </Link>
        </div>
      </SectionShell>
    </main>
  );
}
