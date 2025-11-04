import { createSSRApp } from "vue";
import App from "./App.vue";
// 引入Wot Design Uni
import * as WotDesignUni from 'wot-design-uni'

export function createApp() {
  const app = createSSRApp(App);
  // 使用Wot Design Uni
  app.use(WotDesignUni);
  return {
    app,
  };
}
