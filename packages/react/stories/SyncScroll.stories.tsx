import type { Meta, StoryObj } from "@storybook/react";
import SyncScroll from "./SyncScroll";

const meta: Meta<typeof SyncScroll> = {
  title: "Example/Sync Scroll",
  component: SyncScroll,
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
    },
  }
};

export default meta;
type Story = StoryObj<typeof SyncScroll>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story = {
  render: (args) => (
    <SyncScroll {...args} />
  )
}

export const Vertical: Story = {
  ...Template,
  args: {
    direction: "vertical",
  }
}

export const Horizontal: Story = {
  ...Template,
  args: {
    direction: "horizontal",
  }
}

export const Both: Story = {
  ...Template,
  args: {
    direction: "both",
  }
}
