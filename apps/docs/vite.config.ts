import { defineConfig, lazyPlugins } from "vite-plus";
import { voidPlugin } from "void";
import { voidReact } from "@void/react/plugin";
import tailwindcss from "@tailwindcss/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";

export default defineConfig((env) => ({
  plugins: lazyPlugins(() => {
    const voidPlugins = [fumadocsMdx(), voidPlugin(), voidReact({ react: { compiler: true } })];
    return [tailwindcss(), env.mode !== "test" ? voidPlugins : null];
  }),
  run: {
    tasks: {
      // Workspace packages (e.g. @hvn-oss/ds) don't commit built outputs; build them first.
      dev: {
        command: "vp dev",
        cache: false,
        dependsOn: [{ task: "build", from: "dependencies" }],
      },
      build: {
        command: "vp build",
        dependsOn: [{ task: "build", from: "dependencies" }],
        // Void writes temp files into .void/ during the build, which defeats caching.
        cache: false,
      },
    },
  },
}));
