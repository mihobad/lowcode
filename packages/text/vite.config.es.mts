import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { globSync } from 'glob'
import styleMerge from '@anfu/vite-plugin-css-merge'

const inputs = Object.fromEntries(
  globSync('src/*/index.ts').map(file => {
    const name = path.basename(path.dirname(file))
    return [name, path.resolve(__dirname, file)]
  })
)

export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    styleMerge()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: true,
    lib: {
      entry: {
        ...inputs,
        index: path.resolve(__dirname, 'src/index.ts')
      },
      formats: ['es'],
      fileName: (format, chunk) => chunk === 'index' ? `index.${format}.js` : `${chunk}/index.js`,
      cssFileName: 'index'
    },
    cssCodeSplit: true, // 启用 CSS 代码拆分, 虽然lib 模式开启，但是开启cssCodeSplit 也会生成css文件
    rollupOptions: {
      external: ['vue', '@anfu/axios', 'element-plus', '@element-plus/icons-vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        dir: "dist/es",
        exports: 'named',
      },
    },
  },
})
