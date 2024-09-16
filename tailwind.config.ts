import { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                header: "#22262e",
            },
        },
    },
    plugins: [],
};

export default config;
