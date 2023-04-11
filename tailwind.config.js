module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00',
        secondary: '#2ECC71',
        accent: '#FF5733',
        neutral1: '#CCCCCC',
        neutral2: '#999999',
        neutral3: '#666666',
        textColor: '#333333',
        link: '#FF8C00',
        linkHover: '#FF5733',
      },
      fontSize: {
        h1: '36px',
        h2: '28px',
        h3: '24px',
        body: '16px',
        blockquote: '20px',
      },
      fontWeight: {
        bold: 'bold',
        regular: 'regular',
        italic: 'italic',
      },
      backgroundColor: {
        white: '#FFFFFF',
      },
      borderColor: {
        neutral1: '#CCCCCC',
        primary: '#FF8C00',
      },
      textColor: {
        default: '#333333',
        icon: '#333333',
        iconHover: '#FF5733',
        link: '#FF8C00',
        linkHover: '#FF5733',
      },
      margin: {
        16: '16px',
      },
      padding: {
        16: '16px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}