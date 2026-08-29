import { TeamPage } from "@/components/TeamPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why Lotus Rise exists, the team building its AI-powered products and the principles that guide the company.",
  alternates: { canonical: sitePath("/team/") },
};

export default function TeamRoute() {
  return <TeamPage />;
}
