"use client";

import { siteContent } from "@/content/site-content";
import { track } from "@/lib/analytics";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import { HiArrowsPointingOut, HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const views = siteContent.janus.views;

type Direction = "forward" | "backward";
type Method = "click" | "keyboard" | "swipe";

export function JanusTheatre() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("forward");
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStartRef = useRef<{
    pointerId: number;
    type: string;
    x: number;
    y: number;
    onImage: boolean;
  } | null>(null);
  const active = views[activeIndex];

  const activate = (index: number, method: Method, focus = false) => {
    const next = (index + views.length) % views.length;
    if (next === activeIndex) return;
    setDirection(index > activeIndex ? "forward" : "backward");
    setActiveIndex(next);
    track("janus_tab_change", { index: next, method });
    if (focus) requestAnimationFrame(() => tabRefs.current[next]?.focus());
  };

  // One pointer gesture handler: a horizontal touch swipe changes the view, a still
  // press on the image opens the dialog. The expand button is the only focusable opener.
  const startPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointerStartRef.current = {
      pointerId: event.pointerId,
      type: event.pointerType,
      x: event.clientX,
      y: event.clientY,
      onImage: Boolean((event.target as Element).closest(".product-image-button")),
    };
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const swiped = Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (start.type === "touch" && swiped) {
      activate(activeIndex + (deltaX < 0 ? 1 : -1), "swipe");
      return;
    }
    if (start.onImage && Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) openDialog();
  };

  const openDialog = () => {
    setDialogOpen(true);
    dialogRef.current?.showModal();
    track("janus_dialog_open", { index: activeIndex });
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogOpen(false);
    track("janus_dialog_close", { index: activeIndex });
    requestAnimationFrame(() => expandRef.current?.focus());
  };

  const progress = `${String(activeIndex + 1).padStart(2, "0")} / ${String(views.length).padStart(2, "0")}`;

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
              onClick={() => activate(index, "click")}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                if (event.key === "Home") return activate(0, "keyboard", true);
                if (event.key === "End") return activate(views.length - 1, "keyboard", true);
                activate(index + (event.key === "ArrowRight" ? 1 : -1), "keyboard", true);
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
          onPointerDown={startPointer}
          onPointerUp={finishPointer}
          onPointerCancel={() => {
            pointerStartRef.current = null;
          }}
        >
          <div className="product-frame">
            <div className="product-frame-head">
              <span>
                <i /> Real Janus view
              </span>
              <button
                className="product-expand"
                type="button"
                ref={expandRef}
                aria-label={`Open ${active.title} full screen`}
                onClick={openDialog}
              >
                <HiArrowsPointingOut aria-hidden="true" />
                <span>{siteContent.actions.fullScreen}</span>
              </button>
            </div>
            <div className="product-image-button">
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
            </div>
          </div>

          <div className="tab-caption" aria-live="polite" aria-atomic="true">
            <span className="product-progress">{progress}</span>
            <div className="product-caption-copy" key={active.title}>
              <strong>{active.title}</strong>
              <span>{active.copy}</span>
            </div>
          </div>
          <div className="product-progress-line" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / views.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <dialog
        className="product-dialog"
        ref={dialogRef}
        aria-labelledby="product-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          activate(activeIndex + (event.key === "ArrowRight" ? 1 : -1), "keyboard");
        }}
        onPointerDown={(event) => {
          if (event.currentTarget === event.target) closeDialog();
        }}
      >
        <div className="product-dialog-shell">
          <div className="product-dialog-head">
            <div>
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
                onClick={() => activate(activeIndex - 1, "click")}
              >
                <HiChevronLeft aria-hidden="true" />
              </button>
              <span data-dialog-progress>{progress}</span>
              <button
                className="icon-button"
                type="button"
                aria-label="Next Janus view"
                title="Next view"
                onClick={() => activate(activeIndex + 1, "click")}
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
