import { TeamPage } from "@/components/TeamPage";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "Why Lotus Rise exists, the team building its software products and the principles that guide the company.",
  path: "/team/",
});

export default function TeamRoute() {
  return <TeamPage />;
}
