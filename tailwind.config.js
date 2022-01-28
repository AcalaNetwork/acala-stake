const defaultConfig = require("tailwindcss/defaultConfig");
const plugin = require("tailwindcss/plugin");

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
				12: "3rem",
			},
			borderRadius: {
				DEFAULT: "4px",

				8: "8px",
				16: "16px",
				12: "12px",
				xl: "24px",
				circle: "50%",
			},
			fontSize: {
				12: "12px",
				13: "13px",
				14: "14px",
				15: "15px",
				16: "16px",
				18: "18px",
				20: "20px",
				24: "24px",
				28: "28px",
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
				4: "1rem",
				8: "2rem",
				10: "2.5rem",
				12: "3rem",
				14: "3.5rem",
				15: "3.75rem",
				16: "4rem",
				17: "4.25rem",
				18: "4.5rem",
				20: "5rem",
				22: "5.5rem",
				24: "6rem",
				26: "6.75rem",
				29: "7.25rem",
				30: "7.5rem",
				32: "8rem",
				34: "8.5rem",
				38: "9.5rem",
				40: "10rem",
				44: "11rem",
				46: "11.5rem",
				54: "13.5rem",
				55: "13.75rem",
				56: "14rem",
				58: "14.5rem",
				64: "16rem",
				68: "17rem",
				100: "25rem",
				120: "30rem",
				126: "31.5rem",
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
				360: "90rem",
			},
			minHeight: {
				126: "31.5rem",
				240: "60rem",
			},
			lineHeight: {
				15: "3.25rem",
				16: "4rem",
				17: "4.25rem",
				18: "4.5rem",
				20: "5rem",
				29: "7.25rem",
				30: "7.5rem",
				34: "8.5rem",
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
				".header-bg": {
					zIndex: 1,
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					background:
						"linear-gradient( 358.75deg, rgba(100, 90, 255, 0) 45.81%, rgba(100, 90, 255, 0.15) 104.27%) #ffffff",
					opacity: 0.7,
				},
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
