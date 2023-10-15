import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	plugins: [
		nextui({
			themes: {
				"purple-dark": {
					extend: "dark",
					colors: {
						background: "#2C3151",
						foreground: "#ffffff",
						primary: {
							DEFAULT: "#00ff9b",
							foreground: "#ffffff",
						}
					},
					layout: {
						disabledOpacity: "0.3",
						radius: {
							small: "4px",
							medium: "8px",
							large: "12px",
						},
						borderWidth: {
							small: "1px",
							medium: "2px",
							large: "3px",
						},
					},
				},
			},
		}),
	],
}

export default config;