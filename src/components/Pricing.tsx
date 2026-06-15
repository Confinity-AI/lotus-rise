"use client";

import type { PricingBundle, PricingProps } from "@/resources/content";
import { schema } from "@/resources/seo";
import {
  Background,
  Button,
  Column,
  CountFx,
  Icon,
  Mask,
  MatrixFx,
  Row,
  Switch,
  Tag,
  Text,
} from "@once-ui-system/core";
import { useState } from "react";

export const Pricing = ({ bundles }: PricingProps) => {
  const [selectedExtras, setSelectedExtras] = useState<Record<string, Record<string, boolean>>>({});

  const toggleExtra = (bundleIndex: number, extraId: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [bundleIndex]: {
        ...prev[bundleIndex],
        [extraId]: !prev[bundleIndex]?.[extraId],
      },
    }));
  };

  const calculatePrice = (bundleIndex: number, bundle: PricingBundle) => {
    let total = bundle.basePrice;
    if (bundle.extras) {
      bundle.extras.forEach((extra) => {
        if (selectedExtras[bundleIndex]?.[extra.id]) {
          total += extra.price;
        }
      });
    }
    return total;
  };

  const getEmailSubject = (bundleIndex: number, bundle: PricingBundle) => {
    const selectedExtrasList: string[] = [];
    if (bundle.extras) {
      bundle.extras.forEach((extra) => {
        if (selectedExtras[bundleIndex]?.[extra.id]) {
          selectedExtrasList.push(extra.label);
        }
      });
    }

    if (selectedExtrasList.length > 0) {
      return `${bundle.emailSubject} (with ${selectedExtrasList.join(", ")})`;
    }
    return bundle.emailSubject;
  };

  return (
    <Row fillWidth gap="8" s={{ direction: "column" }}>
      {bundles.map((bundle, bundleIndex) => (
        <Column
          key={bundleIndex}
          fillWidth
          vertical="between"
          radius="xl"
          background={bundle.featured ? "brand-alpha-weak" : "page"}
          border={bundle.featured ? "brand-alpha-weak" : true}
          padding="l"
        >
          <Background
            pointerEvents="none"
            position="absolute"
            radius="xl"
            top="0"
            left="0"
            gradient={{
              display: true,
              x: 100,
              y: 0,
              colorStart: "page-background",
            }}
          />
          {bundle.featured && (
            <Tag
              position="absolute"
              top="0"
              left="l"
              translateY="-50%"
              data-border="rounded"
              variant="brand"
            >
              Best value
            </Tag>
          )}
          <Mask position="absolute" fill left="0" top="0" x={100} y={0} radius={50}>
            {bundle.featured && (
              <MatrixFx
                pointerEvents="none"
                position="absolute"
                fill
                radius="xl"
                colors={["brand-solid-strong"]}
                spacing={3}
                size={1.5}
                flicker
                bulge={{
                  type: "wave",
                  duration: 4,
                  intensity: 15,
                  repeat: true,
                }}
              />
            )}
          </Mask>
          <Background
            position="absolute"
            top="0"
            left="0"
            data-solid="color"
            mask={{
              cursor: true,
              radius: 60,
            }}
            gradient={{
              display: true,
              height: 50,
              width: 50,
              x: 50,
              y: 100,
              colorStart: "brand-solid-strong",
            }}
          />
          <Column fillWidth>
            <Text variant="heading-strong-xl">{bundle.title}</Text>
            <Text variant="label-default-s" onBackground="neutral-medium" marginTop="4">
              {bundle.subtitle}
            </Text>
            <Text variant="label-strong-s" onBackground="brand-weak" marginTop="12">
              $<CountFx value={calculatePrice(bundleIndex, bundle)} separator="," />
            </Text>
            <Column fillWidth gap="12" paddingTop="24" paddingBottom="40">
              {bundle.features.map((feature, featureIndex) => (
                <Row key={featureIndex} vertical="center" gap="8">
                  <Icon name="check" size="xs" onBackground="brand-weak" />
                  <Text variant="label-default-s">{feature}</Text>
                </Row>
              ))}
            </Column>
          </Column>
          <Column fillWidth gap="16">
            {bundle.extras && bundle.extras.length > 0 && (
              <Column
                fillWidth
                background="brand-alpha-weak"
                border="brand-alpha-weak"
                radius="l"
                paddingY="12"
                paddingX="16"
                gap="12"
                marginTop="20"
              >
                <Text variant="label-default-s" onBackground="brand-weak">
                  Extras
                </Text>
                {bundle.extras.map((extra) => (
                  <Row key={extra.id} fillWidth horizontal="between" vertical="center">
                    <Column gap="4">
                      <Text variant="label-default-s">{extra.label}</Text>
                      <Text variant="label-default-xs" onBackground="neutral-weak">
                        +${extra.price.toLocaleString()}
                      </Text>
                    </Column>
                    <Switch
                      isChecked={selectedExtras[bundleIndex]?.[extra.id] || false}
                      onToggle={() => toggleExtra(bundleIndex, extra.id)}
                    />
                  </Row>
                ))}
              </Column>
            )}
            <Row radius="l" background="overlay">
              <Button
                variant={bundle.featured ? "primary" : "secondary"}
                fillWidth
                target="_blank"
                href={`mailto:${schema.email}?subject=${encodeURIComponent(getEmailSubject(bundleIndex, bundle))}`}
              >
                Get in touch
              </Button>
            </Row>
          </Column>
        </Column>
      ))}
    </Row>
  );
};
