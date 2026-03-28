/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fbfa",
          100: "#d7f6f3",
          500: "#0ea5a4",
          600: "#0c8b8a",
          700: "#0a6f6e",
        },
      },
      boxShadow: {
        panel: "0 14px 30px -20px rgba(15, 23, 42, 0.45)",
      },
      borderRadius: {
        xl2: "1.2rem",
      },
    },
  },
  plugins: [],
};
