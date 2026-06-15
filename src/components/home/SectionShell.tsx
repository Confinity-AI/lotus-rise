import type { ReactNode } from "react";
import { SectionReveal } from "../SectionReveal";

export type SectionTone = "cream" | "paper" | "white" | "earth" | "indigo" | "ink";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  tone?: SectionTone;
  /** Full-bleed content without max-width column constraint */
  wide?: boolean;
  className?: string;
}

const TONE_CLASS: Record<SectionTone, string> = {
  cream: "lr-section--cream",
  paper: "lr-section--paper",
  white: "lr-section--white",
  earth: "lr-section--earth",
  indigo: "lr-section--indigo",
  ink: "lr-section--ink",
};

export const SectionShell = ({
  id,
  children,
  tone = "cream",
  wide = false,
  className = "",
}: SectionShellProps) => (
  <section id={id} className={`lr-section ${TONE_CLASS[tone]} ${className}`.trim()}>
    <div className={wide ? "lr-container lr-container--wide" : "lr-container"}>
      <SectionReveal>{children}</SectionReveal>
    </div>
  </section>
);
