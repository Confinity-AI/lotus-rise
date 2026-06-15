"use client";

import { Column, IconButton, Row } from "@once-ui-system/core";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollItem {
  id: string;
  content: React.ReactNode;
}

interface ScrollContainerProps extends React.ComponentProps<typeof Row> {
  items: ScrollItem[];
  onItemClick?: (id: string) => void;
}

export const ScrollContainer = ({ items, onItemClick, ...flex }: ScrollContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleItemClick = (id: string) => {
    onItemClick?.(id);
  };

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    checkScrollPosition();

    element.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      element.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scroll = (direction: "left" | "right") => {
    const element = scrollRef.current;
    if (!element) return;

    const firstChild = element.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const gap = Number.parseFloat(getComputedStyle(element).gap) || 0;
    const tileWidth = firstChild.offsetWidth + gap;
    const targetScroll = element.scrollLeft + (direction === "right" ? tileWidth : -tileWidth);

    element.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <Column fillWidth gap="8">
      <Row fillWidth horizontal="end" gap="8" paddingX="24">
        <IconButton
          icon="chevronLeft"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          style={{ border: "none" }}
        />
        <IconButton
          icon="chevronRight"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          style={{ border: "none" }}
        />
      </Row>
      <Row
        ref={scrollRef}
        gap="8"
        overflowX="auto"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item) => (
          <Column
            key={item.id}
            maxWidth={48}
            minWidth={28}
            border
            radius="xl"
            overflow="hidden"
            gap="8"
            aspectRatio="3/4"
            onClick={() => handleItemClick(item.id)}
            style={{
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
            {...flex}
          >
            {item.content}
          </Column>
        ))}
      </Row>
    </Column>
  );
};
