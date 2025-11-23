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
        // Purple to Pink Gradient Palette
        primary: {
          DEFAULT: "#540863", // Purple
          dark: "#3D0649",
          light: "#6B0A7A",
          lighter: "#7D0D8F",
        },
        secondary: {
          DEFAULT: "#92487A", // Pink
          light: "#A55A8A",
          lighter: "#B86C9A",
        },
        accent: {
          DEFAULT: "#E49BA6", // Peach
          light: "#E8A8B2",
          lighter: "#ECB5BE",
        },
        sunset: {
          DEFAULT: "#FFD3D5", // Sunset
          light: "#FFE0E2",
          dark: "#FFC6C9",
        },
        // Updated background colors with gradient theme
        "dark-bg": "#2D0435", // Deep purple dark
        "dark-card": "#3D0649",
        "dark-text": "#FFD3D5",
        "dark-border": "#540863",
        "dark-hover": "#4A0758",
        "light-bg": "#FFD3D5", // Sunset background
        "light-card": "#ffffff",
        "light-text": "#540863",
        "light-border": "#E49BA6",
        "light-hover": "#FFE0E2",
        success: "#10b981", // Green
        warning: "#f59e0b", // Amber
        error: "#ef4444",   // Red
        info: "#8B5CF6",    // Purple-blue
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
        'card': '0 4px 6px -1px rgba(84, 8, 99, 0.1), 0 2px 4px -1px rgba(228, 155, 166, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(84, 8, 99, 0.15), 0 4px 6px -2px rgba(228, 155, 166, 0.1)',
        'button': '0 1px 3px 0 rgba(84, 8, 99, 0.2), 0 1px 2px 0 rgba(228, 155, 166, 0.1)',
        'button-hover': '0 4px 6px -1px rgba(84, 8, 99, 0.3), 0 2px 4px -1px rgba(228, 155, 166, 0.15)',
        'glow': '0 0 20px rgba(228, 155, 166, 0.3), 0 0 40px rgba(146, 72, 122, 0.2)',
        'glow-purple': '0 0 20px rgba(84, 8, 99, 0.4)',
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #540863 0%, #92487A 25%, #E49BA6 75%, #FFD3D5 100%)',
        'gradient-purple-pink-vertical': 'linear-gradient(180deg, #540863 0%, #92487A 33%, #E49BA6 66%, #FFD3D5 100%)',
        'gradient-purple': 'linear-gradient(135deg, #540863 0%, #92487A 100%)',
        'gradient-pink': 'linear-gradient(135deg, #E49BA6 0%, #FFD3D5 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 211, 213, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 211, 213, 0.6)' },
        },
      },
    },
  },
  plugins: [],
} 