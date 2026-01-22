import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatsHeader } from "./Stats-header";

const meta = {
  title: "Example/StatsHeader",
  component: StatsHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    statsData: {
      control: "object",
      description:
        "Statistiques (numbers) qui s'afficheront dans le composant. On y trouve le prix total, le nombre de mensualités, la moyenne et les bénéfices ou la perte d'argent par rapport auvercel d mois précédent.",
    },
    isHistory: {
      control: "boolean",
      description:
        "Permet de savoir si le composant sera utilé pour les stats du dashboard ou dans l'historique (qui lui ne possede pas toutes les stats)",
    },
  },
} satisfies Meta<typeof StatsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  args: {statsData: {
   totalPrice: 1000,
   totalMensuality: 10,
   averagePrice: 100,
   benefitOrLoss: 10
 }},
};

export const History: Story = {
  args: {
   statsData: {
      totalPrice: 1000,
      totalMensuality: 10,
      averagePrice: 100,
      benefitOrLoss: 0
    },
    isHistory: false
  },
};



