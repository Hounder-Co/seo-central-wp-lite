module.exports = {
  important: true,
  content: ["./src/**/*.twig", "./src/**/*.html"],
  safelist: [
    { pattern: /bg-/ },
    { pattern: /text-/ },
    { pattern: /m-/ },
    { pattern: /mt-/ },
    { pattern: /mb-/ },
    { pattern: /p-/ },
    { pattern: /pt-/ },
    { pattern: /pb-/ },
    { pattern: /border-/ },
    { pattern: /hidden/ },
    { pattern: /font-/ },
    { pattern: /flex-/ },
    { pattern: /w-/ },
    { pattern: /line-through/ },
    { pattern: /block/ },
    { pattern: /py-/ },
    { pattern: /px-/ },
    { pattern: /mx-/ },
    { pattern: /cursor-/ },
  ],
  theme: {
    colors: {
      black: "var(--black)",
      white: "var(--white)",

      // Primary Colors
      "primary": "var(--central-green-5)",
      "secondary": "var(--central-green-3)",

      // Primary Colors
      "green-1": "var(--central-green-1)",
      "green-2": "var(--central-green-2)",
      "green-3": "var(--central-green-3)",
      "green-4": "var(--central-green-4)",
      "green-5": "var(--central-green-5)",
      "green-6": "var(--central-green-6)",
      "ui-blue": "var(--central-ui-blue)",
      "ui-red": "var(--central-ui-red)",
      "ui-gold": "var(--central-ui-gold)",

      // Grayscale
      "gray-10": "var(--gray-10)",
      "gray-9": "var(--gray-9)",
      "gray-8": "var(--gray-8)",
      "gray-7": "var(--gray-7)",
      "gray-6": "var(--gray-6)",
      "gray-5": "var(--gray-5)",
      "gray-4": "var(--gray-4)",
      "gray-3": "var(--gray-3)",
      "gray-2": "var(--gray-2)",
      "gray-1": "var(--gray-1)",
    },
    screens: {
      // Tablet
      sm: "768px",
      // => @media (min-width: 768px) { ... }

      // Small Desktop
      md: "1200px",
      // => @media (min-width: 1200px) { ... }

      // Desktop
      lg: "1440px",
      // => @media (min-width: 1440px) { ... }

      // Large Desktop
      xl: "1600px",
      // => @media (min-width: 1600px) { ... }

      // Designer Desktop
      xxl: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1440px",
        xl: "1800px",
      },
    },
    fontFamily: {
      sans: ['termina', 'sans-serif'],
      serif: ['IBM Plex Sans', 'sans-serif'],
    },
    fontSize: {
      "-3": [
        "10px",
        {
          // letterSpacing: '',
          lineHeight: "14px",
        },
      ],
      "-2": [
        "12px",
        {
          lineHeight: "16px",
        },
      ],
      "-1": [
        "14px",
        {
          lineHeight: "20px",
        },
      ],
      0: [
        "16px",
        {
          lineHeight: "22px",
        },
      ],
      1: [
        "18px",
        {
          lineHeight: "24px",
        },
      ],
      2: [
        "20px",
        {
          lineHeight: "28px",
        },
      ],
      3: [
        "22px",
        {
          lineHeight: "30px",
        },
      ],
      4: [
        "24px",
        {
          lineHeight: "32px",
        },
      ],
      5: [
        "28px",
        {
          lineHeight: "36px",
        },
      ],
      6: [
        "32px",
        {
          lineHeight: "40px",
        },
      ],
      7: [
        "36px",
        {
          lineHeight: "44px",
        },
      ],
      8: [
        "40px",
        {
          lineHeight: "48px",
        },
      ],
      9: [
        "44px",
        {
          lineHeight: "52px",
        },
      ],
      10: [
        "48px",
        {
          lineHeight: "56px",
        },
      ],
      11: [
        "56px",
        {
          lineHeight: "64px",
        },
      ],
      12: [
        "64px",
        {
          lineHeight: "72px",
        },
      ],
      13: [
        "72px",
        {
          lineHeight: "80px",
        },
      ],
      14: [
        "88px",
        {
          lineHeight: "96px",
        },
      ],
      15: [
        "104px",
        {
          lineHeight: "116px",
        },
      ],
      16: [
        "120px",
        {
          lineHeight: "132px",
        },
      ],
      17: [
        "156px",
        {
          lineHeight: "172px",
        },
      ],
    },
    opacity: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      10: ".1",
      20: ".2",
      30: ".3",
      40: ".4",
      50: ".5",
      60: ".6",
      70: ".7",
      80: ".8",
      90: ".9",
      100: "1",
    },
    spacing: {
      0: "0px",
      "1px": "1px",
      "2px": "2px",
      "4px": "4px",
      "8px": "8px",
      "12px": "12px",
      "16px": "16px",
      "20px": "20px",
      "24px": "24px",
      "32px": "32px",
      "36px": "36px",
      "40px": "40px",
      "44px": "44px",
      "48px": "48px",
      "52px": "52px",
      "56px": "56px",
      "64px": "64px",
      "72px": "72px",
      "88px": "88px",
      "100px": "100px",
      "120px": "120px",
      "140px": "140px",
      "160px": "160px",
      "200px": "200px",
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
