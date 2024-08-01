/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind"
// tailwind scrool bar for table horizontal scrolling
import tailwindScrollbar from "tailwind-scrollbar"
import openVariant from "./plugins/openVariant"
import animationDelay from "./plugins/animationDelay"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      // backgroundImage: {
      //   origami: "url('../images/background/origamiBanner.jpg')",
      //   cimentLight: "url('../images/background/cimentLightBanner.jpg')",
      //   cimentDark: "url('../images/background/cimentDarkBanner.jpg')",
      // },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "fade-in-left": "fade-in-left 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        "toast-enter": "toast-enter 0.3s ease-out",
        "toast-exit": "toast-exit 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "toast-enter": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "toast-exit": {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    // require("tailwind-scrollbar")
    tailwindScrollbar,
    openVariant,
    animationDelay,
  ],
}
