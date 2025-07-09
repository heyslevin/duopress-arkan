import { defineCliConfig } from "sanity/cli";
import { type UserConfig } from "vite";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-projectID";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite(viteConfig: UserConfig): UserConfig {
    return {
      ...viteConfig,
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
      define: {
        ...viteConfig.define,
        // `sanity dev` enables speedy in both development and production, this line restores the default `styled-components` behaviour of only enabling it in production
        "process.env.SC_DISABLE_SPEEDY": JSON.stringify(
          process.env.NODE_ENV !== "production"
        ),
      },
    };
  },
});
