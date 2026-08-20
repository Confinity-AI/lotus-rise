import { JanusPage } from "@/components/JanusPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Janus",
  description:
    "Janus keeps evaluation plans, evidence, findings and reports connected, with a visible trail from source to reviewed output.",
  alternates: { canonical: sitePath("/janus/") },
};

export default function JanusRoute() {
  return <JanusPage />;
}
