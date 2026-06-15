"use client";

import type React from "react";
import { useState } from "react";
import { Flex, Heading, Text, Row } from "@once-ui-system/core";
import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";

interface PipelineStep {
  title: string;
  badge: string;
  description: string;
  screen: JanusScreenId;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    title: "Collect program data",
    badge: "Step 1 — Setup",
    description:
      "Program managers capture surveys, attendance, and field notes in one structured workspace—no more scattered spreadsheets or duplicate entry.",
    screen: "collect",
  },
  {
    title: "Structure your evidence",
    badge: "Step 2 — Evidence",
    description:
      "Link observations to indicators and logic models. Every claim stays tied to the sources your team already trusts.",
    screen: "indicators",
  },
  {
    title: "Generate impact reports",
    badge: "Step 3 — Outputs",
    description:
      "Compile board-ready reports and funder updates from live data—not static PDFs that go stale the moment they are exported.",
    screen: "report",
  },
  {
    title: "Share with funders",
    badge: "Step 4 — Sharing",
    description:
      "Publish outcomes to stakeholders with clear, verifiable narratives that help program officers understand what changed and why.",
    screen: "share",
  },
];

export const ImpactPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const step = PIPELINE_STEPS[activeStep];

  return (
    <Flex direction="column" gap="40" fillWidth style={{ marginTop: "40px" }}>
      <Row
        gap="8"
        className="pipeline-steps"
        style={{
          flexWrap: "wrap",
          width: "100%",
          borderBottom: "1px solid var(--neutral-border-weak)",
          paddingBottom: "4px",
        }}
      >
        {PIPELINE_STEPS.map((s, idx) => (
          <button
            type="button"
            key={s.title}
            onClick={() => setActiveStep(idx)}
            className={`pipeline-step-btn ${idx === activeStep ? "active" : ""}`}
            style={{ flex: "1 1 140px", padding: "12px 8px", textAlign: "center" }}
          >
            <Text
              variant="label-default-xs"
              style={{
                display: "block",
                color: idx === activeStep ? "var(--accent-primary)" : "var(--neutral-text-weak)",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              0{idx + 1}
            </Text>
            <Text variant="label-default-s" style={{ fontWeight: idx === activeStep ? "600" : "400" }}>
              {s.title}
            </Text>
          </button>
        ))}
      </Row>

      <Row gap="48" style={{ flexWrap: "wrap-reverse", alignItems: "center", width: "100%" }}>
        <Flex style={{ flex: "1 1 350px" }} direction="column" gap="20">
          <Text
            variant="label-default-xs"
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-primary)",
              fontWeight: "600",
            }}
          >
            {step.badge}
          </Text>
          <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--brand-primary)" }}>
            {step.title}
          </Heading>
          <Text variant="body-default-m" style={{ lineHeight: "1.6", color: "var(--neutral-text-medium)", maxWidth: "520px" }}>
            {step.description}
          </Text>
        </Flex>

        <Flex style={{ flex: "1 1 380px" }} key={activeStep} className="kinetic-word">
          <JanusScreen screen={step.screen} variant="default" />
        </Flex>
      </Row>
    </Flex>
  );
};
