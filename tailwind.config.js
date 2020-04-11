module.exports = {
  important: true,
  theme: {
    fontFamily: {
      title: ["Raleway, sans-serif"],
      body: ["Roboto, sans-serif"]
    },
    extend: {
      colors: {
        "brand-light": "#94E1AE",
        brand: "#199057",
        "brand-dark": "#197649",
        "accent-light": "#DCB38E",
        accent: "#7C4B36",
        grey: "#C4C4C4"
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
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)"
    },
    boxShadow: {
      "selection-brand": "0px 0px 0px 2px #199057"
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
