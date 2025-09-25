module.exports = {
  apps: [
    {
      name: "fresh-shop-api",
      cwd: "./apps/api",
      script: "dist/main.js",
      node_args: "--enable-source-maps",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "fresh-shop-web",
      cwd: "./apps/web",
      script: ".output/server/index.mjs",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
