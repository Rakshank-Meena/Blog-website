module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryCta: '#ffe01b',
        primaryCtaColor: '#241c15',
        secondaryCta: '#ffffff',
        secondaryCtaColor: '#241c15',
        bannerGreen: '#d8eacc',
        primaryTxt: '#241c15',
      }
    },
  },
  plugins: [],
}