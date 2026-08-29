import { Button } from "@once-ui-system/core";
import type { ComponentProps, ComponentType } from "react";

type StaticLinkButtonProps = ComponentProps<typeof Button> & { href: string };

const StaticButton = Button as unknown as ComponentType<
  StaticLinkButtonProps & { prefetch?: boolean }
>;

export function StaticLinkButton(props: StaticLinkButtonProps) {
  return <StaticButton {...props} prefetch={false} />;
}
