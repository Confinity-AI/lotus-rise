import { TeamPage } from "@/components/TeamPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the team building Lotus Rise tools for foundations and nonprofits.",
  alternates: { canonical: sitePath("/team/") },
};

export default function TeamRoute() {
  return <TeamPage />;
}
