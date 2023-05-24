import path from 'path'
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect'
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  server: {
    open: true,
    port: 9000,
    hmr: true,
  },
  resolve: {
    //设置便捷图片路径引用
    extensions: ['.js', '.less', '.sass', '.css', '.vue'],
    alias: {
      "/images": "src/assets/images/", //这里不能通过path模块解析路径的写法
      "@": resolve(__dirname, "./src/"), //配置别名路径
      "@c": resolve(__dirname, "./src/components/"), //配置别名路径
    },
  },
});
