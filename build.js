const { build } = require("esbuild");

build({
  entryPoints: ["./src/api.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  outfile: "dist/api.js",
  sourcemap: false,
}).catch(() => process.exit(1));
