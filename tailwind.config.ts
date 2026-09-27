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
    "./src/**/*.stories.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        dashboardbg: "#F5F6FB",
        ink: "#0E1433",
        line: "#E4E7F2",
        stattext: "#555E7D",
        navbar: "#4670DB",
        brand: {
          50: "#EEF1FF",
          100: "#DFE4FF",
          200: "#C0CAFF",
          300: "#97A8FF",
          400: "#6B80F7",
          500: "#4A5FEE",
          600: "#2F43E0",
          700: "#2233B8",
          800: "#1C2A8F",
          900: "#141D5E",
          950: "#0B1037",
          DEFAULT: "#2F43E0",
        },
        blue: {
          ...colors.blue,
          DEFAULT: "#2C4A7B",
        },
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
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 30, 61, 0.04)",
        pop: "0 12px 32px -8px rgba(15, 30, 61, 0.22), 0 0 0 1px rgba(15, 30, 61, 0.06)",
        soft: "0 1px 2px rgba(14, 20, 51, 0.04), 0 4px 16px -4px rgba(14, 20, 51, 0.08)",
        float: "0 2px 4px rgba(14, 20, 51, 0.04), 0 24px 48px -12px rgba(14, 20, 51, 0.18)",
        mockup: "0 0 0 1px rgba(14, 20, 51, 0.06), 0 40px 80px -20px rgba(34, 51, 184, 0.35), 0 16px 32px -16px rgba(14, 20, 51, 0.2)",
        glow: "0 0 0 1px rgba(47, 67, 224, 0.9), 0 8px 24px -6px rgba(47, 67, 224, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [nextui(), tailwindcssAnimate],
} satisfies Config;
