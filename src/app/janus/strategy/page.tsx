import { StrategyPage } from "@/components/StrategyPage";
import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Janus Strategy",
  description:
    "Janus Strategy is being designed to connect evidence, organizational context and human judgment in the decisions that shape what comes next.",
  path: "/janus/strategy/",
});

export default function StrategyRoute() {
  return <StrategyPage />;
}
