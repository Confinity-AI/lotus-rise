import { Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";

const heading = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = { heading, body, label, code };

const style = {
  theme: "light",
  neutral: "custom",
  brand: "custom",
  accent: "custom",
  solid: "color",
  solidStyle: "flat",
  border: "conservative",
  surface: "translucent",
  transition: "micro",
  scaling: "100",
};

const dataStyle = {
  variant: "flat",
  mode: "categorical",
  height: 24,
  axis: { stroke: "var(--neutral-alpha-weak)" },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

export { dataStyle, fonts, style };
