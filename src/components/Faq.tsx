import type { faq } from "@/resources/content";
import { Accordion, Column, Text } from "@once-ui-system/core";

export const Faq = ({ items }: { items: typeof faq }) => {
  return (
    <Column fillWidth gap="8">
      {items.map((item, index) => (
        <Column key={index} fillWidth border radius="l" padding="4" background="overlay">
          <Accordion title={<Text variant="body-default-s">{item.title}</Text>}>
            <Text variant="body-default-s" onBackground="neutral-medium">
              {item.content}
            </Text>
          </Accordion>
        </Column>
      ))}
    </Column>
  );
};
