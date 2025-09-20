import nesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    nesting, // must come first
    tailwindcss,
    autoprefixer,
  ],
};
