import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|divider).js",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        dashboardbg: "#F8F8FB",
        stattext: "#A0A1BD",
        navbar: "#4670DB",
        blue: colors.blue,
        icon: "#A8A2E1",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderWidth: {
        b1: "1px",
      },
      backgroundColor: {
        question: "#ECEBFD",
        nav: "#253145",
      },
      backgroundImage: {
        "homepage-blue":
          "linear-gradient(180deg, rgba(235, 245, 255, 1) 0%, rgba(255, 255, 255, 1) 45%), " +
          "radial-gradient(circle at 20% -10%, rgba(161, 196, 253, 0.45), rgba(255, 255, 255, 0) 55%), " +
          "radial-gradient(circle at 85% 0%, rgba(125, 203, 255, 0.35), rgba(255, 255, 255, 0) 60%), " +
          "radial-gradient(circle at 50% 85%, rgba(198, 216, 255, 0.4), rgba(255, 255, 255, 0) 70%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [nextui(), tailwindcssAnimate],
} satisfies Config;
