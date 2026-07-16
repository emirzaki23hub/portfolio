/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: "#0B0D0F",
        surface: "#15181B",
        surface2: "#1D2124",
        paper: "#E8E6E1",
        muted: "#8B9198",
        redline: "#FF4D23",
        lime: "#C9FF3D",
        hairline: "#2A2E32",
        day: "#F1EEE6",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};