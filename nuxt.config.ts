// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        //Available for Server and Client
        WEATHER_APP_SECRET: process.env.WEATHER_APP_SECRET,
    },
    privateRuntimeConfig: {
        //Only available in Server
    },
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
})
