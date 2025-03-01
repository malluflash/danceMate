/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0666eb", // Revolut blue
          dark: "#0550bc",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#191c20", // Revolut dark
          light: "#2d3748",
        },
        accent: {
          DEFAULT: "#00d2c0", // Revolut teal
          light: "#4fd1c5",
          dark: "#00a99e",
        },
        "dark-bg": "#0f1114", // Darker than Revolut's dark
        "dark-card": "#191c20",
        "dark-text": "#f7fafc",
        "dark-border": "#2d3748",
        "dark-hover": "#2d3748",
        "light-bg": "#f7fafc",
        "light-card": "#ffffff",
        "light-text": "#1a202c",
        "light-border": "#e2e8f0",
        "light-hover": "#edf2f7",
        success: "#10b981", // Green
        warning: "#f59e0b", // Amber
        error: "#ef4444",   // Red
        info: "#3b82f6",    // Blue
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 