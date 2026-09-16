import { JanusPage } from "@/components/JanusPage";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Janus",
  description:
    "Janus is an AI-powered product suite for strategy, evaluation and reporting in the social sector.",
  path: "/janus/",
});

export default function JanusRoute() {
  return <JanusPage />;
}
