import { Avatar, Background, Button, Column, Heading, Row, Text } from "@once-ui-system/core";

export function About() {
  return (
    <Row maxWidth={24} zIndex={1} padding="1" radius="xl" overflow="hidden" border>
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
          x: 50,
          y: 0,
          colorStart: "brand-solid-strong",
          colorEnd: "brand-on-background-strong",
        }}
      />
      <Column fillWidth padding="40" radius="xl" gap="12" background="brand-weak">
        <Avatar src="/images/client-1.jpg" size="xl" />
        <Heading variant="display-default-xs" marginTop="20">
          Selene Yu
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="20">
          I'm here to help you build the frontend systems that make it possible.
        </Text>
        <Button fillWidth variant="secondary" href="https://spotlight.once-ui.com">
          More about me
        </Button>
      </Column>
    </Row>
  );
}
