/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f2d00d",
        "background-light": "#f8f8f5",
        "background-dark": "#221f10",
        "chocolate-dark": "#1a0f00",
      },
      fontFamily: {
        display: ["PlusJakartaSans_700Bold"],
        body: ["PlusJakartaSans_400Regular"],
        serif: ["Newsreader_400Regular"],
        serifBold: ["Newsreader_700Bold"],
        serifItalic: ["Newsreader_400Regular_Italic"],
      },
    },
  },
  plugins: [],
}
