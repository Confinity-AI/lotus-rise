"use client";

import { Modal } from "@/components/Modal";
import type { TestimonialProps } from "@/resources/content";
import {
  Background,
  BlockQuote,
  Column,
  Heading,
  Icon,
  Logo,
  Mask,
  MatrixFx,
  Media,
  Row,
  Text,
} from "@once-ui-system/core";
import { useState } from "react";

export const Testimonial = ({ testimonial }: { testimonial: TestimonialProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Row fillWidth gap="8" s={{ direction: "column" }}>
        <Row flex={1} border="brand-medium" radius="l" overflow="hidden" center aspectRatio="3/4">
          <MatrixFx
            position="absolute"
            fill
            colors={["brand-solid-strong"]}
            spacing={3}
            size={2}
            flicker
            bulge={{
              type: "ripple",
              duration: 4,
              intensity: 15,
              repeat: true,
            }}
          />
          <Mask fill center x={70} y={20} radius={50} padding="24">
            <Media fillWidth aspectRatio="1" src={testimonial.logo.icon} />
          </Mask>
          <Row position="absolute" left="24" bottom="24">
            <Logo wordmark={testimonial.logo.wordmark} />
          </Row>
        </Row>
        <Column
          flex={2}
          border
          radius="xl"
          overflow="hidden"
          cursor={
            <Icon
              solid="brand-strong"
              onSolid="brand-strong"
              name="arrowUpRight"
              padding="12"
              radius="full"
            />
          }
          onClick={() => setIsModalOpen(true)}
        >
          <Background
            position="absolute"
            fill
            gradient={{
              display: true,
              width: 75,
              height: 50,
              y: 100,
              colorStart: "brand-solid-medium",
            }}
          />
          <Column fill vertical="center" paddingX="xl" paddingY="80">
            <Heading variant="display-default-xs">{testimonial.heading}</Heading>
            <BlockQuote
              align="left"
              separator="none"
              marginBottom="0"
              author={testimonial.quote.author}
              link={testimonial.quote.link}
            >
              <Text variant="heading-default-l" onBackground="neutral-weak">
                {testimonial.quote.text}
              </Text>
            </BlockQuote>
          </Column>
        </Column>
      </Row>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={testimonial.modal.title}
      >
        {testimonial.modal.content}
      </Modal>
    </>
  );
};
