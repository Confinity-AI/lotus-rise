import { EvaluationPage } from "@/components/EvaluationPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Janus Evaluation",
  description:
    "Keep evaluation plans, evidence, findings and reviewed reports connected in Janus Evaluation.",
  alternates: { canonical: sitePath("/janus/evaluation/") },
};

export default function EvaluationRoute() {
  return <EvaluationPage />;
}
