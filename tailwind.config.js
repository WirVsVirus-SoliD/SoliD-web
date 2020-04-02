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
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "even", "odd"],
    borderRadius: ["responsive", "first", "last"]
  },
  plugins: [require("tailwindcss-filters")]
};
