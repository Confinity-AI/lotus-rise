"use client";

import type { ShowcaseProps } from "@/resources/content";
import {
  Animation,
  Background,
  Column,
  Heading,
  Icon,
  Media,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Blob, Modal, ScrollContainer } from ".";

export const Showcase = ({ items }: ShowcaseProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Sync modal state with URL parameter
  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam) {
      const itemIndex = items.findIndex((item) => item.slug === modalParam);
      if (itemIndex !== -1) {
        setActiveModal(itemIndex.toString());
      }
    } else {
      setActiveModal(null);
    }
  }, [searchParams, items]);

  const activeItem = activeModal !== null ? items[Number(activeModal)] : undefined;

  return (
    <>
      <ScrollContainer
        onItemClick={(id) => {
          const item = items[Number(id)];
          if (item) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("modal", item.slug);
            router.push(`?${params.toString()}`, { scroll: false });
          }
        }}
        cursor={
          <Icon
            solid="brand-strong"
            onSolid="brand-strong"
            name="arrowUpRight"
            padding="12"
            radius="full"
          />
        }
        aspectRatio="6/7"
        items={items.map((item, index) => ({
          id: index.toString(),
          content: (
            <>
              <Background
                position="absolute"
                data-solid="color"
                mask={{
                  x: 50,
                  y: 50,
                  radius: 50,
                }}
                dots={{
                  display: true,
                  size: "4",
                  color: "brand-solid-strong",
                }}
              />
              <Column position="absolute" maxWidth={32} padding="32" gap="12">
                <Text variant="code-default-s" onBackground="brand-weak">
                  {item.card.step}
                </Text>
                <Heading variant="heading-default-xl">{item.card.heading}</Heading>
              </Column>
              <Animation
                fill
                center
                padding="l"
                marginTop="32"
                zoomOut={1.05}
                fade={1}
                triggerType="hover"
                easing="spring"
                duration={300}
              >
                <Row fillWidth aspectRatio="1200/960" radius="l" border overflow="hidden">
                  <Media src={item.card.image} alt={item.card.alt} fillWidth fillHeight />
                  <Blob position="absolute" translateY="50%" seed={index} />
                </Row>
              </Animation>
              {(item.card.extended || item.card.extra) && (
                <Row
                  position="absolute"
                  bottom="0"
                  fillWidth
                  horizontal="center"
                  paddingBottom="16"
                  gap="8"
                >
                  {item.card.extended && <Tag size="l" variant="accent" label="Extended" />}
                  {item.card.extra && <Tag size="l" variant="brand" label="Extra" />}
                </Row>
              )}
            </>
          ),
        }))}
      />

      <Modal
        isOpen={activeModal !== null}
        onClose={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("modal");
          const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
          router.push(newUrl, { scroll: false });
        }}
        title={activeItem?.modal.title}
      >
        <Column fillWidth onBackground="neutral-weak">
          {activeItem?.modal.content}
        </Column>
      </Modal>
    </>
  );
};
