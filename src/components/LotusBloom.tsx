"use client";

import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { useState } from "react";

export function LotusBloom() {
  const [ready, setReady] = useState(false);

  return (
    <figure
      className={`lotus-bloom lotus-bloom-static${ready ? " is-ready" : ""}`}
      aria-hidden="true"
    >
      <Image
        className="lotus-bloom-image"
        src={sitePath("/lotus-rise/brand/lotus-hero-photoreal.webp")}
        alt=""
        width={1024}
        height={1024}
        sizes="(max-width: 640px) 236px, 430px"
        fetchPriority="high"
        draggable={false}
        onLoad={() => setReady(true)}
      />
    </figure>
  );
}
