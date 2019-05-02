const pkg = require("./package");
const resolve = require("path").resolve;

export default {
  mode: "universal",
  srcDir: __dirname,
  rootDir: __dirname,
  buildDir: resolve(__dirname, "nuxt"),
  modulesDir: resolve(__dirname, "node_modules"),
  server: { port: 3000, host: "0.0.0.0", timing: false },
  transition: { name: "fade", mode: "out-in" },
  layoutTransition: { name: "layout", mode: "out-in" },
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  dev: process.env.NODE_ENV !== "production",
  loading: { color: "#fff" },
  css: [resolve(__dirname, "./assets/scss/main.scss")],
  plugins: [
    resolve(__dirname, "./plugins/vue-fortawesome"),
    resolve(__dirname, "./plugins/vue-buefy")
  ],
  modules: [
    "nuxt-buefy",
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: [resolve(__dirname, "./assets/scss/main.scss")]
  },
  axios: {},
  buefy: { css: false, materialDesignIcons: true },
  build: {
    analyze: false,
    cache: true,
    devtools: true,
    loaders: {
      ts: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      }
    },
    parallel: true,
    hardSource: true,
    extend(config, ctx) {}
  },
  watch: ["server/**", "pages/**", "**.ts"],
  mongo: {
    host: "localhost",
    port: 27017,
    db: "hugsnan",
    authSource: "admin",
    max: 100,
    min: 1,
    acquireTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
  },
  proxy: {
    "/api": "http://localhost:3001",
    ws: true
  }
};
