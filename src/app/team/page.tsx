import { TeamPage } from "@/components/TeamPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why Lotus Rise exists, the principles that guide us and the team building practical AI tools for the social sector.",
  alternates: { canonical: sitePath("/team/") },
};

export default function TeamRoute() {
  return <TeamPage />;
}
