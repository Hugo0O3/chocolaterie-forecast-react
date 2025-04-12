
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Couleurs thème chocolat
        chocolate: {
          50: '#FCF7F0',
          100: '#F7E9D7',
          200: '#E9D3B5',
          300: '#DDB788',
          400: '#C79A67',
          500: '#A87B4F',
          600: '#87623F',
          700: '#674A30',
          800: '#483322',
          900: '#2A1E15',
          950: '#1A130E',
        },
        caramel: {
          100: '#FDE1D3',
          200: '#FEC6A1',
          300: '#FEA76F',
          400: '#FD8A44',
          500: '#FC6D1D',
          600: '#E85804',
          700: '#B84503',
          800: '#873302',
          900: '#562001',
        },
        cream: {
          100: '#FFFBF0',
          200: '#FEF7CD',
          300: '#FEF2AA',
          400: '#FDEE88',
          500: '#FDE965',
          600: '#FCDA16',
          700: '#D1B205',
          800: '#9F8604',
          900: '#6D5A02',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'chocolate-texture': "url('/chocolate-texture.jpg')",
        'chocolate-gradient': 'linear-gradient(to right, #2A1E15, #87623F, #C79A67)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
