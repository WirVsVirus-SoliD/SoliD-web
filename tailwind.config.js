module.exports = {
  important: true,
  theme: {
    fontFamily: {
      title: ["Roboto Slab, sans-serif"],
      body: ["Roboto, sans-serif"]
    },
    extend: {
      colors: {
        "primary-light": "#91B169",
        "primary-dark": "#325802",
        "secondary-light": "#CEEECE",
        "secondary-dark": "#749A60",
        "accent-light": "#F5E5D4",
        "accent-dark": "#F2AC7D"
      },
      height: {
        "100vh": "100vh"
      },
      inset: {
        "100perc": "100%"
      }
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)"
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "even", "odd"]
  },
  plugins: [require("tailwindcss-filters")]
};
