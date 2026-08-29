import { JanusPage } from "@/components/JanusPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Janus",
  description:
    "Janus is an AI-powered product suite for strategy, evaluation and reporting in the social sector.",
  alternates: { canonical: sitePath("/janus/") },
};

export default function JanusRoute() {
  return <JanusPage />;
}
