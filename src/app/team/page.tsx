import { TeamPage } from "@/components/TeamPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why Lotus Rise exists and the team building AI tools for foundations and nonprofits.",
  alternates: { canonical: sitePath("/team/") },
};

export default function TeamRoute() {
  return <TeamPage />;
}
