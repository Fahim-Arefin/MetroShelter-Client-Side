export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ["Libre Franklin", "sans-serif"],
      },
      screens: {
        "3xl": "1750px", // Example custom 3xl screen size
      },
    },
  },
  plugins: [require("daisyui")],
};
