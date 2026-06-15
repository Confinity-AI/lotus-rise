"use client";

import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      setWidth(scrollable > 0 ? (root.scrollTop / scrollable) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="he-scroll-progress" aria-hidden>
      <div className="he-scroll-progress__bar" style={{ width: `${width}%` }} />
    </div>
  );
};
