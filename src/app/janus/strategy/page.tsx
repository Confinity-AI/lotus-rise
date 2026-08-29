import { StrategyPage } from "@/components/StrategyPage";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Janus Strategy",
  description:
    "Janus Strategy is being designed to connect evidence, organizational context and human judgment in the decisions that shape what comes next.",
  alternates: { canonical: sitePath("/janus/strategy/") },
};

export default function StrategyRoute() {
  return <StrategyPage />;
}
