"use client";

import React, { useState } from "react";
import { Flex, Heading, Text, Button, Card } from "@once-ui-system/core";

export const ImpactCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [context, setContext] = useState<"nonprofit" | "funder" | "capacity">("nonprofit");
  const [scale, setScale] = useState(5); // Active programs, grantee count, or node networks

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(1);
    setContext("nonprofit");
    setScale(5);
  };

  // Strategic Calculations based on JTF pilot benchmarks
  const calculateMetrics = () => {
    if (context === "nonprofit") {
      const hoursSaved = scale * 4; // 4 hours saved per week per program
      const logicModels = scale * 2; // 2 logic models designed/grounded
      return {
        title1: "Weekly Hours Reclaimed",
        value1: `${hoursSaved} hrs`,
        desc1: `Hours of manual report copying and form duplication saved across your ${scale} active programs.`,
        title2: "AI-Grounded Models",
        value2: `${logicModels}`,
        desc2: "Logic models and indicators ready for board or funder review designed in an afternoon via Janus Guidance.",
        subsidyTitle: "Sovereign Node Access",
        subsidyValue: "100% Free",
        subsidyDesc: "Fully subsidized workspace funded by institutional funder seat licenses under our PBC mandate."
      };
    } else if (context === "funder") {
      const hoursSaved = scale * 12; // 12 hours saved in assessment auditing
      const logicModels = scale * 4; // 4 standardized models across grantees
      const freeWorkspaces = scale * 10; // 10:1 Universal Access Subsidy
      return {
        title1: "Review Hours Reclaimed",
        value1: `${hoursSaved} hrs/mo`,
        desc1: `Time saved auditing compliance submissions across your ${scale} portfolio grantees.`,
        title2: "Standardized Indicators",
        value2: `${logicModels} sets`,
        desc2: "Coordinated evaluation frameworks aligned directly to regional Theories of Change via Janus Strategy.",
        subsidyTitle: "Nonprofit Workspaces Funded",
        subsidyValue: `${freeWorkspaces} nodes`,
        desc3: `Under our 10:1 Universal Access Subsidy, your subscription deploys ${freeWorkspaces} fully funded workspaces to your grantee network.`,
        subsidyDesc: `Equips ${freeWorkspaces} organizations in your network with sovereign data repositories at zero cost.`
      };
    } else {
      const hoursSaved = scale * 25; // 25 hours saved across intermediaries
      const logicModels = scale * 8; // 8 strategic maps
      const freeWorkspaces = scale * 10; // 10:1 Universal Access Subsidy
      return {
        title1: "Intermediary Admin Saved",
        value1: `${hoursSaved} hrs/mo`,
        desc1: `Weekly administrative coordination time saved across your network of ${scale} regional agency hubs.`,
        title2: "Theories of Change Mapped",
        value2: `${logicModels} maps`,
        desc2: "Interactive, portfolio-wide strategic outcome frameworks actively mapped and synchronized.",
        subsidyTitle: "Sovereign Subsidies Deployed",
        subsidyValue: `${freeWorkspaces} seats`,
        subsidyDesc: `Provisions ${freeWorkspaces} fully free, unrestricted organizational workspaces to grassroots partners.`
      };
    }
  };

  const metrics = calculateMetrics();

  return (
    <Flex
      direction="column"
      className="impact-calculator-container"
      style={{
        backgroundColor: "white",
        border: "1px solid var(--neutral-border-medium)",
        borderRadius: "var(--border-radius-conservative)",
        maxWidth: "800px",
        width: "100%",
        boxShadow: "0 4px 24px rgba(26, 35, 126, 0.02)",
        position: "relative"
      }}
    >
      {/* Step Indicator */}
      <Flex direction="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <Text variant="label-default-s" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neutral-text-weak)" }}>
          Methodological Forecast — Step {step} of 3
        </Text>
        <Flex gap="8" direction="row">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: s === step ? "var(--accent-primary)" : s < step ? "var(--brand-primary)" : "var(--neutral-border-weak)",
                transition: "all 0.2s ease"
              }}
            />
          ))}
        </Flex>
      </Flex>

      {/* Step 1: Context Selection */}
      {step === 1 && (
        <Flex direction="column" gap="24">
          <Heading as="h4" variant="heading-strong-xs" style={{ margin: 0 }}>
            Select your organizational context in the impact ecosystem:
          </Heading>
          <Flex direction="column" gap="12">
            <button
              onClick={() => setContext("nonprofit")}
              style={{
                textAlign: "left",
                padding: "20px",
                borderRadius: "var(--border-radius-conservative)",
                border: context === "nonprofit" ? "2px solid var(--accent-primary)" : "1px solid var(--neutral-border-medium)",
                backgroundColor: context === "nonprofit" ? "rgba(90, 64, 255, 0.01)" : "transparent",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <Text variant="label-default-l" style={{ fontWeight: "600", display: "block", color: "var(--brand-primary)", marginBottom: "4px" }}>
                Nonprofit Program Operator
              </Text>
              <Text variant="body-default-s" color="medium">
                You coordinate local program delivery, manage compliance overhead, and draft logic models for funders.
              </Text>
            </button>

            <button
              onClick={() => setContext("funder")}
              style={{
                textAlign: "left",
                padding: "20px",
                borderRadius: "var(--border-radius-conservative)",
                border: context === "funder" ? "2px solid var(--accent-primary)" : "1px solid var(--neutral-border-medium)",
                backgroundColor: context === "funder" ? "rgba(90, 64, 255, 0.01)" : "transparent",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <Text variant="label-default-l" style={{ fontWeight: "600", display: "block", color: "var(--brand-primary)", marginBottom: "4px" }}>
                Institutional Funder / Family Office
              </Text>
              <Text variant="body-default-s" color="medium">
                You distribute grants, coordinate strategic outcomes across portfolios, and audit evidence streams.
              </Text>
            </button>

            <button
              onClick={() => setContext("capacity")}
              style={{
                textAlign: "left",
                padding: "20px",
                borderRadius: "var(--border-radius-conservative)",
                border: context === "capacity" ? "2px solid var(--accent-primary)" : "1px solid var(--neutral-border-medium)",
                backgroundColor: context === "capacity" ? "rgba(90, 64, 255, 0.01)" : "transparent",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <Text variant="label-default-l" style={{ fontWeight: "600", display: "block", color: "var(--brand-primary)", marginBottom: "4px" }}>
                Capacity Support Organization (CSO)
              </Text>
              <Text variant="body-default-s" color="medium">
                You support regional networks, local agencies, or consulting nodes looking to scale digital capabilities.
              </Text>
            </button>
          </Flex>
          <Flex style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleNextStep}>Continue</Button>
          </Flex>
        </Flex>
      )}

      {/* Step 2: Scale Metrics */}
      {step === 2 && (
        <Flex direction="column" gap="24">
          <Heading as="h4" variant="heading-strong-xs" style={{ margin: 0 }}>
            {context === "nonprofit"
              ? "How many active programs or grant outputs do you coordinate?"
              : context === "funder"
              ? "How many active grantee organizations are in your portfolio?"
              : "How many regional agency nodes do you actively support?"}
          </Heading>
          <Flex direction="column" gap="16" style={{ display: "flex", alignItems: "stretch" }}>
            <Flex direction="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text variant="body-default-m">Scale Metric:</Text>
              <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--accent-primary)" }}>
                {scale} {context === "nonprofit" ? "Programs" : context === "funder" ? "Grantees" : "Nodes"}
              </Heading>
            </Flex>
            <input
              type="range"
              min="1"
              max="100"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--accent-primary)",
                cursor: "pointer"
              }}
            />
            <Flex direction="row" style={{ display: "flex", justifyContent: "space-between", color: "var(--neutral-text-weak)" }}>
              <Text variant="label-default-s">1</Text>
              <Text variant="label-default-s">50</Text>
              <Text variant="label-default-s">100</Text>
            </Flex>
          </Flex>
          <Flex direction="row" style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleNextStep}>Calculate Outcomes</Button>
          </Flex>
        </Flex>
      )}

      {/* Step 3: Calculation Outputs */}
      {step === 3 && (
        <Flex direction="column" gap="32">
          <Flex direction="column" gap="8">
            <Heading as="h4" variant="heading-strong-xs" style={{ margin: 0 }}>
              Your Personalized Impact Capacity Forecast
            </Heading>
            <Text variant="body-default-s" color="medium">
              Grounded in active pilot data from the John Templeton Foundation.
            </Text>
          </Flex>

          <Flex direction="column" gap="16">
            <Card className="trilogy-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8", borderRadius: "var(--border-radius-conservative)" }}>
              <Text variant="label-default-s" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-primary)", fontWeight: "bold" }}>
                {metrics.title1}
              </Text>
              <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--accent-primary)" }}>
                {metrics.value1}
              </Heading>
              <Text variant="body-default-s" color="medium">
                {metrics.desc1}
              </Text>
            </Card>

            <Card className="trilogy-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8", borderRadius: "var(--border-radius-conservative)" }}>
              <Text variant="label-default-s" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-primary)", fontWeight: "bold" }}>
                {metrics.title2}
              </Text>
              <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--accent-primary)" }}>
                {metrics.value2}
              </Heading>
              <Text variant="body-default-s" color="medium">
                {metrics.desc2}
              </Text>
            </Card>

            <Card className="trilogy-card highlighted" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8", borderRadius: "var(--border-radius-conservative)" }}>
              <Text variant="label-default-s" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-primary)", fontWeight: "bold" }}>
                {metrics.subsidyTitle}
              </Text>
              <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--brand-primary)" }}>
                {metrics.subsidyValue}
              </Heading>
              <Text variant="body-default-s" color="medium">
                {metrics.subsidyDesc}
              </Text>
            </Card>
          </Flex>

          <Flex direction="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16" }}>
            <Button variant="secondary" onClick={handleReset}>Calculate Again</Button>
            <Button onClick={() => window.open("mailto:<REDACTED:EMAIL>?subject=Lotus Rise Methodological Mapping Call")}>
              Schedule Methodological Mapping Call
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
