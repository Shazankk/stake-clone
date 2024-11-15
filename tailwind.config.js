import flowbitePlugin from "flowbite/plugin";

export default {
  darkMode: "class",
  content: [
    "./index.html", // Main entry point
    "./src/components/**/*.{js,jsx,ts,tsx}", // Specific directories in `src`
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.{css,scss}", // Include styles if needed
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite-specific
    "./src/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};
