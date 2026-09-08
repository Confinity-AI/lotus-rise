import { siteContent } from "@/content/site-content";
import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import type { CSSProperties } from "react";

const stages = siteContent.principles.items;
const stageImages = [
  "/lotus-rise/brand/lotus-journey-01-integrity.png",
  "/lotus-rise/brand/lotus-journey-02-innovation.png",
  "/lotus-rise/brand/lotus-journey-03-empowerment.png",
  "/lotus-rise/brand/lotus-journey-04-commitment.png",
];

export function ValuesGrowth() {
  return (
    <section className="benefit values-journey" id="principles" aria-labelledby="principles-title">
      <div className="container values-journey-inner">
        <div className="values-journey-heading reveal">
          <p className="values-journey-kicker">How we grow</p>
          <h2 id="principles-title">{siteContent.principles.title}</h2>
          <p>{siteContent.principles.body}</p>
        </div>

        <div className="values-journey-story reveal">
          <span className="values-journey-line" aria-hidden="true" />
          <ol className="values-journey-stages">
            {stages.map((stage, index) => (
              <li
                className="values-journey-stage"
                key={stage.title}
                style={{ "--stage-index": index } as CSSProperties}
              >
                <div className="values-journey-image" aria-hidden="true">
                  <Image
                    src={sitePath(stageImages[index])}
                    alt=""
                    width={512}
                    height={768}
                    sizes="(max-width: 700px) 70vw, 25vw"
                  />
                  <span className="values-journey-node" />
                </div>
                <div className="values-journey-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="values-journey-quote reveal">
          <blockquote>&ldquo;{siteContent.principles.founderQuote}&rdquo;</blockquote>
          <figcaption>{siteContent.principles.founder}</figcaption>
        </figure>
      </div>
    </section>
  );
}
