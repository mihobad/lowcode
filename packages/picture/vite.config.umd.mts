import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        minify: true,
        lib: {
            name: '@anfu/picture',
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['umd'],
            fileName: (format) => `index.${format}.js`,
            cssFileName: 'index'
        },
        cssCodeSplit: true, // 启用 CSS 代码拆分, 虽然lib 模式开启，但是开启cssCodeSplit 也会生成css文件
        rollupOptions: {
            external: ['vue', '@anfu/axios', 'element-plus', '@element-plus/icons-vue'],
            treeshake: {
                moduleSideEffects: false,
            },
            output: {
                dir: "dist/umd",
                globals: {
                    vue: 'Vue',
                },
                exports: 'named',
            },
        },
    },
})
