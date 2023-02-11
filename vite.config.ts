import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 9000,
    hmr: true,
  },
  resolve: {
    //设置便捷图片路径引用
    alias: {
      "/images": "src/assets/images/", //这里不能通过path模块解析路径的写法
      "@": resolve(__dirname, "./src/"), //配置别名路径
      "@c": resolve(__dirname, "./src/components/"), //配置别名路径
    },
  },
});
