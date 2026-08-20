"use client";

import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fallbackRings = [
  {
    className: "lotus-fallback-outer",
    count: 12,
    offset: 0,
    path: "M260 276 C211 260 192 212 211 158 C221 130 240 101 250 88 C255 81 265 81 270 88 C280 101 299 130 309 158 C328 212 309 260 260 276 Z",
  },
  {
    className: "lotus-fallback-middle",
    count: 10,
    offset: 18,
    path: "M260 273 C219 258 207 220 222 179 C230 157 245 133 253 124 C257 119 263 119 267 124 C275 133 290 157 298 179 C313 220 301 258 260 273 Z",
  },
  {
    className: "lotus-fallback-inner",
    count: 8,
    offset: 2,
    path: "M260 270 C228 258 221 229 233 198 C240 181 249 167 252 163 C256 158 264 158 268 163 C271 167 280 181 287 198 C299 229 292 258 260 270 Z",
  },
] as const;

export function LotusBloom() {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);

  useEffect(() => {
    let active = true;
    let dispose: (() => void) | undefined;

    const mount = async () => {
      const canvas = canvasRef.current;
      const host = hostRef.current;
      if (!canvas || !host) return;

      try {
        const { createLotusBloomScene } = await import("@/lib/lotus-bloom-scene");
        if (!active) return;
        const scene = createLotusBloomScene({
          canvas,
          host,
          onReady: () => {
            if (active) setRendered(true);
          },
        });
        dispose = scene.dispose;
      } catch {
        if (active) setRendered(false);
      }
    };

    void mount();
    return () => {
      active = false;
      dispose?.();
    };
  }, []);

  return (
    <figure
      ref={hostRef}
      className={`lotus-bloom lotus-bloom-3d${rendered ? " is-rendered" : ""}${photoReady ? " has-photo" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="lotus-bloom-fallback"
        viewBox="0 0 520 520"
        role="presentation"
        focusable="false"
      >
        <ellipse className="lotus-fallback-shadow" cx="260" cy="280" rx="182" ry="168" />
        {fallbackRings.map((ring) => (
          <g className={ring.className} key={ring.className}>
            {Array.from({ length: ring.count }, (_, index) => (
              <path
                d={ring.path}
                transform={`rotate(${ring.offset + (index * 360) / ring.count} 260 260)`}
                key={`${ring.className}-${index}`}
              />
            ))}
          </g>
        ))}
        <circle className="lotus-fallback-heart" cx="260" cy="260" r="24" />
        <circle className="lotus-fallback-core" cx="260" cy="260" r="12" />
      </svg>
      <canvas className="lotus-bloom-canvas" ref={canvasRef} />
      <div className="lotus-bloom-photo" aria-hidden="true">
        <Image
          className="lotus-photo-layer lotus-photo-outer"
          src={sitePath("/lotus-rise/brand/lotus-hero-photoreal.webp")}
          alt=""
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 236px, 430px"
          fetchPriority="high"
          draggable={false}
          onLoad={() => setPhotoReady(true)}
        />
        <Image
          className="lotus-photo-layer lotus-photo-middle"
          src={sitePath("/lotus-rise/brand/lotus-hero-photoreal.webp")}
          alt=""
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 236px, 430px"
          draggable={false}
        />
        <Image
          className="lotus-photo-layer lotus-photo-inner"
          src={sitePath("/lotus-rise/brand/lotus-hero-photoreal.webp")}
          alt=""
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 236px, 430px"
          draggable={false}
        />
      </div>
    </figure>
  );
}
