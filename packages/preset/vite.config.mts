import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { globSync } from 'glob'

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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: true,
    lib: {
      name: 'preset',
      entry: {
        ...inputs,
        index: path.resolve(__dirname, 'src/index.ts')
      },
      formats: ['es'],
      fileName: (format, chunk) => chunk === 'index' ? `index.${format}.js` : `${chunk}/index.js`,
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        exports: 'named',
      },
    },
  },
})
