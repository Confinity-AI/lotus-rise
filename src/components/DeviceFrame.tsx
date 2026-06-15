import Image from "next/image";
import type { CSSProperties, FC, ReactNode } from "react";
import { Flex } from "@once-ui-system/core";

type DeviceFrameVariant = "default" | "hero" | "inline";

interface DeviceFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  variant?: DeviceFrameVariant;
  sizes?: string;
  caption?: ReactNode;
}

const variantStyles: Record<DeviceFrameVariant, CSSProperties> = {
  default: {
    boxShadow: "0 8px 32px rgba(26, 35, 126, 0.06)",
    aspectRatio: "16 / 10",
  },
  hero: {
    boxShadow: "0 20px 60px rgba(26, 35, 126, 0.1)",
    aspectRatio: "16 / 10",
    borderRadius: "6px",
  },
  inline: {
    boxShadow: "0 4px 16px rgba(26, 35, 126, 0.04)",
    aspectRatio: "16 / 11",
  },
};

export const DeviceFrame: FC<DeviceFrameProps> = ({
  src,
  alt,
  priority = false,
  className,
  style,
  variant = "default",
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption,
}) => {
  return (
    <Flex direction="column" gap="8" style={{ width: "100%" }}>
      <Flex
        className={`device-frame device-frame--${variant} ${className ?? ""}`}
        style={{
          position: "relative",
          width: "100%",
          border: "1px solid var(--neutral-border-medium)",
          borderRadius: variant === "hero" ? "6px" : "var(--border-radius-conservative)",
          overflow: "hidden",
          backgroundColor: "white",
          ...variantStyles[variant],
          ...style,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </Flex>
      {caption ? (
        <span style={{ fontSize: "12px", color: "var(--neutral-text-weak)", lineHeight: 1.4 }}>{caption}</span>
      ) : null}
    </Flex>
  );
};
