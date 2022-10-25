const { defineConfig } = require("@vue/cli-service");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");

const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  devServer: {
    port: process.env.VUE_DEV_PORT
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),

      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
