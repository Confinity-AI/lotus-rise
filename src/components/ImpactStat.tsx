"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@once-ui-system/core";

interface ImpactStatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export const ImpactStat: React.FC<ImpactStatProps> = ({
  value,
  prefix = "",
  suffix = "",
  durationMs = 600,
}) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return (
    <Heading as="span" variant="heading-strong-m" data-impact-stat style={{ color: "var(--accent-primary)", margin: 0 }}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </Heading>
  );
};
