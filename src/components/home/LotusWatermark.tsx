import Image from "next/image";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/assetPath";

interface LotusWatermarkProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** Subtle brand mark for editorial backgrounds — replaces emoji lotus. */
export const LotusWatermark = ({
  size = 160,
  className = "lotus-bg",
  style,
}: LotusWatermarkProps) => (
  <div className={className} style={style} aria-hidden>
    <Image
      src={assetPath("/trademarks/icon-dark.svg")}
      alt=""
      width={size}
      height={size}
      style={{
        opacity: 1,
        filter: "sepia(0.4) saturate(1.2) hue-rotate(180deg) brightness(0.85)",
      }}
    />
  </div>
);
