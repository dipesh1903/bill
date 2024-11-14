/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'solid-light': '#495057',
        'solid-medium': '#343A40',
        'solid-high': '#212529',
        'surface-low': '#ffffff',
        'surface-medium': '#F8F9FA',
        'surface-high': '#E9ECEF',
        'outline-low': '#CED4DA',
        'outline-medium': 'ADB5BD',
        'outline-high': '6C757D',
        'interactive-low': '#E9ECEF',
        'interactive-medium': '#DEE2E6',
        'interactive-high': '#CED4DA',
      },
      boxShadow: {
        'product-cards': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        'product-cards-edit': 'red 0px 1px 4px',
      }
    },
  },
  plugins: [],
}

