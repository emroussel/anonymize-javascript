const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: [
        ...defaultConfig.variants.backgroundColor,
        "hover",
        "disabled",
      ],
      borderColor: [...defaultConfig.variants.borderColor, "hover", "disabled"],
      cursor: [...defaultConfig.variants.cursor, "disabled"],
      opacity: [...defaultConfig.variants.opacity, "disabled"],
      textColor: [...defaultConfig.variants.textColor, "hover", "disabled"],
      transitionProperty: [
        ...defaultConfig.variants.transitionProperty,
        "motion-safe",
      ],
    },
  },
  plugins: [],
};
