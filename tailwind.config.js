const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  theme: {
    fontFamily: {
      title: ["Raleway, sans-serif"],
      body: ["Roboto, sans-serif"]
    },
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(20px)"
      },
      boxShadow: {
        "selection-brand": "0px 0px 0px 2px #199057"
      },
      colors: {
        "brand-light": "#94E1AE",
        brand: "#199057",
        "brand-dark": "#197649",
        "accent-light": "#DCB38E",
        accent: "#7C4B36",
        grey: "#C4C4C4",
        gray: {
          ...colors.gray,
          "50": "#FAFAFA"
        },
        lightGrey: "#EBEBEB",
        "white-primary": `rgba(255, 255, 255, 0.87)`,
        "white-secondary": `rgba(255, 255, 255, 0.54)`,
        "white-hint": `rgba(255, 255, 255, 0.34)`,
        "white-divide": `rgba(255, 255, 255, 0.15)`
      },
      height: {
        "100vh": "100vh"
      },
      inset: {
        "100perc": "100%",
        "1/2": "50%"
      },
      zIndex: {
        "9999": 9999
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "even", "odd"],
    borderRadius: ["responsive", "first", "last"],
    borderWidth: ["responsive", "first", "last"],
    padding: ["responsive", "first", "last"]
  },
  plugins: [require("tailwindcss-filters")]
};
