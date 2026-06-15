"use client";

import { Button } from "@once-ui-system/core";
import { useRouter, useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";

type ModalLinkProps = ComponentProps<typeof Button> & {
  href: string;
};

export const ModalLink = ({ href, ...props }: ModalLinkProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("?modal=")) {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      const modalSlug = href.replace("?modal=", "");
      params.set("modal", modalSlug);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  return <Button {...props} href={href} onClick={handleClick} />;
};
