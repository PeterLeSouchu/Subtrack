import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Spinner from "./Spinner";

const meta = {
  title: "Example/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "text",
      description:
        "Classe Tailwind pour la couleur de la bordure (ex: border-red-500)",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Brand: Story = {
  args: {
    color: "border-brand-500",
  },
};

export const Danger: Story = {
  args: {
    color: "border-red-500",
  },
};
