const defaultConfig = require("tailwindcss/defaultConfig");
const plugin = require("tailwindcss/plugin");

const mappingPxToRem = (from, to, step) => {
  const basic = 16;
  const len = Math.ceil((to - from) / step);
  const arr = new Array(len).fill(undefined).map((_, i) => from + step * i);

  return Object.fromEntries(arr.map((i) => [i, `${i / basic}rem`]));
};


module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  fontFamily: {
    montserrat: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ],
  },
  theme: {
    container: {
      center: true,
      screens: {
        xs: "90%",
        md: "1000px",
        lg: "1200px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      inset: {
        ...mappingPxToRem(4, 64, 1)
      },
      borderRadius: {
        DEFAULT: "4px",
        ...mappingPxToRem(4, 64, 1)
      },
      fontSize: {
        ...mappingPxToRem(4, 126, 1),
        sm: ["14px", "17px"],
        base: ["16px", "20px"],
        base2: ["16px", "24px"],
        lg: ["24px", "32px"],
      },
      colors: {
        body: "#EDEFF3", // for body background
        primary: "#645AFF",
        333: "#333333",
        e40c5b: "#E40C5B",
        "4f4f4f": "#4F4F4F",
        494853: "#494853",
        "7b7986": "#7b7986",
        eae9f0: "#EAE9F0",
        e8e7f0: "#E8E7f0",
        f1f0f2: "#f1f0f2",
        "2e2d33": "#2e2d33",
        d6d3de: "#d6d3de",
        fff: "#FFFFFF",
        overlay: "#4F4F4F",
        abaab9: "#ABAAB9",
        "31c26b": "#31C26B",
        '8f8ab3': '#8F8AB3',
        "grey": {
          1: '#2E2D33',
          2: '#494853',
          3: '#7b7986',
          66: '#EAE9F0',
          200: '#eae9f0'
        },
        "acala-blue": {
          50: "#f7f7ff",
          100: "#f0efff",
          200: "#d8d6ff",
          300: "#c1bdff",
          400: "#938cff",
          500: "#645AFF",
          600: "#5a51e6",
          700: "#4b44bf",
          800: "#3c3699",
          900: "#312c7d",
        },
        "acala-pink": {
          50: "#fef3f7",
          100: "#fce7ef",
          200: "#f8c2d6",
          300: "#f49ebd",
          400: "#ec558c",
          500: "#E40C5B",
          600: "#cd0b52",
          700: "#ab0944",
          800: "#890737",
          900: "#70062d",
        },
        "acala-orange": {
          50: "#fff6f5",
          100: "#ffedeb",
          200: "#ffd2ce",
          300: "#ffb7b1",
          400: "#ff8276",
          500: "#ff4c3b",
          600: "#e64435",
          700: "#bf392c",
          800: "#992e23",
          900: "#7d251d",
        },
      },
      spacing: {
        ...mappingPxToRem(4, 126, 1)
      },
      boxShadow: {
        DEFAULT: "0px 4px 20px rgba(228, 12, 91, 0.02)",
        1: "5px 5px 15px rgba(0, 0, 0, 0.05), 1px 1px 1px rgba(100, 90, 255, 0.05)",
        2: "5px 5px 15px rgba(35, 34, 49, 0.08), 1px 1px 1px rgba(100, 90, 255, 0.05)",
      },
      dropShadow: {
        DEFAULT:
					"drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.05)) drop-shadow(1px 1px 1px rgba(100, 90, 255, 0.05))",
      },
      minWidth: {
        ...mappingPxToRem(4, 126, 1)
      },
      minHeight: {
        ...mappingPxToRem(4, 126, 1)
      },
      lineHeight: {
        ...mappingPxToRem(4, 126, 1)
      },
      keyframes: {
        "ping-once": {
          '75%, 100%': { 
            transform: 'scale(1.25, 1.5)', 
            opacity: "0"
          },
        }
      },
      animation: {
        "ping-once": "ping-once 1s cubic-bezier(0, 0, 0.2, 1) forwards"
      }
    },
  },
  variants: {
    ...defaultConfig.variants,
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // gradient background helper plugins
      addUtilities({
        ".bg-gradient-primary": {
          background:
						"linear-gradient(328.08deg, #645AFF -40.69%, #E40C5B 36.17%, #FF4C3B 79.87%)",
        },
        ".bg-gradient-primary-light": {
          background:
						"linear-gradient(328.08deg, rgba(100, 90, 255, 0.7) -40.69%, rgba(228, 12, 91, 0.7) 36.17%, rgba(255, 76, 59, 0.7) 79.87%)",
        },
        ".bg-gradient-light": {
          background:
						"linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(356.17deg, rgba(100, 90, 255, 0) -4.31%, #E40C5B 62.87%, #FF4C3B 107.17%)",
          opacity: "0.2",
        },
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-between": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        ".card-gradient-border": {
          backgroundImage:
						"linear-gradient(#fff, #fff), linear-gradient(43.05deg, rgba(100, 90, 255, 0.1) 64.66%, rgba(100, 90, 255, 0.48) 92.98%)",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "border-box",
          backgroundRepeat: "no-repeat",
          border: "1px solid transparent",
        },
        ".wallet-card-gradient-bg": {
          zIndex: -1,
          background:
						"linear-gradient( 35.63deg, rgba(108, 114, 234, 0) 48.77%, rgba(90, 129, 255, 0.07) 71.35%);",
        },
      });
    }),
  ],
};
