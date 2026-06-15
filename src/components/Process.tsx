import type { ProcessItem } from "@/resources/content";
import { Animation, Column, Grid, Heading, Media, Text } from "@once-ui-system/core";

export const Process = ({ process }: { process: ProcessItem[] }) => {
  return (
    <Grid fillWidth columns={3} s={{ columns: 1 }} gap="8">
      {process.map((item, index) => (
        <Column
          key={item.alt}
          fillWidth
          horizontal={index === 1 ? "center" : index === 2 ? "end" : "start"}
        >
          <Column maxWidth={24} fillWidth border radius="xl" padding="8" gap="8">
            <Animation triggerType="hover" easing="spring" duration={400} zoomOut={1.08} fade={0.8}>
              <Media src={item.image} alt={item.alt} aspectRatio="1" radius="l" />
            </Animation>
            <Column fillWidth padding="16" gap="12">
              <Heading as="h3" variant="heading-strong-xs">
                {item.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.description}
              </Text>
            </Column>
          </Column>
        </Column>
      ))}
    </Grid>
  );
};
