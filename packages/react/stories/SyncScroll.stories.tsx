import { ComponentStory, ComponentMeta } from "@storybook/react";
import SyncScroll from "./SyncScroll";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Scroll Scroll",
  component: SyncScroll,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
    },
  },
} as ComponentMeta<typeof SyncScroll>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SyncScroll> = (args) => (
  <SyncScroll {...args} />
);

export const Vertical = Template.bind({});
Vertical.args = {
  direction: "vertical",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: "horizontal",
};

export const Both = Template.bind({});
Both.args = {
  direction: "both",
};
