"use client";

import { siteContent } from "@/content/site-content";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import { HiArrowsPointingOut, HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const views = siteContent.janus.views;

export function JanusTheatre() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const swipeStartRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const suppressImageClickRef = useRef(false);
  const active = views[activeIndex];

  const activate = (
    index: number,
    focus = false,
    nextDirection: "forward" | "backward" = index >= activeIndex ? "forward" : "backward",
  ) => {
    const next = (index + views.length) % views.length;
    if (next !== activeIndex) setDirection(nextDirection);
    setActiveIndex(next);
    if (focus) requestAnimationFrame(() => tabRefs.current[next]?.focus());
  };

  const startSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    suppressImageClickRef.current = true;
    const movingForward = deltaX < 0;
    activate(activeIndex + (movingForward ? 1 : -1), false, movingForward ? "forward" : "backward");
    window.setTimeout(() => {
      suppressImageClickRef.current = false;
    }, 400);
  };

  const openDialog = (button: HTMLButtonElement) => {
    openerRef.current = button;
    setDialogOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogOpen(false);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <>
      <div className="product-stage reveal">
        <div className="tablist" role="tablist" aria-label="Real Janus product views">
          {views.map((view, index) => (
            <button
              key={view.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              className="tab"
              id={`janus-tab-${index + 1}`}
              type="button"
              role="tab"
              aria-controls="janus-panel"
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => activate(index, false, index >= activeIndex ? "forward" : "backward")}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                if (event.key === "Home") return activate(0, true, "backward");
                if (event.key === "End") return activate(views.length - 1, true, "forward");
                const movingForward = event.key === "ArrowRight";
                activate(
                  index + (movingForward ? 1 : -1),
                  true,
                  movingForward ? "forward" : "backward",
                );
              }}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <b className="tab-title-full">{view.title}</b>
              <b className="tab-title-short">{view.shortTitle}</b>
            </button>
          ))}
        </div>

        <div
          className="tab-panel"
          id="janus-panel"
          role="tabpanel"
          aria-labelledby={`janus-tab-${activeIndex + 1}`}
          data-direction={direction}
          data-swipeable="true"
          onPointerDown={startSwipe}
          onPointerUp={finishSwipe}
          onPointerCancel={() => {
            swipeStartRef.current = null;
          }}
        >
          <div className="product-frame">
            <div className="product-frame-head">
              <span>
                <i /> Real Janus view
              </span>
              <button
                className="icon-button product-expand"
                type="button"
                aria-label={`Open ${active.title} full screen`}
                title="Open full screen"
                onClick={(event) => openDialog(event.currentTarget)}
              >
                <HiArrowsPointingOut aria-hidden="true" />
              </button>
            </div>
            <button
              className="product-image-button"
              type="button"
              aria-label={`Open ${active.title} full screen`}
              onClick={(event) => {
                if (suppressImageClickRef.current) {
                  event.preventDefault();
                  return;
                }
                openDialog(event.currentTarget);
              }}
            >
              <Image
                key={active.image}
                className="product-view-image"
                src={active.image}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="(max-width: 960px) calc(100vw - 32px), 760px"
                loading="eager"
              />
            </button>
          </div>

          <div className="tab-caption" aria-live="polite" aria-atomic="true">
            <span className="product-progress">
              {String(activeIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}
            </span>
            <div className="product-caption-copy" key={active.title}>
              <strong>{active.title}</strong>
              <span>{active.copy}</span>
            </div>
            <div className="product-controls" aria-label="Janus view controls">
              <button
                className="icon-button"
                type="button"
                aria-label="Previous Janus view"
                title="Previous view"
                onClick={() => activate(activeIndex - 1, false, "backward")}
              >
                <HiChevronLeft aria-hidden="true" />
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label="Next Janus view"
                title="Next view"
                onClick={() => activate(activeIndex + 1, false, "forward")}
              >
                <HiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="product-progress-line" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / views.length) * 100}%` }} />
          </div>
        </div>
        <p className="product-note">{siteContent.janus.note}</p>
      </div>

      <dialog
        className="product-dialog"
        ref={dialogRef}
        aria-labelledby="product-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onPointerDown={(event) => {
          if (event.currentTarget === event.target) closeDialog();
        }}
      >
        <div className="product-dialog-shell">
          <div className="product-dialog-head">
            <div>
              <span className="product-dialog-kicker">Janus private preview</span>
              <strong id="product-dialog-title">{active.title}</strong>
            </div>
            <button
              className="icon-button dialog-close"
              type="button"
              aria-label="Close full-screen product view"
              title="Close"
              onClick={closeDialog}
            >
              <HiXMark aria-hidden="true" />
            </button>
          </div>
          <div className="product-dialog-media">
            {dialogOpen && (
              <Image
                src={active.image}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                loading="eager"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
          <div className="product-dialog-footer">
            <p>{active.copy}</p>
            <div className="product-controls" aria-label="Full-screen Janus view controls">
              <button
                className="icon-button"
                type="button"
                aria-label="Previous Janus view"
                title="Previous view"
                onClick={() => activate(activeIndex - 1, false, "backward")}
              >
                <HiChevronLeft aria-hidden="true" />
              </button>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}
              </span>
              <button
                className="icon-button"
                type="button"
                aria-label="Next Janus view"
                title="Next view"
                onClick={() => activate(activeIndex + 1, false, "forward")}
              >
                <HiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
