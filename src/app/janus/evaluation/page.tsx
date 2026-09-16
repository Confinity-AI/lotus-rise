import { EvaluationPage } from "@/components/EvaluationPage";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Janus Evaluation",
  description:
    "Keep evaluation plans, evidence, findings and reviewed reports connected in Janus Evaluation.",
  path: "/janus/evaluation/",
});

export default function EvaluationRoute() {
  return <EvaluationPage />;
}
