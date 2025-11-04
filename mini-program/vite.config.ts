import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// 设置环境变量来抑制SASS警告
process.env.SASS_SILENCE_DEPRECATIONS = "legacy-js-api,global-builtin,import,mixed-decls,string-div,unitless-zero";
process.env.SASS_LOG_LEVEL = "error"; // 只显示错误，不显示警告

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "wot-design-uni/components/common/abstracts/variable.scss";`,
        sassOptions: {
          outputStyle: "expanded",
          silenceDeprecations: ["legacy-js-api", "global-builtin", "import", "mixed-decls", "string-div", "unitless-zero"],
          quietDeps: true,
          quiet: true,
          verbose: false,
          logger: {
            warn: () => {}, // 空函数，忽略所有警告
            debug: () => {} // 空函数，忽略调试信息
          }
        }
      }
    }
  }
});
