/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#041E23",
        border: "#0E464F",
        first: "#08252B",
        line: "#07373F",
        free: "#12464E",
        type: "#197686",
        select: "#052228",
        button: "#24A0B5",
      },
    },
  },
  plugins: [],
};
