import Image from "next/image";
import Link from "next/link";

interface LotusRiseWordmarkProps {
  light?: boolean;
}

export const LotusRiseWordmark = ({ light = false }: LotusRiseWordmarkProps) => (
  <Link href="/" className={`lr-wordmark lr-wordmark--svg${light ? " lr-wordmark--light" : ""}`} aria-label="Lotus Rise home">
    <Image
      src={light ? "/trademarks/lotus-rise-wordmark-light.svg" : "/trademarks/lotus-rise-wordmark.svg"}
      alt="Lotus Rise"
      width={160}
      height={32}
      priority
    />
  </Link>
);
