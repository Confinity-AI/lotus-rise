import Link from "next/link";

/** Scannable trust facts — each links to the section that explains it. */

const FACTS = [
  {
    value: "10:1",
    label: "Nonprofit workspaces included per funder license",
    href: "#vision",
  },
  {
    value: "$0",
    label: "For qualifying grantees when their funder licenses Lotus Rise",
    href: "#icp-nonprofit",
  },
  {
    value: "PBC",
    label: "Public benefit corporation — mission bound in our charter",
    href: "/about",
  },
] as const;

export const CredibilityStrip = () => (
  <aside className="he-cred-strip" aria-label="How Lotus Rise operates">
    <div className="he-wrap he-cred-strip__inner">
      {FACTS.map((fact) => {
        const inner = (
          <>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </>
        );

        if (fact.href.startsWith("/")) {
          return (
            <Link key={fact.value} href={fact.href} className="he-cred-strip__item">
              {inner}
            </Link>
          );
        }

        return (
          <a key={fact.value} href={fact.href} className="he-cred-strip__item">
            {inner}
          </a>
        );
      })}
    </div>
  </aside>
);
