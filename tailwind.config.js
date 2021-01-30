module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "disabled"],
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
