/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-color": "#1D232A",
      "secondary-color": "#191E24",
      gray: "#2C3333",
      blue: "#5D17EB",
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
