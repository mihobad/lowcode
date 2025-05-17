import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { globSync } from 'glob'
import mergeStyle from '@lowcode/vite-plugin-css-merge'

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
    mergeStyle()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: true,
    lib: {
      name: 'setter',
      entry: {
        ...inputs,
        index: path.resolve(__dirname, 'src/index.ts')
      },
      formats: ['es'],
      fileName: (format, chunk) => chunk === 'index' ? `index.${format}.js` : `${chunk}/index.js`,
      cssFileName: 'index'
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
      },
    },
  },
})
