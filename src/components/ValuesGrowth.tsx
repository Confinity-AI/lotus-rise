"use client";

import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { useEffect, useState } from "react";

const stages = siteContent.principles.items;
const stageImages = [
  "/lotus-rise/brand/lotus-growth-01-integrity.webp",
  "/lotus-rise/brand/lotus-growth-02-innovation.webp",
  "/lotus-rise/brand/lotus-growth-03-empowerment.webp",
  "/lotus-rise/brand/lotus-growth-04-commitment.webp",
];

export function ValuesGrowth() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % stages.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="benefit values-growth" id="principles" aria-labelledby="principles-title">
      <div className="container values-growth-inner">
        <div className="values-growth-heading reveal">
          <p className="values-growth-kicker">How we grow</p>
          <h2 id="principles-title">{siteContent.principles.title}</h2>
          <p>{siteContent.principles.body}</p>
        </div>

        <div
          className="values-growth-experience reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          <div className="values-growth-visual" role="tabpanel" aria-live="polite">
            {stageImages.map((image, index) => (
              <Image
                key={image}
                className={`values-growth-frame${activeIndex === index ? " is-active" : ""}`}
                src={sitePath(image)}
                alt={activeIndex === index ? `${stages[index].title}: ${stages[index].copy}` : ""}
                width={1024}
                height={1024}
                sizes="(max-width: 760px) calc(100vw - 48px), 500px"
              />
            ))}
            <div className="values-growth-counter">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <small>of {String(stages.length).padStart(2, "0")}</small>
            </div>
          </div>

          <div className="values-growth-stages" aria-label="Lotus Rise values">
            {stages.map((stage, index) => (
              <button
                key={stage.title}
                type="button"
                aria-pressed={activeIndex === index}
                className="values-growth-stage"
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage.title}</strong>
                <small>{stage.copy}</small>
              </button>
            ))}
          </div>
        </div>

        <figure className="values-growth-quote reveal">
          <blockquote>&ldquo;{siteContent.principles.founderQuote}&rdquo;</blockquote>
          <figcaption>{siteContent.principles.founder}</figcaption>
        </figure>
      </div>
    </section>
  );
}
